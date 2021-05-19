
//just set this up with the api i generated the other day, alot of this can and probably will change
//import MarkerClusterer from '@google/markerclustererplus';

loadMapAPI();

function runMap() {
    console.log('map api loaded');

    const map = initMap();
}


function loadMapAPI() {
    const googleMapsAPIKey = 'AIzaSyBOyXcPfjFGjrUmoHWXsoSFnoSyRcXsnW0';
    const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runMap`;    

    const script = document.createElement('script');
    script.src = googleMapsAPIURL;
    script.defer = true;
    script.async = true;

    window.runMap = runMap;

    document.head.appendChild(script);
}

function initMap(){
    const mapOptions = {
        center: { lat: 45.52350484987376, lng: -122.67618610030048},
        zoom: 14
    }
    const mapDiv = document.getElementById("map");
    const map = new google.maps.Map(mapDiv, mapOptions);
    return map;
}