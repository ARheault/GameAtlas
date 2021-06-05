
var googleMapsAPIKey = config.API_KEY;
const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runMap&libraries=places`;

const script = document.createElement("script");
script.src = googleMapsAPIURL;
script.defer = true;
script.async = true;


const input = document.getElementById("autocomplete");
  const biasInputElement = document.getElementById("use-location-bias");
  const options = {
    componentRestrictions: { country: 'us'},
     types: ['establishment'],
     fields: ['formatted_address', 'geometry', 'name'],
     strictBounds: false,
   };
   const autocomplete = new google.maps.places.Autocomplete(input, options);