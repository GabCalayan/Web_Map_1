//Adding map access token from Mapbox 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/clhfkowrw00h801pe4hvmf2xp',
    center: [-79.347015, 43.651070],
    zoom: 10,
});
