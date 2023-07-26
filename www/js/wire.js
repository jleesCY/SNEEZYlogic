class Wire {
    drives = null
    value = false

    constructor(d) {
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
        if (this.drives != null) {
            this.drives.calcOutput()
        }
    }
}