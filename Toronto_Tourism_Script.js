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
            'fill-color':
                '#b0e0f6',
        }
    });
    //Visualizing the City Wards borders
    map.addLayer({
        'id': 'outline_1',
        'source': 'City_Wards',
        'type': 'line',
        'layout':{},
        'paint': {
            'line-width': 1.5,
            'line-color': 'black'
        }
    });

    //Adding the layer label for my city wards
    map.addLayer ({
        'id': 'Ward_Labels',
        'type': 'symbol',
        'source':'City_Wards',
        'layout': {
            'text-field': ['step', ['zoom'], "", 10, ['get', 'AREA_NAME']],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'center',
            'text-font': [
                'Open Sans Bold',
                'Arial Unicode MS Bold'
            ],
            'text-size': 15,
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
            'line-width': 0.75,
            'line-color':'black'
        }
    });

    //Adding a layer label for my neighborhoods 
    map.addLayer ({
        'id': 'Neighbourhood_Labels',
        'type': 'symbol',
        'source':'Neighbourhood',
        'layout': {
            'text-field': ['step', ['zoom'], "", 12, ['get', 'AREA_NAME']],
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
        'text-field': ['step', ['zoom'], "", 11, ['get', 'NAME']],
        'text-variable-anchor': ['bottom'],
        'text-radial-offset': 1.0,
        'text-justify': 'center',
        'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
        ],
        'text-size': 12,
        'text-transform': 'uppercase'
    },
    'paint': {
        'text-color': 'black',
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

//Return to full screen on button click 
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.347015, 43.651070],
        zoom: 9.5,
        essential: true
    });
});

//Adding simple click event to check if it works for Tourists points  
map.on('click', 'Tourists', (e) => {
    console.log(e);
    let Attraction_Name = e.features[0].properties.NAME;
    console.log(Attraction_Name);
})

//Adding pop - up on click event for Tourists layer
map.on('mouseenter', 'Tourists', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'Tourists', () => {
    map.getCanvas().style.cursor = '';
    map.setFilter("Tourists",['=='], ['get', 'NAME'], '');
}); 

map.on('click', 'Tourists', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<b>Park/Greenspace:</b> " + e.features[0].properties.NAME + "<br>" + "<b>Address:</b> "
    + e.features[0].properties.ADDRESS_FULL)
    .addTo(map);
});

//Change display of Ward layer based on check box 
document.getElementById('LayerFlexCheck1').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Neighbour',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

document.getElementById('LayerFlexCheck1').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Neighbourhood_Labels',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

document.getElementById('LayerFlexCheck1').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'outline_2',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

//Change display of Ward layer based on check box 
document.getElementById('LayerFlexCheck2').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Ward',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

document.getElementById('LayerFlexCheck2').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Ward_Labels',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

document.getElementById('LayerFlexCheck2').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'outline_1',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

//Change display of Tourism layer based on check box 
document.getElementById('LayerFlexCheck3').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Tourists',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

document.getElementById('LayerFlexCheck3').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'Tourism_Labels',
        'visibility',
        e.target.checked ? 'visible': 'none'
    );
});

//LEGEND SECTION 
const legendlabels = [
    'Park/Greenspaces',
    'Neighbourhoods',
    'Wards',
]

const legendcolours = [
    'green',
    '#f7f28b',
    '#b0e0f6'
];

//Calling the legend from HTML 
const legend = document.getElementById('Legend');


legendlabels.forEach((label,i) => { 
    const color = legendcolours[i]; 

    const item = document.createElement('div'); 
    const key = document.createElement('span'); 

    key.className = 'legend-key';  
    key.style.backgroundColor = color; 

    const value = document.createElement('span');
    value.innerHTML = `${label}`;

    item.appendChild(key); 
    item.appendChild(value);
    
    legend.appendChild(item);

}); 



}); //Here is the end of the map.load function

