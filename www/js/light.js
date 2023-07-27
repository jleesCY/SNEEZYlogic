class Light {
    in1 = null
    x = 0
    y = 0
    n1 = null
    dom = null
    selected = false
    type = 'led'

    constructor(x, y, dom) {
        this.type = 'led'
        this.dom = dom
        this.x = x
        this.y = y
        this.in1 = null
        this.n1 = null
        this.selected = false
    }

    //
    // ----- GETTERS -----
    //
    get getType() {
        return this.type
    }
    get getIn() {
        return this.in1
    }
    get getN() {
        return this.n1
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
        return this.dom.children[0]
    }

    //
    // ----- SETTERS -----
    //
    set setIn(i) {
        this.i = i
    }
    set setN(n) {
        this.n1 = n
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
        if (this.in1 != null) {
            if (this.in1.getValue) {
                this.on()
            }
            else {
                this.off()
            }
        }
        else {
            this.off()
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
    on = () => {
        this.dom.children[0].classList.remove('low')
        this.dom.children[0].classList.add('high')
        this.n1.on()
    }
    off = () => {
        this.dom.children[0].classList.remove('high')
        this.dom.children[0].classList.add('low')
        this.n1.off()
    }
}