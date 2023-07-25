class Gate {
    type = ""
    in1 = null
    in2 = null
    out = []
    x = 0
    y = 0

    constructor(type, x, y) {
        this.type = type
        this.in1 = null
        this.in2 = null
        this.out =  []
        this.x = x
        this.y = y
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
    get getHTML() {
        if (this.type == 'not') {
            return '<div class="in-1"><div class="connector off" tabindex="1"></div></div><div class="body not" tabindex="1"><img src="images/gates/NOT.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>'
        }
        else if (this.type == 'and') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body and" tabindex="1"><img src="images/gates/AND.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>'
        }
        else if (this.type == 'or') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body or" tabindex="1"><img src="images/gates/OR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>'
        }
        else if (this.type == 'nand') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nand" tabindex="1"><img src="images/gates/NAND.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>'
        }
        else if (this.type == 'nor') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body nor" tabindex="1"><img src="images/gates/NOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>'
        }
        else if (this.type == 'xor') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xor" tabindex="1"><img src="images/gates/XOR.svg" draggable="true"></div><div class="connector off" tabindex="1"></div>'
        }
        else if (this.type == 'xnor') {
            return '<div class="in-2"><div class="connector off" tabindex="1"></div><div class="connector off" tabindex="1"></div></div><div class="body xnor" tabindex="1"><img src="images/gates/XNOR.svg" draggable="true"></div><div class="connector on" tabindex="1"></div>'
        }
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
}