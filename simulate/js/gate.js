class Gate {
    constructor(type) {
        this.type = this.getType(type)
        this.x = 0
        this.y = 0
        this.inp1 = null
        this.inp2 =  null
        this.out =  null
    }
    getType = (t) => {
        if (t == 'not') {
            return 0
        }
        else if (t == 'and') {
            return 1
        }
        else if (t == 'or') {
            return 2
        }
        else if (t == 'nand') {
            return 3
        }
        else if (t == 'nor') {
            return 4
        }
        else if (t == 'xor') {
            return 5
        }
        else if (t == 'xnor') {
            return 6
        }
    }

    getHTML = () => {
        if (this.type == 0) {
            return '<div class="input-1"><div class="connector off"></div></div><div class="body not"><img src="images/gates/NOT.svg"></div><div class="connector on"></div>'
        }
        else if (this.type == 1) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body and"><img src="images/gates/AND.svg"></div><div class="connector off"></div>'
        }
        else if (this.type == 2) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body or"><img src="images/gates/OR.svg"></div><div class="connector off"></div>'
        }
        else if (this.type == 3) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body nand"><img src="images/gates/NAND.svg"></div><div class="connector on"></div>'
        }
        else if (this.type == 4) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body nor"><img src="images/gates/NOR.svg"></div><div class="connector on"></div>'
        }
        else if (this.type == 5) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body xor"><img src="images/gates/XOR.svg"></div><div class="connector off"></div>'
        }
        else if (this.type == 6) {
            return '<div class="input-2"><div class="connector off"></div><div class="connector off"></div></div><div class="body xnor"><img src="images/gates/XNOR.svg"></div><div class="connector on"></div>'
        }
    }

    calcOutput = () => {
        if (this.type == 0) {
            this.out.setValue(!this.inp1.getValue())
        }
        else if (this.type == 1) {
            this.out.setValue(this.input1.getValue() && this.input2.getValue())
        }
        else if (this.type == 2) {
            this.out.setValue(this.input[0].getValue() || this.input[1].getValue())
        }
        else if (this.type == 3) {
            this.out.setValue(!(this.input1.getValue() && this.input2.getValue()))
        }
        else if (this.type == 4) {
            this.out.setValue(!(this.input1.getValue() || this.input2.getValue()))
        }
        else if (this.type == 5) {
            this.out.setValue(this.input1.getValue() ^ this.input2.getValue())
        }
        else if (this.type == 6) {
            this.out.setValue(!(this.input1.getValue() ^ this.input2.getValue()))
        }
    }
}