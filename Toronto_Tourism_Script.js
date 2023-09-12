//Adding map access token from Mapbox 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/clhie6n9u005g01pa9setbtlq',
    center: [-79.347015, 43.651070],
    zoom: 9,
});

//MAP VISUALIZATION SECTION
//Adding GEOJSON sources 
map.on('load', () => { 

    //Adding the source for the City Wards data (Polygon)
    map.addSource('City_Wards', {
        type:'geojson',
        data:'https://gabcalayan.github.io/Web_Map_1/City_Wards_Data.json',
    });

    //Adding the source for the Neighbourhoods data (Polygon)
    map.addSource('Neighbourhood', {
        type:'geojson',
        data:'https://gabcalayan.github.io/Web_Map_1/Neighbourhoods.json',
    });

    //Adding the source for the Tourism data (Points)
    map.addSource('Tourism', {
        type:'geojson',
        data:'https://gabcalayan.github.io/Web_Map_1/Tourism_Spots.geojson'
    })

    //Visualizing the City Wards layer    
    map.addLayer({
        'id': 'Ward',
        'source': 'City_Wards',
        'type': 'fill',
        'layout': {},
        'paint': {
            'fill-opacity': 0.9,
            'fill-color': [
                'match',
                ['get', '_id'],
                1,
                '#f08080',
                2,
                '#fa8072',
                3,
                '#ffa07a',
                4,
                '#ffb6c1',
                5,
                '#ffa07a',
                6,
                '#ff7f50',
                7,
                '#ffffe0',
                8,
                '#ffefd5',
                9,
                '#ffe4b5',
                10,
                '#e0e680',
                11,
                '#e6e6fa',
                12,
                '#d8bfd8',
                13,
                '#dda0dp',
                14,
                '#98fb98',
                15,
                '#90ee90',
                16,
                '#8fbc8b',
                17,
                '#afeeee',
                18,
                '#e0fffe',
                19,
                '#b0c5de',
                20,
                '#b0e0f6',
                21,
                '#add8e6',
                22,
                '#87ceeb',
                23,
                '#87cefa',
                24,
                '#ffe4c4',
                25,
                '#f5deb3',
                'black'
            ],
        }
    });
    //Visualizing the City Wards borders
    map.addLayer({
        'id': 'outline_1',
        'source': 'City_Wards',
        'type': 'line',
        'layout':{},
        'paint': {
            'line-width': 3,
            'line-color': 'black'
        }
    });

    // Visualizing the Neighborhoods layer 
    map.addLayer({
        'id': 'Neighbour',
        'source': 'Neighbourhood',
        'type': 'fill',
        'layout':{},
        'paint': {
            'fill-opacity': 1,
            'fill-color': [
                'match',
                ['get', 'CLASSIFICATION_CODE'],
                'NIA',
                '#f0e68c',
                'NA',
                '#e6e6fa',
                'EN',
                '#ff6347',
                'white'
            ]
        }
    });

    //Visualizing the Neighbourhoods borders 
    map.addLayer({
        'id':'outline_2',
        'source':'Neighbourhood',
        'type':'line',
        'layout':{},
        'paint': {
            'line-width': 3,
            'line-color':'black'
        }
    });

    //Visualizing the Tourism points 
    map.addLayer({
        'id':'Tourists',
        'source':'Tourism',
        'type':'circle',
        'paint': {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8, 10,
                10, 5
            ],
            'circle-color':'black'
        },
    })

//INTERACTIVE SECTION 

//Search control function
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca"
    })
);

//Zoom and rotation controls 
map.addControl(new mapboxgl.NavigationControl());

//Fullscreen option controls 
map.addControl(new mapboxgl.FullscreenControl());
    
}); //Here is the end of the map.load function 
