/*
    Main JavaScript file for simulator
*/

// Init side panel accordion
$('.accordion').on('click', '.accordion-control', function(e){
    e.preventDefault(); //prevent default action of a button 
    $(this) //get the element the user clicked on
        .next('.accordion-panel') //select the next accordion panel
        .not(':animated') //if it is not currently animating
        .slideToggle(); //use slideToggle to show or hide it
})

// Component inner HTML
let HTML = {
    'and':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body and" tabindex="1"><img src="../images/gates/AND.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'or':   '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body or" tabindex="1"><img src="../images/gates/OR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'not':  '<div class="in-1"><div class="connector off" tabindex="1"></div></div><div class="body not" tabindex="1"><img src="../images/gates/NOT.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nand': '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nand" tabindex="1"><img src="../images/gates/NAND.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'nor':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nor" tabindex="1"><img src="../images/gates/NOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'xor':  '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xor" tabindex="1"><img src="../images/gates/XOR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'xnor': '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xnor" tabindex="1"><img src="../images/gates/XNOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>',
    'button':   '<div class="body button low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
    'switch':   '<div class="body switch low" tabindex="1" draggable="true"><div class="top"></div><div class="bottom"></div></div><div class="connector off" tabindex="1"></div>',
    'gnd':  '<div class="body const low" tabindex="1" draggable="true">0</div><div class="connector off" tabindex="1"></div>',
    'vcc':  '<div class="body const high" tabindex="1" draggable="true">1</div><div class="connector on" tabindex="1"></div>',
    'led':  '<div class="body led low" tabindex="1" draggable="true"></div><div class="connector off" tabindex="1"></div>',
}

// Possible types of components
let connTypes = ['gate', 'input', 'light']

// Mapping of individual component names to their types
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

// configuring data for pan feature
let zoom = 0.065
let yoff = document.querySelector("#navbar").getBoundingClientRect().height
elementId = 0
connectorId = 0
wireId = 0
let scale = 1
let components = {}
let connectors = {}
let wires = {}
let navMode = 1

// for the simulator's event handling
let dropzone = document.querySelector("#dropwindow")
let pressedKeys = {}
let mousedown = false
let drawWire = false
let wireOrigin = null

/* DISABLED: select box feature
let selectBox = document.createElement('div')
selectBox.id = 'selectbox'
selectBox.style.position = 'absolute'
selectBox.style.border = '2px solid rgb(227, 80, 80)'
selectBox.style.backgroundColor = 'rgba(227, 80, 80, 0.2)'
selectBox.style.borderRadius = '3px'
*/

// DOM object for simulation window
let sim = document.querySelector("#simulation-window")
let instance = panzoom(sim,{
    smoothScroll: false,
    zoomSpeed: zoom
})
instance.pause()

// handler for dragging elements off of panel
let panelDragstart = () => {
    let img = event.target
    let t = img.parentElement.id
    let rect = img.getBoundingClientRect();
    var mx = event.x - rect.left
    var my = event.y - rect.top
    event.dataTransfer.setData('text/plain', JSON.stringify({from: 'panel', type: t, xoff: mx, yoff: my}))
}

/* DISABLED: handler for dragging elements once placed in simulation
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
*/

// handler for swapping between pan and edit modes
let updateMode = () => {
    // pan
    if (navMode == 0) {
        document.querySelector('#pan-button').setAttribute('style','background-color:rgb(227, 80, 80);background-image:url("../images/other/pan.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        document.querySelector('#edit-button').setAttribute('style','background-color:none;background-image:url("../images/other/cursor.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        instance.resume()
        document.body.style.cursor = 'all-scroll';
        for (id of Object.keys(components)) {
            components[id].disableSelect()
            if (categories[components[id].getType] == 'input') {
                console.log(components[id])
                components[id].disablePress()
            }
        }
    }
    // edit
    else {
        document.querySelector('#pan-button').setAttribute('style','background-color:none;background-image:url("../images/other/pan.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        document.querySelector('#edit-button').setAttribute('style','background-color:rgb(227, 80, 80);background-image:url("../images/other/cursor.svg");width:35px;height:35px;padding:0;margin:0;border-radius:5px')
        instance.pause()
        document.body.style.cursor = 'default';
        for (id of Object.keys(components)) {
            components[id].enableSelect()
            if (categories[components[id].getType] == 'input') {
                console.log(components[id])
                components[id].enablePress()
            }
        }
    }
}

// handler for undo button
let undo = () => {
}

// handler for redo button
let redo = () => {
}

// handler for setting the mode (pan or edit)
let mode = (m) => {
    if (navMode != m) {
        navMode = m
        updateMode()
    }
}

// handler for saving the circuit to a .json file
let save = () => {
    console.log('save')
}

// handler for loading a circuit from a .json file
let load = () => {
    console.log('load')
}

// handler for removing all components from simulation
let trash = () => {
    if(confirm("Are you sure you want to delete this circuit?")) {
        components = {}
        elementId = 0
        refresh()
    }
}

// handler for saving the currently viewable circuit to an image file
let image = () => {
}

// handler for opening the help window
let help = () => {
    window.open('../help', '_blank');
}

// hander for when the document loads
$(function(){
    // handler for confirming window reload or close
    window.onbeforeunload = function ()
    {
        return "";
    };

    // setting the handler for draggable elements from the side panel
    for (let elem of document.querySelectorAll(".draggable")) {
        elem.addEventListener('dragstart', panelDragstart)
    }

    // handler for deleting selected elements from the simulation
    document.body.addEventListener('keyup', () => {
        if (event.key === "Delete" || event.key === "Backspace") {
            for (id of Object.keys(components)) {
                if (components[id].selected) {
                    components[id].delete()
                    delete components[id]
                }
            }
        }
    })

    // handlers for keeping track of which keys are being held down
    window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
    window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

    // refreshes the mode after document loads
    updateMode()
})

// refreshes all components in the simulation window
let refresh = () => {
    sim.innerHTML = ""
    for (id of Object.keys(components)) {
        sim.appendChild(components[id].getDom)
    }
}

// for connect: gets the offsets of the connectors to be connected


// disabling panning from the side panel
document.querySelector("#side-panel").addEventListener('pointerdown', () => {
    instance.pause()
})

// listening for any click event on the document
document.addEventListener('click', () => {
    /*
    console.log(event.target)
    console.log(event.target.classList.value.includes('connector'))
    */

    // ensuring panning is always enabled when pan mode is enabled
    if (navMode == 0) {
        instance.resume()
    }

    // deselects components only if (a) CTRL is not being held, and (b) the click is below the navigation bar
    if (!pressedKeys[17] && event.y > document.querySelector("#navbar").getBoundingClientRect().height) {
        for (id of Object.keys(components)) {
            if (event.target != components[id].getDom && event.target != components[id].getDom ) {
                components[id].deselect()
                if (categories[components[id].getType] == "gate" && !event.target.classList.value.includes('connector')) {
                    console.log('gate')
                    components[id].getN1.deselect()
                    components[id].getN2.deselect()
                    components[id].getNOut.deselect()
                }
                else if ((categories[components[id].getType] == "input" || categories[components[id].getType] == "light")&& !event.target.classList.value.includes('connector')) {
                    console.log('input')
                    components[id].getN.deselect()
                }
            }
        }
    }

    // if we did not click a connector, we do not want to begin the connetion process
    if (!event.target.classList.value.includes('connector')) {
        drawWire = false
        wireOrigin = null
    }

    // if we did click a connector, begin the connection process
    else {
        if (drawWire) {
            let s = null
            let e = null
            let n1 = connectors[wireOrigin.id]
            let n2 = connectors[event.target.id]
            if (n1 != n2) {
                if (n1.parent != n2.parent) {
                    if (n1.type != n2.type) {
                        if (n2.type == 'in') {
                            console.log('forwards')
                            s = n1
                            e = n2
                        }
                        else {
                            console.log('backwards')
                            s = n2
                            e = n1
                        }
                        // connect the connectors
                        wires['w' + wireId] = new Wire('w' + wireId,s,e,e.parent)
                        components[s.parent.dom.id].addOut = wires['w' + wireId]
                        console.log('i' + e.loc)
                        components[e.parent.dom.id]['i' + e.loc] = wires['w' + wireId]
                        wires['w' + wireId].render(scale)
                        sim.appendChild(wires['w' + wireId].dom)
                        if (categories[components[s.parent.dom.id].type] == 'gate') {
                            components[s.parent.dom.id].calcOutput()
                        }
                        else {
                            if (components[s.parent.dom.id].value) {
                                components[s.parent.dom.id].on()
                            }
                            else {
                                components[s.parent.dom.id].off()
                            }
                        }
                        wireId += 1
                        wireOrigin = null
                        drawWire = false
                    }
                }
            }
            if (s != null && e != null) {
                s.deselect()
                e.deselect()
            }
        }
        // begin connection process
        else {
            drawWire = true
            wireOrigin = event.target
        }
        // deselect any components if a connector was clicked
        for (id of Object.keys(components)) {
            components[id].deselect()
        }
    }
})

dropzone.addEventListener('dragover', () => {
    event.preventDefault()
})

// handler for dropping elements into the simulation window
dropzone.addEventListener('drop', () => {
    event.preventDefault()
    dropData = JSON.parse(event.dataTransfer.getData("text"))

    // if we dragged a component from the side panel
    if (dropData['from'] == 'panel') {
        // if the component is a gate
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
            components[elementId].setN1 = new Connector('in', 'n1', components[elementId].getDom.children[0].children[0],components[elementId])
            components[elementId].getN1.getDom.id = 'c' + connectorId
            connectors['c' + connectorId] = components[elementId].getN1
            connectorId += 1
            components[elementId].getN1.enableSelect()
            if (dropData["type"] != 'not') {
                components[elementId].setN2 = new Connector('in', 'n2', components[elementId].getDom.children[0].children[1],components[elementId])
                components[elementId].getN2.getDom.id = 'c' + connectorId
                connectors['c' + connectorId] = components[elementId].getN2
                connectorId += 1
                components[elementId].getN2.enableSelect()
            }
            else {
                components[elementId].setN2 = components[elementId].getN1
            }
            components[elementId].setNOut = new Connector('out', 'nOut', components[elementId].getDom.children[2],components[elementId])
            components[elementId].getNOut.getDom.id = 'c' + connectorId
            connectors['c' + connectorId] = components[elementId].getNOut
            connectorId += 1
            components[elementId].getNOut.enableSelect()

            console.log(component)
            
            sim.appendChild(component)
            elementId += 1
        }
        // if the component is an input
        else if (categories[dropData['type']] == 'input') {
            let loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff']
            let loc_y = (((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale) - dropData['yoff']
            let component = document.createElement('div')
            component.classList.add(categories[dropData['type']])
            component.setAttribute('style', 'top:' + loc_y + 'px;left:' + loc_x + 'px;')
            component.id = elementId
            component.innerHTML = HTML[dropData['type']]
            components[elementId] = new Input(dropData['type'], loc_x, loc_y, component)
            components[elementId].enableSelect()
            components[elementId].enablePress()
            components[elementId].setN = new Connector('out', 'nOut', components[elementId].getDom.children[1],components[elementId])
            components[elementId].getN.getDom.id = 'c' + connectorId
            connectors['c' + connectorId] = components[elementId].getN
            connectorId += 1
            components[elementId].getN.enableSelect()
            sim.appendChild(component)
            elementId += 1
        }
        // if the component is a light
        else if (categories[dropData['type']] == 'light') {
            let loc_x = ((event.x - sim.getBoundingClientRect().x) / scale) - dropData['xoff']
            let loc_y = (((event.y - yoff) - (sim.getBoundingClientRect().y - yoff)) / scale) - dropData['yoff']
            let component = document.createElement('div')
            component.classList.add(categories[dropData['type']])
            component.setAttribute('style', 'top:' + loc_y + 'px;left:' + loc_x + 'px;')
            component.id = elementId
            component.innerHTML = HTML[dropData['type']]
            components[elementId] = new Light(loc_x, loc_y, component)
            components[elementId].enableSelect()
            components[elementId].setN = new Connector('in', 'n1', components[elementId].getDom.children[1],components[elementId])
            components[elementId].getN.getDom.id = 'c' + connectorId
            connectors['c' + connectorId] = components[elementId].getN
            connectorId += 1
            components[elementId].getN.enableSelect()
            sim.appendChild(component)
            elementId += 1
        }
    }
    else {
        console.log('dragging',components[dropData['type']])
    }
})

// handler for adjusting the scale variable on any pan
instance.on('transform', () => {
    scale = instance.getTransform().scale
})