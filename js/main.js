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
let gType
let points = new Points
let lines  = new Lines

// Selectors
let selectors = new Selectors

// Listeners
addListeners()

// Wait for load
map.on('load', () => {
    selectors.inputdiv.classList.remove('hidden');
    document.querySelector('.lds-facebook').style.display = "none";
});

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
            points.addPoint();
            break;
        case 'LineString':
            lines.addLine();
            break;
    }

    // Show text area
    selectors.genJSONdiv.classList.remove('hidden');
    selectors.genJSONdiv.style.display = 'block';
}

// Add Source
function addSource(gType) {
    // Remove Previous Layers
    if (map.getLayer('PointLayer') != undefined) {
        map.removeLayer('PointLayer')
    }
    if (map.getLayer('LineLayer') != undefined) {
        map.removeLayer('LineLayer')
    }

    // Remove Previous Sources
    if (map.getSource('Point') != undefined) {
        map.removeSource('Point')
    }
    if (map.getSource('LineString') != undefined) {
        map.removeSource('LineString')
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

// Hide Properties
function hideProps() {
    selectors.pointdiv.style.display = 'none';
    selectors.linediv.style.display = 'none';
}

// Show Properties
function showProps(type) {
    switch (type) {
        case "Point":
            selectors.pointdiv.classList.remove('hidden');
            selectors.pointdiv.style.display = 'block';
            break;
        case "LineString":
            selectors.linediv.classList.remove('hidden');
            selectors.linediv.style.display = 'block';
            break;
    }
}

// Reset Properties to default values
function resetDefaults() {
    points.reset()

    lines.reset()
}

// Get Coordinates for each Geography type
function getCords(type) {
    switch (type) {
        case 'Point':
            return ([-80.4139, 37.22]);
        case 'LineString':
            return([[-80.4141, 37.15],[-80.4141, 37.25]]);
    }
}