// Have to add access token to config file
mapboxgl.accessToken = mbConfig.key;

// Initiate Map object
let map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-80.4139, 37.2296], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Initiate Values
let gType;
let pointValues;
let lineValues;

// Select Input div
let inputdiv = document.querySelector('.input');

// Select Geometry Type
let geoTypebtn = document.querySelector('.geometry-type');

// Select Feat divs
let featDivs = document.querySelectorAll('.input-feat');

// Select Prop divs
let pointdiv = document.querySelector('.input-feat-point');
let linediv = document.querySelector('.input-feat-line');

// Select Point Properties
let pointRadius = document.querySelector('.point-radius');
let pointColor = document.querySelector('.point-color');
let pointBlur = document.querySelector('.point-blur');
let pointOpacity = document.querySelector('.point-opacity');
let pointSColor = document.querySelector('.point-scolor');
let pointSOpacity = document.querySelector('.point-sopacity');
let pointSWidth = document.querySelector('.point-swidth');

// Select Line Properties
let lineBlur = document.querySelector('.line-blur');
let lineCap = document.querySelector('.line-cap');
let lineColor = document.querySelector('.line-color');
let lineOpacity = document.querySelector('.line-opacity');
let lineWidth = document.querySelector('.line-width');

// Select Generate Button
let genJSONbtn = document.querySelector('.gen-json');
let genJSONdiv = document.querySelector('.json');
let jsonArea = document.querySelector('.json-area');

// Wait for load
map.on('load', () => {
    inputdiv.classList.remove('hidden');
    document.querySelector('.lds-facebook').style.display = "none";
});

// ********** //
// Add listeners
// ********** //

// Geography Type
geoTypebtn.addEventListener('change', (e) => {
    gType = e.target.value;

    geoType(e);
});

// Point Properties
pointListeners();

// Line Properties
lineListeners();

// Generate JSON
genJSONbtn.addEventListener('click', (e) => {
    generateJSON();
})

// ********** //
// Functions
// ********** //

// Geography Type
function geoType(e) {
    addSource(gType);
    hideProps();
    resetDefaults();
    showProps(gType);

    switch (gType) {
        case 'Point':
            addPoint();
            break;
        case 'LineString':
            addLine();
            break;
    }

    // Show text area
    genJSONdiv.classList.remove('hidden');
    genJSONdiv.style.display = 'block';
}

function resetDefaults() {
    pointValues = {
        pointRadius: 5,
        pointColor: '#000000',
        pointBlur: 0,
        pointOpacity: 1,
        pointSColor: '#000000',
        pointSOpacity: 1,
        pointSWidth: 0
    };

    lineValues = {
        lineBlur: 0,
        lineCap: 'butt',
        lineColor: '#000000',
        lineOpacity: 1,
        lineWidth: 1
    };
}

function addSource(gType) {
    // Remove Previous Layers
    try {
        map.removeLayer('PointLayer');
    } catch (error) {
        console.log('No point layer to remove');
    }
    try {
        map.removeLayer('LineLayer');
    } catch (error) {
        console.log('No line layer to remove');
    }

    // Remove Previous Sources
    try {
        map.removeSource('Point');
    } catch (error) {
        console.log('No point source to remove');
    }
    try {
        map.removeSource('LineString');
    } catch (error) {
        console.log('No line source to remove');
    }
    
    map.addSource(gType, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    // feature for Mapbox DC
                    'type': 'Feature',
                    'geometry': {
                        'type': gType,
                        'coordinates': getCords(gType)                           
                    },
                    'properties': {
                        'title': 'Blacksburg Feature'
                    }
                }
            ]
        }
    });
}

function hideProps() {
    pointdiv.style.display = 'none';
    linediv.style.display = 'none';
}

function showProps(type) {
    switch (type) {
        case "Point":
            pointdiv.classList.remove('hidden');
            pointdiv.style.display = 'block';
            break;
        case "LineString":
            linediv.classList.remove('hidden');
            linediv.style.display = 'block';
            break;
    }
}

function addPoint() {
    // Add Layer
    map.addLayer({
        'id': 'PointLayer',
        'type': 'circle',
        'source': gType,
        'paint': {
            'circle-radius': pointValues.pointRadius,
            'circle-color': pointValues.pointColor,
            'circle-blur': pointValues.pointBlur,
            'circle-opacity': pointValues.pointOpacity,
            'circle-stroke-color': pointValues.pointSColor,
            'circle-stroke-opacity': pointValues.pointSOpacity,
            'circle-stroke-width': pointValues.pointSWidth,
        }
    });

    // Set Initial Values
    setPointVals();
}

function addLine() {
    map.addLayer({
        'id': 'LineLayer',
        'type': 'line',
        'source': gType,
        'paint': {
            'line-blur': lineValues.lineBlur,
            //'line-cap': lineValues.lineCap,
            'line-color': lineValues.lineColor,
            'line-opacity': lineValues.lineOpacity,
            'line-width': lineValues.lineWidth
        }
    });

    setLineVals();
}

function getCords(type) {
    switch (type) {
        case 'Point':
            return ([-80.4139, 37.22]);
        case 'LineString':
            return([[-80.4141, 37.15],[-80.4141, 37.25]]);
    }
}

// Generate JSON
function generateJSON() {
    // text area content
    let textArea;

    switch (gType) {
        case 'Point':
            textArea = "'paint': {'circle-radius': " +
            pointValues.pointRadius +
            ", 'circle-color': " +
            pointValues.pointColor +
            ", 'circle-blur': " +
            pointValues.pointBlur +
            ", 'circle-opacity': " +
            pointValues.pointOpacity +
            ", 'circle-stroke-color': " +
            pointValues.pointSColor +
            ", 'circle-stroke-opacity': " +
            pointValues.pointSOpacity +
            ", 'circle-stroke-width': " +
            pointValues.pointSWidth +
            "}"
            break;
        case 'LineString':
            textArea = "'paint': {'line-blur': " +
            lineValues.lineBlur +
            ", 'line-cap': '" +
            lineValues.lineCap +
            "', 'line-color': " +
            lineValues.lineColor +
            ", 'line-opacity': " +
            lineValues.lineOpacity +
            ", 'line-width': " +
            lineValues.lineWidth +
            "}"
            break;
    }

    console.log(textArea);
    jsonArea.value = textArea;
}

// Point Listeners
function pointListeners() {
    // Radius
    pointRadius.addEventListener('change', (e) => {
        pointValues.pointRadius = e.target.valueAsNumber;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Color
    pointColor.addEventListener('change', (e) => {
        pointValues.pointColor = e.target.value;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Blur
    pointBlur.addEventListener('change', (e) => {
        pointValues.pointBlur = e.target.valueAsNumber;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Opacity
    pointOpacity.addEventListener('change', (e) => {
        pointValues.pointOpacity = e.target.valueAsNumber;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Stroke Color
    pointSColor.addEventListener('change', (e) => {
        pointValues.pointSColor = e.target.value;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Stroke Opacity
    pointSOpacity.addEventListener('change', (e) => {
        pointValues.pointSOpacity= e.target.valueAsNumber;

        map.removeLayer('PointLayer');
        addPoint();
    });

    // Stroke Width
    pointSWidth.addEventListener('change', (e) => {
        pointValues.pointSWidth = e.target.valueAsNumber;

        map.removeLayer('PointLayer');
        addPoint();
    });
}

function lineListeners() {
    // Line Blur
    lineBlur.addEventListener('change', (e) => {
        lineValues.lineBlur = e.target.valueAsNumber;

        map.removeLayer('LineLayer');
        addLine();
    });
    // Line Cap
/*     lineCap.addEventListener('change', (e) => {
        lineValues.lineCap = e.target.value;

        map.removeLayer('LineLayer');
        addLine();
    }); */
    // Line Color
    lineColor.addEventListener('change', (e) => {
        lineValues.lineColor = e.target.value;

        map.removeLayer('LineLayer');
        addLine();
    });
    // Line opacity
    lineOpacity.addEventListener('change', (e) => {
        lineValues.lineOpacity = e.target.valueAsNumber;

        map.removeLayer('LineLayer');
        addLine();
    });
    // Line Width
    lineWidth.addEventListener('change', (e) => {
        lineValues.lineWidth = e.target.valueAsNumber;

        map.removeLayer('LineLayer');
        addLine();
    });
}

function setPointVals() {
    pointRadius.value = pointValues.pointRadius;
    pointColor.value = pointValues.pointColor;
    pointBlur.value = pointValues.pointBlur;
    pointOpacity.value = pointValues.pointOpacity;
    pointSColor.value = pointValues.pointSColor;
    pointSOpacity.value = pointValues.pointSOpacity;
    pointSWidth.value = pointValues.pointSWidth;
}

function setLineVals() {
    lineBlur.value = lineValues.lineBlur;
    lineCap.value = lineValues.lineCap;
    lineColor.value = lineValues.lineColor;
    lineOpacity.value = lineValues.lineOpacity;
    lineWidth.value = lineValues.lineWidth;
}