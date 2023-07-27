class Seg7 {
    in1 = null
    in2 = null
    in3 = null
    in4 = null
    n1 = null
    n2 = null
    n3 = null
    n4 = null
    x = 0
    y = 0
    dom = null
    selected = false
    type = '7seg'
    display = '0'


    constructor(x, y, dom) {
        this.type = '7seg'
        this.dom = dom
        this.x = x
        this.y = y
        this.in1 = null
        this.in2 = null
        this.in3 = null
        this.in4 = null
        this.n1 = null
        this.n2 = null
        this.n3 = null
        this.n4 = null
        this.selected = false
    }

    //
    // ----- GETTERS -----
    //
    get getBody() {
        return this.dom.children[0]
    }

    //
    // ----- SETTERS -----
    //

    //
    // ----- OTHER -----
    //
    calcOutput = () => {
        let v1 = '0'
        let v2 = '0'
        let v3 = '0'
        let v4 = '0'
        this.n1.float()
        this.n2.float()
        this.n3.float()
        this.n4.float()
        if (this.in1 != null) {
            if (this.in1.getValue != null) {
                if (this.in1.getValue) {
                    v1 = '1'
                    this.n1.on()
                }
                else {
                    v1 = '0'
                    this.n1.off()
                }
            }
        }
        if (this.in2 != null) {
            if (this.in2.getValue != null) {
                if (this.in2.getValue) {
                    v2 = '1'
                    this.n2.on()
                }
                else {
                    v2 = '0'
                    this.n2.off()
                }
            }
        }
        if (this.in3 != null) {
            if (this.in3.getValue != null) {
                if (this.in3.getValue) {
                    v3 = '1'
                    this.n3.on()
                }
                else {
                    v3 = '0'
                    this.n3.off()
                }
            }
        }
        if (this.in4 != null) {
            if (this.in4.getValue != null) {
                if (this.in4.getValue) {
                    v4 = '1'
                    this.n4.on()
                }
                else {
                    v4 = '0'
                    this.n4.off()
                }
            }
        }
        this.dom.children[1].innerHTML = parseInt(v4+v3+v2+v1, 2).toString(16).toUpperCase();
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