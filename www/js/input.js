class Input {
    type = ""
    out = []
    x = 0
    y = 0
    nOut = null
    dom = null
    selected = false
    value = false

    constructor(type, x, y, dom) {
        this.type = type
        this.dom = dom
        this.x = x
        this.y = y
        this.out =  []
        this.nOut = null
        this.selected = false
        this.value = false
        if (this.type == 'vcc') {
            this.value = true
        }
    }

    //
    // ----- GETTERS -----
    //
    get getType() {
        return this.type
    }
    get getOut() {
        return this.out
    }
    get getN() {
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
        return this.dom.children[0]
    }

    //
    // ----- SETTERS -----
    //
    set setOut(wires) {
        this.out = wires
    }
    set addOut(wire) {
        this.out.push(wire)
    }
    set setN(n) {
        this.nOut = n
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
    enablePress = () => {
        if (this.type == 'switch') {
            this.dom.children[0].addEventListener('pointerup', this.toggle)
        }
        else if (this.type == 'button') {
            this.dom.children[0].addEventListener('pointerdown', this.on)
            this.dom.children[0].addEventListener('pointerup', this.off)
        }
    }
    disablePress = () => {
        if (this.type == 'switch') {
            this.dom.children[0].removeEventListener('pointerup', this.toggle)
        }
        else if (this.type == 'button') {
            this.dom.children[0].removeEventListener('pointerdown', this.on)
            this.dom.children[0].removeEventListener('pointerup', this.off)
        }
    }
    on = () => {
        this.dom.children[0].classList.remove('low')
        this.dom.children[0].classList.add('high')
        this.nOut.on()
        this.value = true
        for (let wire of this.out) {
            wire.setValue = true
        }
    }
    off = () => {
        this.dom.children[0].classList.remove('high')
        this.dom.children[0].classList.add('low')
        this.nOut.off()
        this.value = false
        for (let wire of this.out) {
            wire.setValue = false
        }
    }
    toggle = () => {
        if (this.dom.children[0].classList.value.includes('high')) {
            this.off()
            this.nOut.off()
        }
        else {
            this.on()
            this.nOut.on()
        }
    }
}