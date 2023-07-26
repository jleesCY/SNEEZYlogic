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
    enlarge = () => {
        this.dom.style.transition = "0.075s"
        this.dom.style.transform = "scale(1.3)"
    }
    unenlarge = () => {
        this.dom.style.transform = "scale(1)"
    }
    deselect = () => {
        this.dom.classList.remove('selected')
        this.selected = false
    }
    enableSelect = () => {
        this.dom.addEventListener('click', this.select)
        this.dom.addEventListener('mouseover', this.enlarge)
        this.dom.addEventListener('mouseout', this.unenlarge)
    }
    disableSelect = () => {
        this.dom.removeEventListener('click', this.select)
        this.dom.removeEventListener('mouseover', this.enlarge)
        this.dom.removeEventListener('mouseout', this.unenlarge)
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