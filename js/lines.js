class Lines {
    constructor() {
        this.reset()
    }

    reset() {
        this.color      = '#000000'
        this.blur       = 0
        this.opacity    = 1
        this.cap        = 'butt'
        this.width      = 1
    }

    addLine() {
        map.addLayer({
            'id': 'LineLayer',
            'type': 'line',
            'source': gType,
            'paint': {
                'line-blur': this.blur,
                //'line-cap': this.cap,
                'line-color': this.color,
                'line-opacity': this.opacity,
                'line-width': this.width
            }
        });
    
        this.setLineVals();
    }

    setLineVals() {
        selectors.lineBlur.value = this.blur;
        selectors.lineCap.value = this.cap;
        selectors.lineColor.value = this.color;
        selectors.lineOpacity.value = this.opacity;
        selectors.lineWidth.value = this.width;
    }
}