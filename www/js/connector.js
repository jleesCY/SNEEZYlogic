class Connector {
    type = ""
    dom = null
    selected = false
    parent = null

    constructor(t, d, p) {
        this.type = t
        this.dom = d
        this.parent = p
        this.selected = false
    }

    //
    // ----- GETTERS -----
    //
    get getDom() {
        return this.dom
    }

    //
    // ----- SETTERS -----
    //
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
    enableSelect = () => {
        this.dom.addEventListener('dblclick', this.select)
    }
    disableSelect = () => {
        this.dom.removeEventListener('dblclick', this.select)
    }
    on = () => {
        this.dom.classList.remove('off')
        this.dom.classList.add('on')
    }
    off = () => {
        this.dom.classList.remove('on')
        this.dom.classList.add('off')
    }
}