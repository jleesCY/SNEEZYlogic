class Gate {
    type = ""
    in1 = null
    in2 = null
    out = []
    n1 = null
    n2 = null
    nOut = null
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
        this.n1 = null
        this.n2 = null
        this.nOut = null
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
    get getN1() {
        return this.n1
    }
    get getN2() {
        return this.n2
    }
    get getNOut() {
        return this.nOut
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
        if (this.type == 'not') {
            this.in2 = wire
        }
    }
    set setIn2(wire) {
        this.in2 = wire
    }
    set setOut(wires) {
        this.out = wires
    }
    set setN1(n) {
        this.n1 = n
    }
    set setN2(n) {
        this.n2 = n
    }
    set setNOut(n) {
        this.nOut = n
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
        // initial node coloring
        if (this.in1 == null) {
            this.n1.off()
        }
        else {
            if (this.in1.getValue) {
                this.n1.on()
            }
            else {
                this.n1.off()
            }
        }
        if (this.type != 'not') {
            if (this.in2 == null) {
                this.n2.off()
            }
            else {
                if (this.in2.getValue) {
                    this.n2.on()
                }
                else {
                    this.n2.off()
                }
            }
        }

        // NOT
        if (this.type == 'not') {
            let val = null
            if (this.in1 == null) {
                val = !false
            }
            else {
                val = !this.in1.getValue
            }
            if (val) 
                this.nOut.on()
            else
                this.nOut.off()

            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // AND ->   (val1 && val2)
        else if (this.type == 'and') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = (false && false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = (false && this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = (this.in1.getValue && false)
            }
            else {
                val = (this.in1.getValue && this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // OR ->    (val1 || val2)
        else if (this.type == 'or') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = (false || false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = (false || this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = (this.in1.getValue || false)
            }
            else {
                val = (this.in1.getValue || this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // NAND ->  !(val1 && val2)
        else if (this.type == 'nand') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = !(false && false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = !(false && this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = !(this.in1.getValue && false)
            }
            else {
                val = !(this.in1.getValue && this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // NOR ->   !(val1 || val2)
        else if (this.type == 'nor') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = !(false || false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = !(false || this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = !(this.in1.getValue || false)
            }
            else {
                val = !(this.in1.getValue || this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // XOR ->   (val1 ^ val2)
        else if (this.type == 'xor') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = (false ^ false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = (false ^ this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = (this.in1.getValue ^ false)
            }
            else {
                val = (this.in1.getValue ^ this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // XNOR ->  !(val1 ^ val2)
        else if (this.type == 'xnor') {
            let val = null
            if (this.in1 == null && this.in2 == null) {
                val = !(false ^ false)
            }
            else if (this.in1 == null && this.in2 != null) {
                val = !(false ^ this.in2.getValue)
            }
            else if (this.in1 != null && this.in2 == null) {
                val = !(this.in1.getValue ^ false)
            }
            else {
                val = !(this.in1.getValue ^ this.in2.getValue)
            }
            if (val)
                this.nOut.on()
            else
                this.nOut.off()
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
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