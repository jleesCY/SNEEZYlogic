$('.accordion').on('click', '.accordion-control', function(e){
    e.preventDefault(); //prevent default action of a button 
    $(this) //get the element the user clicked on
        .next('.accordion-panel') //select the next accordion panel
        .not(':animated') //if it is not currently animating
        .slideToggle(); //use slideToggle to show or hide it
})

let HTML = {
    'and':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body and" tabindex="1"><img src="images/gates/AND.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'or':   '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body or" tabindex="1"><img src="images/gates/OR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'not':  '<div class="in-1"><div class="connector off" tabindex="1"></div></div><div class="body not" tabindex="1"><img src="images/gates/NOT.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nand': '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nand" tabindex="1"><img src="images/gates/NAND.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nor':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nor" tabindex="1"><img src="images/gates/NOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'xor':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xor" tabindex="1"><img src="images/gates/XOR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'xnor': '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xnor" tabindex="1"><img src="images/gates/XNOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'button':   '<div class="body button low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'switch':   '<div class="body switch low" tabindex="1" draggable="true"><div class="top"></div><div class="bottom"></div></div><div class="connector off" tabindex="1"></div>',
    'gnd':  '<div class="body const low" tabindex="1" draggable="true">0</div><div class="connector off" tabindex="1"></div>',
    'vcc':  '<div class="body const high" tabindex="1" draggable="true">1</div><div class="connector on" tabindex="1"></div>',
    'led':  '<div class="body led low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
}

let connTypes = ['gate', 'input', 'light']

let categories = {
    'and': connTypes[0],
    'or': connTypes[0],
    'not': connTypes[0],
    'nand': connTypes[0],
    'nor': connTypes[0],
    'xor': connTypes[0],
    'xnor': connTypes[0],
    'button': connTypes[1],
    'switch': connTypes[1],
    'vcc': connTypes[1],
    'gnd': connTypes[1],
    'led': connTypes[2],
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
let pressedKeys = {}

let mousedown = false

let drawWire = false
let wireOrigin = null

let navMode = 1

let selectBox = document.createElement('div')
selectBox.id = 'selectbox'
selectBox.style.position = 'absolute'
selectBox.style.border = '2px solid rgb(227, 80, 80)'
selectBox.style.backgroundColor = 'rgba(227, 80, 80, 0.2)'
selectBox.style.borderRadius = '3px'

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
        for (id of Object.keys(components)) {
            components[id].disableSelect()
        }
    }
    else {
        document.querySelector('#pan-button').setAttribute('style','background-color:none;background-image:url("images/other/pan.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        document.querySelector('#edit-button').setAttribute('style','background-color:rgb(227, 80, 80);background-image:url("images/other/cursor.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        instance.pause()
        document.body.style.cursor = 'default';
        for (id of Object.keys(components)) {
            components[id].enableSelect()
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
        components = {}
        elementId = 0
        refresh()
    }
}

let image = () => {
    
}

let help = () => {
    window.open('help.html', '_blank');
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
            for (id of Object.keys(components)) {
                if (components[id].selected) {
                    components[id].delete()
                    delete components[id]
                }
            }
        }
    })

    window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
    window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

    updateMode()
})

let refresh = () => {
    sim.innerHTML = ""
    for (id of Object.keys(components)) {
        sim.appendChild(components[id].getDom)
    }
}

let  getOffset = (el) => {
    var rect = el.getBoundingClientRect();
    return {
        left: (rect.left - sim.getBoundingClientRect().x)/scale,
        top: (rect.top - sim.getBoundingClientRect().y)/scale,
        width: rect.width/scale || el.offsetWidth/scale,
        height: rect.height/scale || el.offsetHeight/scale
    };
}

let connect = (div1, div2, color, thickness) => { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);

    // bottom right
    var x1 = off1.left + off1.width - 10;
    var y1 = off1.top + off1.height - 10;
    // top right
    var x2 = off2.left + off2.width - 10;
    var y2 = off2.top + 10;
    // distance
    var length = Math.sqrt((((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1))));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);

    console.log(cx,cy)
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180 / Math.PI);
    // make hr
    var htmlLine = document.createElement('div')
    htmlLine.classList.add('wire')
    htmlLine.setAttribute('style',"z-index:-10;padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);");
    //
    // alert(htmlLine);
    sim.appendChild(htmlLine);
}

document.querySelector("#side-panel").addEventListener('pointerdown', () => {
    instance.pause()
})

document.addEventListener('click', () => {

    console.log(event.target)
    console.log(event.target.classList.value.includes('connector'))

    if (navMode == 0) {
        instance.resume()
    }

    if (!pressedKeys[17] && event.y > document.querySelector("#navbar").getBoundingClientRect().height) {
        for (id of Object.keys(components)) {
            if (event.target != components[id].getDom && event.target != components[id].getBody ) {
                components[id].deselect()
            }
        }
    }

    if (!event.target.classList.value.includes('connector')) {
        drawWire = false
        wireOrigin = null
    }

    else {
        if (drawWire) {
            if (event.target != wireOrigin) {
                oP = wireOrigin
                while (!connTypes.some(el => oP.classList.value.includes(el))) {
                    oP = oP.parentElement
                }
                dP = event.target
                while (!connTypes.some(el => dP.classList.value.includes(el))) {
                    dP = dP.parentElement
                }

                if (oP != dP) {
                    // connect the connectors
                    if (wireOrigin.getBoundingClientRect().left < event.target.getBoundingClientRect().left) {
                        connect(wireOrigin,event.target,'#000',4)
                    }
                    else {
                        connect(event.target,wireOrigin,'#000',4)
                    }
                    console.log(oP.id,"->",dP.id)
                    wireOrigin = null
                    drawWire = false
                }
            }
        }
        else {
            drawWire = true
            wireOrigin = event.target
        }
        for (id of Object.keys(components)) {
            components[id].deselect()
        }
    }
})

dropzone.addEventListener('dragover', () => {
    event.preventDefault()
})

dropzone.addEventListener('drop', () => {
    event.preventDefault()
    dropData = JSON.parse(event.dataTransfer.getData("text"))

    if (dropData['from'] == 'panel') {
        if (categories[dropData['type']] == 'gate') {
            let loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff'] - 20
            let loc_y = (((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale) - dropData['yoff']
            let component = document.createElement('div')
            component.classList.add(categories[dropData['type']])
            component.setAttribute('style', 'top:' + loc_y + 'px;left:' + loc_x + 'px;')
            component.id = elementId
            component.innerHTML = HTML[dropData['type']]
            components[elementId] = new Gate(dropData['type'], loc_x, loc_y, component)
            components[elementId].enableSelect()
            sim.appendChild(component)
            elementId += 1
        }
        else if (categories[dropData['type']] == 'input') {
            console.log('input',dropData['type'])

            let loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff']
            let loc_y = (((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale) - dropData['yoff']
            let component = document.createElement('div')
            component.classList.add(categories[dropData['type']])
            component.setAttribute('style', 'top:' + loc_y + 'px;left:' + loc_x + 'px;')
            component.id = elementId
            component.innerHTML = HTML[dropData['type']]
            components[elementId] = new Input(dropData['type'], loc_x, loc_y, component)
            components[elementId].enableSelect()
            sim.appendChild(component)
            elementId += 1
        }
        else if (categories[dropData['type']] == 'light') {
            console.log('light',dropData['type'])
        }
    }
    else {
        console.log('dragging',components[dropData['type']])
    }
})

instance.on('transform', () => {
    scale = instance.getTransform().scale
})