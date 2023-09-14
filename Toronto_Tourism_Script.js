//Adding map access token from Mapbox 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/clhie6n9u005g01pa9setbtlq',
    center: [-79.347015, 43.651070],
    zoom: 9.5,
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
            'line-width': 2,
            'line-color': 'black'
        }
    });

    //Adding the layer label for my city wards
    map.addLayer ({
        'id': 'Ward_Labels',
        'type': 'symbol',
        'source':'City_Wards',
        'layout': {
            'text-field': ['step', ['zoom'], "", 11, ['get', 'AREA_NAME']],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'center',
            'text-font': [
                'Open Sans Bold',
                'Arial Unicode MS Bold'
            ],
            'text-size': 10,
            'text-transform': 'uppercase'
        },
        'paint': {
            'text-color': 'black'
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
            'fill-color': '#f7f28b'
        }
    });

    //Visualizing the Neighbourhoods borders 
    map.addLayer({
        'id':'outline_2',
        'source':'Neighbourhood',
        'type':'line',
        'layout':{},
        'paint': {
            'line-width': 1,
            'line-color':'black'
        }
    });

    //Adding a layer label for my neighborhoods 
    map.addLayer ({
        'id': 'Neighbourhood_Labels',
        'type': 'symbol',
        'source':'Neighbourhood',
        'layout': {
            'text-field': ['step', ['zoom'], "", 11, ['get', 'AREA_NAME']],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'center',
            'text-font': [
                'Open Sans Bold',
                'Arial Unicode MS Bold'
            ],
            'text-size': 10,
            'text-transform': 'uppercase'
        },
        'paint': {
            'text-color': 'black'
        }
    });    

    //Visualizing the Tourism points using GEOID
    map.addLayer({
        'id':'Tourists',
        'source':'Tourism',
        'type':'circle',
        'paint': {    
            "circle-opacity": 1,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": '#000',
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 10,
                10, 5
            ],
            'circle-color': [
                'step',
                ['get', 'GEOID'],
                'black',

                5, 'green',
                7, 'green',
                10, 'green',
                11, 'green',
                31, 'green',
                32, 'green',
                33, 'green',
                35, 'green',
                41, 'green',
                54, 'green',
                56, 'green',
                58, 'green',
                60, 'green',
                63, 'green',
                66, 'green',
                68, 'green',
                69, 'green',
                74, 'green',
                75, 'green',
                79, 'green',
                103, 'green',
                105, 'green',
                106, 'green',
                107, 'green',
                119, 'green',
                121, 'green',
                126, 'green',
                142, 'green',
                143, 'green',
                149, 'green',
                150, 'green',
                165, 'green',
                166, 'green',
                168, 'green',
               

            ]
        },
        'filter':['==', ['get', 'CATEGORY'], 'Nature/ Park']
    });

//Adding a layer of labels for my points 
map.addLayer ({
    'id': 'Tourism_Labels',
    'type': 'symbol',
    'source':'Tourism',
    'layout': {
        'text-field': ['step', ['zoom'], "", 12, ['get', 'NAME']],
        'text-variable-anchor': ['bottom'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto'
    },
    'paint': {
        'text-color': 'black'
    },
    'filter':['==', ['get', 'CATEGORY'], 'Nature/ Park'] 
});    

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
