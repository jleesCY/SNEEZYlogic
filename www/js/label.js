class Label {
    x = 0
    y = 0
    dom = null
    selected = false
    editable = false
    type = 'label'
    constructor(x,y,dom) {
        this.x = x
        this.y = y
        this.dom = dom
        this.selected = false
        this.editable = false
        this.type = 'label'
    }

    //
    // ----- GETTERS -----
    //


    //
    // ----- SETTERS -----
    //


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
    enableEdit = () => {
        this.dom.setAttribute('contenteditable','true')
        this.editable = true
    }
    disableEdit = () => {
        this.dom.setAttribute('contenteditable','false')
        this.editable = false
    }
}