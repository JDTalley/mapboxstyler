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
let pointRadius = 10;
let pointColor = 'black';

// Select Input div
let inputdiv = document.querySelector('.input');

// Select Geometry Type
let geoTypebtn = document.querySelector('.geometry-type');

// Select Point Properties
let pointdiv = document.querySelector('.input-point');

// Select Point Buttons
/* let addPointButton = document.querySelector('#addPoint');
let editPointButton = document.querySelector('#editPoint');
let submitPoint = document.querySelector('#submitPoint');
let cancelPoint = document.querySelector('#cancelPoint');
let pointName = document.querySelector('#pointName');
let pointRadiusButton = document.querySelector('#pointRadius');
let pointColorButton = document.querySelector('#pointColor'); */

// Layer Arrays
let pointArr = [];

// Wait for load
map.on('load', () => {
    inputdiv.classList.remove('hidden');
});

// ********** //
// Add listeners
// ********** //

// Geography Type
geoTypebtn.addEventListener('change', (e) => {
    geoType(e);
});


// ********** //
// Functions
// ********** //

// Geography Type
function geoType(e) {
    const gType = e.target.value;
    console.log(gType);

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
                        'coordinates': [
                            -80.4139,
                            37.22
                        ]
                    },
                    'properties': {
                        'title': 'Blacksburg Point'
                    }
                }
            ]
        }
    });

    pointdiv.classList.remove('hidden');
}

// Wait for map to load
/* map.on('load', function () {
    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    // feature for Mapbox DC
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            -80.4139,
                            37.22
                        ]
                    },
                    'properties': {
                        'title': 'Blacksburg Point'
                    }
                }
            ]
        }
    });

    // Hide Loading Div
    //document.querySelector('#main-load').classList.toggle("fadeout");
}); */

/* addPointButton.addEventListener('click', () => {
    addPointButton.classList.toggle("hidden");

    let fields = document.querySelectorAll('.point');
    fields.forEach((e) => {
        e.classList.toggle("hidden");
    })

    map.addLayer({
        'id': 'newPointLayer',
        'type': 'circle',
        'source': 'points',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': pointRadius,
            // color circles by ethnicity, using a match expression
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': pointColor
        }
    });

    pointName.value = "Point Layer";
    pointRadiusButton.value = pointRadius;
    pointColorButton.value = 'black';
}) */

/* cancelPoint.addEventListener('click', () => {
    map.removeLayer('newPointLayer');

    addPointButton.classList.toggle("hidden");

    let fields = document.querySelectorAll('.point');
    fields.forEach((e) => {
        e.classList.toggle("hidden");
    })
}) */

/* pointRadiusButton.addEventListener('change', (e) => {
    pointRadius = parseInt(e.target.value);

    map.removeLayer("newPointLayer");

    map.addLayer({
        'id': 'newPointLayer',
        'type': 'circle',
        'source': 'points',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': pointRadius,
            // color circles by ethnicity, using a match expression
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': pointColor
        }
    });
}) */

/* pointColorButton.addEventListener('change', (e) => {
    pointColor = e.target.value;

    map.removeLayer("newPointLayer");

    map.addLayer({
        'id': 'newPointLayer',
        'type': 'circle',
        'source': 'points',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': pointRadius,
            // color circles by ethnicity, using a match expression
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': pointColor
        }
    });
}) */

/* submitPoint.addEventListener('click', () => {
    let pointNameVal = pointName.value;

    if(pointNameVal === "newPointLayer") {
        console.log("Reserved Name");
    } else if(map.getLayer(pointNameVal)) {
        console.log("Name already exists");
    } else {
        map.removeLayer("newPointLayer");

        map.addLayer({
            'id': pointNameVal,
            'type': 'circle',
            'source': 'points',
            'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': pointRadius,
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': pointColor
            }
        });

        pointArr.push(pointNameVal);

        addPointButton.classList.toggle("hidden");
        editPointButton.classList.toggle("hidden");

        let fields = document.querySelectorAll('.point');
        fields.forEach((e) => {
            e.classList.toggle("hidden");
        })

        pointRadius = 10;
        pointColor = 'black';
    }
}) */

/* editPointButton.addEventListener('click', () => {
    editPointButton.classList.toggle("hidden");
    addPointButton.classList.toggle("hidden");

    pointArr.forEach(layer => {
        let input = document.createElement("input");
        input.type = 'submit';
        input.value = layer;
        input.name = layer;
        input.className = 'edit-point';

        input.addEventListener('click', (e) => {
            let edits = document.querySelectorAll('.edit-point');
            edits.forEach(e => {
                e.classList.toggle("hidden");
            })

            let fields = document.querySelectorAll('.point');
            fields.forEach(e => {
                e.classList.toggle("hidden");
            })

            let oldLayer = map.getLayer(e.target.value);
            let oldColorR = oldLayer.paint._values["circle-color"].value.value.r;
            let oldColorG = oldLayer.paint._values["circle-color"].value.value.g;
            let oldColorB = oldLayer.paint._values["circle-color"].value.value.b;
            let oldColorA = oldLayer.paint._values["circle-color"].value.value.a;
            let oldColorHex = RGBAToHex(oldColorR, oldColorG, oldColorB);

            map.removeLayer(e.target.value);
        
            map.addLayer({
                'id': 'newPointLayer',
                'type': oldLayer.type,
                'source': 'points',
                'paint': {
                    // make circles larger as the user zooms from z12 to z22
                    'circle-radius': oldLayer.paint._values["circle-radius"].value.value,
                    // color circles by ethnicity, using a match expression
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                    'circle-color': oldColorHex
                }
            });
        
            pointName.value = oldLayer.id;
            pointRadiusButton.value = oldLayer.paint._values["circle-radius"].value.value;
            pointColorButton.value = oldColorHex;
        })

        document.querySelector('#edit').appendChild(input);
    })
}) */

/* let RGBAToHex = (r,g,b) => {
    r = parseInt(r).toString(16);
    console.log(r);
    g = parseInt(g).toString(16);
    console.log(g);
    b = parseInt(b).toString(16);
    console.log(b);
    //a = Math.round(a * 255).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    //if (a.length == 1)
        //a = "0" + a;

    return "#" + r + g + b;
} */

// document.ready not necessary.
/* $(document).ready(function(){
    $('#changePoint').on("click", function(){
        var inputRadius = parseInt($('#pointRadius').val());
        var inputColor = $('#pointColor').val();

        var pointRadius = 10;
        var pointColor = '#000';

        if ( inputRadius != null && inputRadius > 0){
            pointRadius = inputRadius;
        }
        pointColor = inputColor;

        // console.log(pointRadius, pointColor);
        // console.log(typeof(inputRadius));

        map.removeLayer("pointLayer");

        map.addLayer({
            'id': 'pointLayer',
            'type': 'circle',
            'source': 'points',
            'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': pointRadius,
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': pointColor
            }
        });
    });

});  */