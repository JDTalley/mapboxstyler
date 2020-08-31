class Polygons {
    constructor() {
        this.reset()
    }

    reset() {
        this.color = '#000000'
        this.opacity = 1
        this.oColor = '#000000'
    }

    addPolygon() {
        map.addLayer({
            'id': 'PolygonLayer',
            'type': 'fill',
            'source': gType,
            'paint': {
                'fill-color': this.color,
                'fill-opacity': this.opacity,
                'fill-outline-color': this.oColor
            }
        });
    
        this.setPolygonVals();
    }

    setPolygonVals() {
        selectors.polygonColor.value = this.color
        selectors.polygonOpacity.value = this.opacity
        selectors.polygonOColor.value = this.oColor
    }
}
