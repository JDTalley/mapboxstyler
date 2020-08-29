function addListeners() {
    // ********** //
    // Property Selectors
    // ********** //

    // Point Listeners
    // Radius
    selectors.pointRadius.addEventListener('change', (e) => {
        points.radius = e.target.valueAsNumber;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }
        
        points.addPoint();
    });

    // Color
    selectors.pointColor.addEventListener('change', (e) => {
        points.color = e.target.value;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }

        points.addPoint();
    });

    // Blur
    selectors.pointBlur.addEventListener('change', (e) => {
        points.blur = e.target.valueAsNumber;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }

        points.addPoint();
    });

    // Opacity
    selectors.pointOpacity.addEventListener('change', (e) => {
        points.opacity = e.target.valueAsNumber;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }

        points.addPoint();
    });

    // Stroke Color
    selectors.pointSColor.addEventListener('change', (e) => {
        points.sColor = e.target.value;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }

        points.addPoint();
    });

    // Stroke Opacity
    selectors.pointSOpacity.addEventListener('change', (e) => {
        points.sOpacity= e.target.valueAsNumber;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }

        points.addPoint();
    });

    // Stroke Width
    selectors.pointSWidth.addEventListener('change', (e) => {
        points.sWidth = e.target.valueAsNumber;

        if (map.getLayer('PointLayer') != undefined) {
            map.removeLayer('PointLayer');
        }
        
        points.addPoint();
    });

    // Line Listeners
    // Line Blur
    selectors.lineBlur.addEventListener('change', (e) => {
        lines.blur = e.target.valueAsNumber;

        if (map.getLayer('LineLayer') !== undefined) {
            map.removeLayer('LineLayer');
        }
        addLine();
    });

    // Line Cap
    /*  selectors.lineCap.addEventListener('change', (e) => {
        lines.cap = e.target.value;

        if (map.getLayer('LineLayer') !== undefined) {
            map.removeLayer('LineLayer');
        }
        addLine();
    }); */

    // Line Color
    selectors.lineColor.addEventListener('change', (e) => {
        lines.color = e.target.value;

        if (map.getLayer('LineLayer') !== undefined) {
            map.removeLayer('LineLayer');
        }
        addLine();
    });

    // Line opacity
    selectors.lineOpacity.addEventListener('change', (e) => {
        lines.opacity = e.target.valueAsNumber;

        if (map.getLayer('LineLayer') !== undefined) {
            map.removeLayer('LineLayer');
        }
        addLine();
    });

    // Line Width
    selectors.lineWidth.addEventListener('change', (e) => {
        lines.width = e.target.valueAsNumber;

        if (map.getLayer('LineLayer') !== undefined) {
            map.removeLayer('LineLayer');
        }
        addLine();
    });

    // ********** //
    // Other Buttons
    // ********** //

    // Geometry Type Button
    selectors.geoTypebtn.addEventListener('change', (e) => {
        gType = e.target.value;
    
        geoType(e);
    });

    // Generate JSON
    selectors.genJSONbtn.addEventListener('click', generateJSON)
}