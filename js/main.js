
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V0Y2hlbTIiLCJhIjoiY2s5ZW1zcGNsMDBmODNtcGhjbDI3OWY2cCJ9.Dp0zt7PQr7To4lhw1d5ZUg';
let map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-80.4139, 37.2296], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.on('load', function () {
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

});

// main form
let main = document.querySelector('#main');

// Initiate Values
let pointRadius = 10;
let pointColor = 'black';

// Select Point Buttons
let addPointButton = document.querySelector('#addPoint');
let submitPoint = document.querySelector('#submitPoint');
let cancelPoint = document.querySelector('#cancelPoint');
let pointName = document.querySelector('#pointName');
let pointRadiusButton = document.querySelector('#pointRadius');
let pointColorButton = document.querySelector('#pointColor');

addPointButton.addEventListener('click', () => {
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
})

cancelPoint.addEventListener('click', () => {
    addPointButton.classList.toggle("hidden");

    let fields = document.querySelectorAll('.point');
    fields.forEach((e) => {
        e.classList.toggle("hidden");
    })
})

pointRadiusButton.addEventListener('change', (e) => {
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
})

pointColorButton.addEventListener('change', (e) => {
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
})

submitPoint.addEventListener('click', () => {
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

        addPointButton.classList.toggle("hidden");

        let fields = document.querySelectorAll('.point');
        fields.forEach((e) => {
            e.classList.toggle("hidden");
        })

        pointRadius = 10;
        pointColor = 'black';
    }
})

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