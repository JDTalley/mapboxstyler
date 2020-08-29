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
                'line-blur': lines.blur,
                //'line-cap': lines.cap,
                'line-color': lines.color,
                'line-opacity': lines.opacity,
                'line-width': lines.width
            }
        });
    
        setLineVals();
    }
}