class Points {
    constructor() {
        this.reset()
    }

    reset() {
        this.radius     = 5
        this.color      = '#000000'
        this.blur       = 0
        this.opacity    = 1

        // Stroke Properties
        this.sColor     = '#000000'
        this.sOpacity   = 1
        this.sWidth     = 0
    }

    addPoint() {
        // Add Layer
        map.addLayer({
            'id': 'PointLayer',
            'type': 'circle',
            'source': gType,
            'paint': {
                'circle-radius': points.radius,
                'circle-color': points.color,
                'circle-blur': points.blur,
                'circle-opacity': points.opacity,
                'circle-stroke-color': points.sColor,
                'circle-stroke-opacity': points.sOpacity,
                'circle-stroke-width': points.sWidth,
            }
        });

        // Set Initial Values
        this.setPointVals();
    }

    setPointVals() {
        selectors.pointRadius.value = this.radius;
        selectors.pointColor.value = this.color;
        selectors.pointBlur.value = this.blur;
        selectors.pointOpacity.value = this.opacity;
        selectors.pointSColor.value = this.sColor;
        selectors.pointSOpacity.value = this.sOpacity;
        selectors.pointSWidth.value = this.sWidth;
    }
}