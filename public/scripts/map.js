//just set this up with the api i generated the other day, alot of this can and probably will change

loadMapAPI();

function runMap() {
  console.log("map api loaded");

  const map = initMap();
}

function loadMapAPI() {
  var googleMapsAPIKey = config.API_KEY;
  const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runMap&libraries=places`;

  const script = document.createElement("script");
  script.src = googleMapsAPIURL;
  script.defer = true;
  script.async = true;

  window.runMap = runMap;

  document.head.appendChild(script);
}

function initMap() {
  const mapOptions = {
    center: { lat: 45.52350484987376, lng: -122.67618610030048 },
    zoom: 14,
  };
  const mapDiv = document.getElementById("map");
  const map = new google.maps.Map(mapDiv, mapOptions);

  //getting location data for markers
  // const input = document.getElementById("autocomplete");
  // const biasInputElement = document.getElementById("use-location-bias");
  // const options = {
  //   componentRestrictions: { country: 'us'},
  //    types: ['establishment'],
  //    fields: ['formatted_address', 'geomentry', 'name'],
  //    stricBounds: false,
  //  };
  //  const autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete = initAutocomplete();

  return map;
}


function initAutocomplete(){
  //getting location data for markers
  const input = document.getElementById("autocomplete");
  const biasInputElement = document.getElementById("use-location-bias");
  const options = {
    componentRestrictions: { country: 'us'},
     types: ['establishment'],
     fields: ['formatted_address', 'geometry', 'name'],
     stricBounds: false,
   };
   const autocomplete = new google.maps.places.Autocomplete(input, options);
   var geocoder = new google.maps.Geocoder();

   autocomplete.addListener("place_changed", () => {
    const loc = autocomplete.getPlace();
    console.log(loc);
    Location.name = loc.name
    Location.address = loc.formatted_address;
    var latLong = geocoder.geocode( { 'address' : Location.address})
    console.log(latLong)
   })


   return autocomplete;
}

function placeMarker(autocomplete){


}

