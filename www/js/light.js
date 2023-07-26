class Light {
    i = null
    x = 0
    y = 0
    n = null
    dom = null
    selected = false
    type = 'led'

    constructor(x, y, dom) {
        this.type = 'led'
        this.dom = dom
        this.x = x
        this.y = y
        this.i = null
        this.n = null
        this.selected = false
    }

    //
    // ----- GETTERS -----
    //
    get getType() {
        return this.type
    }
    get getIn() {
        return this.i
    }
    get getN() {
        return this.n
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
        this.n = n
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
        if (this.i.getValue) {
            this.on()
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
        this.n.on()
    }
    off = () => {
        this.dom.children[0].classList.remove('high')
        this.dom.children[0].classList.add('low')
        this.n.off()
    }
}