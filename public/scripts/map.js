//just set this up with the api i generated the other day, alot of this can and probably will change

loadMapAPI();

function runMap() {
  console.log("map api loaded");

  const map = initMap();
  const autocomplete = initAutocomplete();



  autocomplete.addListener("place_changed", () => {
    const loc = autocomplete.getPlace();
    console.log(loc);
    Location.name = loc.name
    Location.address = loc.formatted_address;

    placeMarker(Location.address, map);
   })


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
   //const geocoder = new google.maps.Geocoder();

  //  autocomplete.addListener("place_changed", () => {
  //   const loc = autocomplete.getPlace();
  //   console.log(loc);
  //   Location.name = loc.name
  //   Location.address = loc.formatted_address;
  //   geocoder.geocode( { 'address' : loc.formatted_address}, function(results){
  //     console.log(results);
  //     var latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
  //     console.log(latLng);
  //     new google.maps.Marker({
  //       position: latLng,
  //       map,
  //       title: "games here",
  //     });
  //   })
  //  })


   return autocomplete;
}

function placeMarker(address, map){
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address' : address}, function(results, status) {
    console.log(results);

    var latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
    console.log(latLng);
      new google.maps.Marker({
        position: latLng,
        map,
        title: "games here",
      });
  })
}



