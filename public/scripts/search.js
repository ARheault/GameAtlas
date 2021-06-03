
loadPlacesAPI();

function loadPlaces(){
    console.log("places api loaded");

    const places = initAutocomplete();
}

function loadPlacesAPI(){
    var googleMapsAPIKey = config.API_KEY;
    const placesAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&libraries=places&callback=initAutocomplete`;

    const script = document.createElement("script");
    script.src = placesAPIURL;
    script.defer = true;
    script.async = true;

    window.loadPlaces = loadPlacesl

    document.head.appendChild(script);
}

function initAutocomplete() {
    const placesDiv = document.getElementById("autocomplete");
    const autocomplete = new.google.maps.places.Autocomplete(placesDiv,
    {
        types: ['establishment'],
        componentRestrictions: {'country': ['USA']},
        fields: ['place_id', 'geometry', 'name']
    });

  return autocomplete

}