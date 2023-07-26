class Gate {
    type = ""
    in1 = null
    in2 = null
    out = []
    x = 0
    y = 0
    dom = null
    selected = false

    constructor(type, x, y, dom) {
        this.type = type
        this.dom = dom
        this.x = x
        this.y = y
        this.in1 = null
        this.in2 = null
        this.out =  []
        this.selected = false
    }

    //
    // ----- GETTERS -----
    //
    get getType() {
        return this.type
    }
    get getIn1() {
        return this.in1
    }
    get getIn2() {
        return this.in2
    }
    get getOut() {
        return this.out
    }
    get getX() {
        return this.x
    }
    get getY() {
        return this.y
    }
    get getDom() {
        return this.dom
    }
    get getBody() {
        return this.dom.children[1].children[0]
    }

    //
    // ----- SETTERS -----
    //
    set setIn1(wire) {
        this.in1 = wire
    }
    set setIn2(wire) {
        this.in2 = wire
    }
    set setOut(wires) {
        this.out = wires
    }
    set addOut(wire) {
        this.out.push(wire)
    }
    set setX(x) {
        this.x = x
    }
    set setY(y) {
        this.y = y
    }
    set setDom(d) {
        this.dom = d
    }

    //
    // ----- OTHER -----
    //
    calcOutput = () => {
        if (this.type == 'not') {
            for (let wire of this.out) {
                wire.setValue = (!this.in1.getValue)
            }
        }
        else if (this.type == 'and') {
            for (let wire of this.out) {
                wire.setValue = (this.in1.getValue && this.in2.getValue)
            }
        }
        else if (this.type == 'or') {
            for (let wire of this.out) {
                wire.setValue = (this.in1.getValue || this.in2.getValue)
            }
        }
        else if (this.type == 'nand') {
            for (let wire of this.out) {
                wire.setValue = (!(this.in1.getValue && this.in2.getValue))
            }
        }
        else if (this.type == 'nor') {
            for (let wire of this.out) {
                wire.setValue = (!(this.in1.getValue || this.in2.getValue))
            }
        }
        else if (this.type == 'xor') {
            for (let wire of this.out) {
                wire.setValue = (this.in1.getValue ^ this.in2.getValue)
            }
        }
        else if (this.type == 'xnor') {
            for (let wire of this.out) {
                wire.setValue = (!(this.in1.getValue ^ this.in2.getValue))
            }
        }
    }
    select = () => {
        this.dom.classList.add('selected')
        this.selected = true
    }
    deselect = () => {
        this.dom.classList.remove('selected')
        this.selected = false
    }
    delete = () => {
        this.dom.parentElement.removeChild(this.dom)
    }
    enableSelect = () => {
        this.dom.addEventListener('dblclick', this.select)
    }
    disableSelect = () => {
        this.dom.removeEventListener('dblclick', this.select)
    }
}