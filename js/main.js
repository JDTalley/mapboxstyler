
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V0Y2hlbTIiLCJhIjoiY2s5ZW1zcGNsMDBmODNtcGhjbDI3OWY2cCJ9.Dp0zt7PQr7To4lhw1d5ZUg';
var map = new mapboxgl.Map({
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

    map.addLayer({
        'id': 'pointLayer',
        'type': 'circle',
        'source': 'points',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': 10,
            // color circles by ethnicity, using a match expression
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#000'
        }
    });
});

$(document).ready(function(){
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
});