class Wire {
    node1 = null
    node2 = null
    drives = null
    value = false

    constructor(n1, n2, d) {
        this.node1 = n1
        this.node2 =  n2
        this.drives = d
        this.value = false
    }

    //
    // ----- GETTERS -----
    //
    get getValue() {
        return this.value
    }

    //
    // ----- SETTERS -----
    //
    set setValue(v) {
        this.value = v
        if (v) {
            n1.classList.remove('off')
            n2.classList.remove('off')
            n1.classList.add('on')
            n2.classList.add('on')
        }
        else {
            n1.classList.remove('on')
            n2.classList.remove('on')
            n1.classList.add('off')
            n2.classList.add('off')
        }
        if (this.drives != null) {
            this.drives.calcOutput()
        }
    }
}