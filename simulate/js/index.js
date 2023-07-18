$('.accordion').on('click', '.accordion-control', function(e){
    e.preventDefault(); //prevent default action of a button 
    $(this) //get the element the user clicked on
        .next('.accordion-panel') //select the next accordion panel
        .not(':animated') //if it is not currently animating
        .slideToggle(); //use slideToggle to show or hide it
})

let compHTML = {
    'and':  '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body and"><img src="images/gates/AND.svg"></div><div class="connector off"></div>',
    'or':   '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body or"><img src="images/gates/OR.svg"></div><div class="connector off"></div>',
    'not':  '<div class="input-1"><div class="connector off"></div></div><div class="body not"><img src="images/gates/NOT.svg"></div><div class="connector on"></div>',
    'nand': '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body nand"><img src="images/gates/NAND.svg"></div><div class="connector on"></div>',
    'nor':  '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body nor"><img src="images/gates/NOR.svg"></div><div class="connector on"></div>',
    'xor':  '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body xor"><img src="images/gates/XOR.svg"></div><div class="connector off"></div>',
    'xnor': '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body xnor"><img src="images/gates/XNOR.svg"></div><div class="connector on"></div>',
    'button':   '<div class="body button low"></div><div class="connector off"></div>',
    'switch':   '<div class="body switch low"><div class="top"></div><div class="bottom"></div></div><div class="connector off"></div>',
    'gnd':  '<div class="body const low">0</div><div class="connector off"></div>',
    'vcc':  '<div class="body const high">1</div><div class="connector on"></div>',
    'led':  '<div class="body led low"></div><div class="connector off"></div>',
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
let components = {}
let dropzone = document.querySelector("#dropwindow")
let scale = 1

let sim = document.querySelector("#simulation-window")
let instance = panzoom(sim,{
    smoothScroll: false,
    zoomSpeed: zoom
})


let panelDragstart = () => {
    let img = event.target
    console.log(img)
    let t = img.parentElement.id
    let rect = img.getBoundingClientRect();
    var mx = event.x - rect.left
    var my = event.y - rect.top
    console.log(mx,my)
    event.dataTransfer.setData('text/plain', JSON.stringify({from: 'panel', type: t, xoff: mx, yoff: my}))
}


$(function(){
    window.onbeforeunload = function ()
    {
        return "";
    };

    for (let elem of document.querySelectorAll(".draggable")) {
        elem.addEventListener('dragstart', panelDragstart)
    }
})

let refresh = () => {
    sim.innerHTML = ""
    for (id of Object.keys(components)) {
        let component = document.createElement('div')
        component.classList.add('gate')
        component.setAttribute('style', 'top:' + components[id].location.y + 'px;left:' + components[id].location.x + 'px;')
        component.id = id
        component.innerHTML = compHTML[components[id].type]
        component.children[1].addEventListener('click', () => {console.log('clicked')})
        sim.appendChild(component)
    }
}

let append = (id) => {
    let component = document.createElement('div')
    component.classList.add(categories[components[id].type])
    component.setAttribute('style', 'top:' + components[id].location.y + 'px;left:' + components[id].location.x + 'px;')
    component.id = id
    component.innerHTML = compHTML[components[id].type]
    sim.appendChild(component)
}

document.querySelector("#side-panel").addEventListener('pointerdown', () => {
    instance.pause()
})
document.addEventListener('pointerup', () => {
    instance.resume()
})

dropzone.addEventListener('dragover', () => {
    event.preventDefault()
})

dropzone.addEventListener('drop', () => {
    event.preventDefault()
    instance.resume()
    dropData = JSON.parse(event.dataTransfer.getData("text"))

    console.log(dropData['type'])

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
        append(elementId)
        elementId += 1
    }
    else {
        console.log('else')
    }

    
})

instance.on('transform', () => {
    scale = instance.getTransform().scale
})