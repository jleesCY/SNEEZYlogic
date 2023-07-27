class Wire {
    n1 = null
    n2 = null
    drives = null
    value = false
    dom = null
    id = ""

    constructor(id,n1,n2,d) {
        this.id = id
        this.n1 = n1
        this.n2 = n2
        this.drives = d
        this.value = false
        this.dom = null
    }

    //
    // ----- GETTERS -----
    //
    get getValue() {
        return this.value
    }
    get getN1() {
        return this.n1
    }
    get getN2() {
        return this.n2
    }
    get getDrives() {
        return this.drives
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

    getOffset = (el, scale) => {
        var rect = el.getBoundingClientRect();
        return {
            left: (rect.left - sim.getBoundingClientRect().x)/scale,
            top: (rect.top - sim.getBoundingClientRect().y)/scale,
            width: rect.width/scale || el.offsetWidth/scale,
            height: rect.height/scale || el.offsetHeight/scale
        };
    }
    connect = (div1, div2, color, thickness, scale) => { // draw a line connecting elements
        var off1 = this.getOffset(div1, scale);
        var off2 = this.getOffset(div2, scale);
    
        // bottom right
        var x1 = off1.left + off1.width - 10;
        var y1 = off1.top + off1.height - 10;
        // top right
        var x2 = off2.left + off2.width - 12;
        var y2 = off2.top + 10;
        // distance
        var length = Math.sqrt((((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)))/scale);
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2);

        // angle
        var angle = Math.atan2((y1-y2),(x1-x2))*(180 / Math.PI);
        // make hr
        var htmlLine = document.createElement('div')
        htmlLine.classList.add('wire')
        htmlLine.setAttribute('style',"z-index:-10;padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);");
        return htmlLine
    }

    render = (scale) => {
        this.dom = this.connect(this.n1.dom, this.n2.dom, '#000', 4, scale)
        this.dom.id = this.id
    }
}