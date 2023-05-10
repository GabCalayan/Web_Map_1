//Adding map access token from Mapbox 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/clhfkowrw00h801pe4hvmf2xp',
    center: [-79.347015, 43.651070],
    zoom: 10,
});

//Adding GEOJSON sources 
map.on('load', () => { 

    map.addSource('City_Wards', {
        type:'geojson',
        data: 'https://gabcalayan.github.io/Web_Map_1/City_Wards_Data.json',
    });

    //Visualizing the City Wards layer    
    map.addLayer({
        'id': 'Ward',
        'source': 'City_Wards',
        'type': 'fill',
        'layout': {},
        'paint': {
            'fill-opacity': 0.5,
            'fill-color': 'green'
        }
    });
    //Visualizing the City Wards line borders 
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
    
});