$('.accordion').on('click', '.accordion-control', function(e){
    e.preventDefault(); //prevent default action of a button 
    $(this) //get the element the user clicked on
        .next('.accordion-panel') //select the next accordion panel
        .not(':animated') //if it is not currently animating
        .slideToggle(); //use slideToggle to show or hide it
})

let compHTML = {
    'and':  '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body and" tabindex="1"><img src="images/gates/AND.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'or':   '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body or" tabindex="1"><img src="images/gates/OR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'not':  '<div class="input-1"><div class="connector off" tabindex="1"></div></div><div class="body not" tabindex="1"><img src="images/gates/NOT.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nand': '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nand" tabindex="1"><img src="images/gates/NAND.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nor':  '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nor" tabindex="1"><img src="images/gates/NOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'xor':  '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xor" tabindex="1"><img src="images/gates/XOR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'xnor': '<div class="input-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xnor" tabindex="1"><img src="images/gates/XNOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'button':   '<div class="body button low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'switch':   '<div class="body switch low" tabindex="1" draggable="true"><div class="top"></div><div class="bottom"></div></div><div class="connector off" tabindex="1"></div>',
    'gnd':  '<div class="body const low" tabindex="1" draggable="true">0</div><div class="connector off" tabindex="1"></div>',
    'vcc':  '<div class="body const high" tabindex="1" draggable="true">1</div><div class="connector on" tabindex="1"></div>',
    'led':  '<div class="body led low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
}

let categories = {
    'and': 'gate',
    'or': 'gate',
    'not': 'gate',
    'nand': 'gate',
    'nor': 'gate',
    'xor': 'gate',
    'xnor': 'gate',
    'button': 'input',
    'switch': 'input',
    'vcc': 'input',
    'gnd': 'input',
    'led': 'light',
}

let zoom = 0.065
let yoff = document.querySelector("#navbar").getBoundingClientRect().height
elementId = 0
historyIdx = 0
let components = {}
let history = [{}]
let dropzone = document.querySelector("#dropwindow")
let scale = 1
let selectedId = -1

let navMode = 1

let sim = document.querySelector("#simulation-window")
let instance = panzoom(sim,{
    smoothScroll: false,
    zoomSpeed: zoom
})
instance.pause()


let panelDragstart = () => {
    let img = event.target
    let t = img.parentElement.id
    let rect = img.getBoundingClientRect();
    var mx = event.x - rect.left
    var my = event.y - rect.top
    event.dataTransfer.setData('text/plain', JSON.stringify({from: 'panel', type: t, xoff: mx, yoff: my}))
}

let simDragStart = () => {
    let img = event.target
    let id = ""
    if (img.nodeName == "IMG") {
        id = img.parentElement.parentElement.id
    }
    else if (img.nodeName == 'DIV') {
        id = img.parentElement.id
    }
    event.dataTransfer.setData('text/plain', JSON.stringify({from: 'sim', type: id, xoff: 0, yoff: 0}))
}

let updateMode = () => {
    if (navMode == 0) {
        document.querySelector('#pan-button').setAttribute('style','background-color:rgb(227, 80, 80);background-image:url("images/other/pan.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        document.querySelector('#edit-button').setAttribute('style','background-color:none;background-image:url("images/other/cursor.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        instance.resume()
        document.body.style.cursor = 'all-scroll';
        for (item of document.querySelectorAll(".draggable")) {
            item.setAttribute('draggable', 'false')
        }
        for (item of document.querySelectorAll(".gate")) {
            item.style.zIndex = '-200'
        }
        for (item of document.querySelectorAll(".input")) {
            item.style.zIndex = '-200'
        }
        for (item of document.querySelectorAll(".light")) {
            item.style.zIndex = '-200'
        }
    }
    else {
        document.querySelector('#pan-button').setAttribute('style','background-color:none;background-image:url("images/other/pan.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        document.querySelector('#edit-button').setAttribute('style','background-color:rgb(227, 80, 80);background-image:url("images/other/cursor.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        instance.pause()
        document.body.style.cursor = 'default';
        for (item of document.querySelectorAll(".draggable")) {
            item.setAttribute('draggable', 'true')
        }
        for (item of document.querySelectorAll(".gate")) {
            item.style.zIndex = '1'
        }
        for (item of document.querySelectorAll(".input")) {
            item.style.zIndex = '1'
        }
        for (item of document.querySelectorAll(".light")) {
            item.style.zIndex = '1'
        }
    }
}

let undo = () => {
    console.log(historyIdx)
    if (historyIdx != 0) {
        historyIdx -= 1
        components = JSON.parse(JSON.stringify(history[historyIdx]))
        refresh()
    }
}

let redo = () => {
    console.log(historyIdx)
    if (historyIdx != history.length - 1) {
        historyIdx += 1
        components = JSON.parse(JSON.stringify(history[historyIdx]))
        refresh()
    }
}

let mode = (m) => {
    if (navMode != m) {
        navMode = m
        updateMode()
    }
}

let save = () => {
    console.log('save')
}

let load = () => {
    console.log('load')
}

let trash = () => {
    if(confirm("Are you sure you want to delete this circuit?")) {
        components = []
        elementId = 0
        refresh()
    }
}

let image = () => {

}

$(function(){
    window.onbeforeunload = function ()
    {
        return "";
    };

    for (let elem of document.querySelectorAll(".draggable")) {
        elem.addEventListener('dragstart', panelDragstart)
    }

    document.body.addEventListener('keyup', () => {
        if (event.key === "Delete") {
            delete components[selectedId]
            refresh()
        }
    })

    updateMode()
})

let refresh = () => {
    sim.innerHTML = ""
    for (id of Object.keys(components)) {
        let component = document.createElement('div')
        component.classList.add(categories[components[id].type])
        component.setAttribute('style', 'top:' + components[id].location.y + 'px;left:' + components[id].location.x + 'px;')
        component.id = id
        component.innerHTML = compHTML[components[id].type]
        component.addEventListener('dragstart', simDragStart)
        component.addEventListener('click', () => {
            if (categories[components[id].type] == 'gate') {
                selectedId = event.target.parentElement.parentElement.id
            }
            else {
                selectedId = event.target.parentElement.id
            }
            console.log(selectedId)
        })
        sim.appendChild(component)
    }
}

let append = (id) => {
    let component = document.createElement('div')
    component.classList.add(categories[components[id].type])
    component.setAttribute('style', 'top:' + components[id].location.y + 'px;left:' + components[id].location.x + 'px;')
    component.id = id
    component.innerHTML = compHTML[components[id].type]
    component.addEventListener('dragstart', simDragStart)
    component.addEventListener('click', () => {
        if (categories[components[id].type] == 'gate') {
            selectedId = event.target.parentElement.parentElement.id
        }
        else {
            selectedId = event.target.parentElement.id
        }
        console.log(selectedId)
    })
    sim.appendChild(component)
}

document.querySelector("#side-panel").addEventListener('pointerdown', () => {
    instance.pause()
})
document.addEventListener('pointerup', () => {
    if (navMode == 0) {
        instance.resume()
    }
})

dropzone.addEventListener('dragover', () => {
    event.preventDefault()
})

dropzone.addEventListener('drop', () => {
    event.preventDefault()
    dropData = JSON.parse(event.dataTransfer.getData("text"))

    if (dropData['from'] == 'panel') {
        let loc_x
        let loc_y
        if (categories[dropData['type']] == 'gate') {
            loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff'] - 20
        }
        else {
            loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff']
        }
        loc_y = (((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale) - dropData['yoff']

        components[elementId] = {
            type: dropData['type'],
            location: {
                x: loc_x,
                y: loc_y
            },
            inp1:   {id: -1, val: false},
            inp2:   {id: -1, val: false},
            out:    {ids: [-1], val: false}
        }
        history.push(JSON.parse(JSON.stringify(components)))
        historyIdx = history.length

        append(elementId)
        elementId += 1
    }
    else {
        console.log('dragging',components[dropData['type']])
    }

    
})

instance.on('transform', () => {
    scale = instance.getTransform().scale
})