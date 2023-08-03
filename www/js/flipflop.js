class FlipFlop {
    type = ""
    in1 = null
    in2 = null
    in3 = null
    qOut = []
    qNotOut = []
    n1 = null
    n2 = null
    nC = null
    nQ = null
    nQNot = null
    x = 0
    y = 0
    dom = null
    selected = false
    prev1 = null
    prev2 = null
    prevC = null

    constructor(type, x, y, dom) {
        this.type = type
        this.in1 = null
        this.in2 = null
        this.in3 = null
        this.qOut = []
        this.qNotOut = []
        this.n1 = null
        this.n2 = null
        this.nC = null
        this.nQ = null
        this.nQNot = null
        this.x = x
        this.y = y
        this.dom = dom
        this.selected = false
        this.prev1 = null
        this.prev2 = null
        this.prevC = null
    }

    //
    // ----- GETTERS -----
    //
    get getBody() {
        return this.dom.children[1].children[0]
    }

    //
    // ----- OTHER -----
    //
    calcOutput = () => {
        // initial node coloring
        if (this.in1 == null) {
            this.n1.float()
        }
        else {
            if (this.in1.getValue == null) {
                this.n1.float()
            }
            else {
                if (this.in1.getValue) {
                    this.n1.on()
                }
                else {
                    this.n1.off()
                }
            }
        }
        if (this.in3 == null) {
            this.nC.float()
        }
        else {
            if (this.in3.getValue == null) {
                this.nC.float()
            }
            else {
                if (this.in3.getValue) {
                    this.nC.on()
                }
                else {
                    this.nC.off()
                }
            }
        }
        if (this.type != 'tff') {
            if (this.in2 == null) {
                this.n2.float()
            }
            else {
                if (this.in2.getValue == null) {
                    this.n2.float()
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
        }

        // JK
        if (this.type == 'jkff') {
            let val = null
            if (this.in1 != null) {
                if (this.in1.getValue != null) {
                    val = !this.in1.getValue
                }
            }
            if (val == null) {
                this.nOut.float()
            }
            else {
                if (val)
                    this.nOut.on()
                else
                    this.nOut.off()
            }
            for (let wire of this.out) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
        }

        // T
        else if (this.type == 'tff') {
            let val = null
            let v1 = null
            let v2 = null
            if (this.in1 != null) {
                if (this.in1.getValue != null) {
                    v1 = this.in1.getValue
                }
            }
            if (this.in3 != null) {
                if (this.in3.getValue != null) {
                    v2 = this.in3.getValue
                }
            }
            // float condition(s)
            if (v1 == null || v2 == null) {
                val = null
            }
            else if (v1 != null && v2 != null) {
                
            }

            console.log(val)

            if (val == null) {
                this.nQ.float()
                this.nQNot.float()
            }
            else {
                if (val) {
                    this.nQ.on()
                    this.nQNot.off()
                }
                else {
                    this.nQ.off()
                    this.nQNot.on()
                }
            }
            /*
            for (let wire of this.qOut) {
                if (wire.getValue != val) {
                    wire.setValue = val
                }
            }
            for (let wire of this.qNotOut) {
                if (wire.getValue != val) {
                    if (val != null) {
                        wire.setValue = !val
                    }
                    else {
                        wire.setValue = null
                    }
                }
            }
            */
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