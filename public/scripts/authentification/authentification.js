console.log("This is being called");

let allCookies = document.cookie;
allCookies = allCookies.split("; ");
let formattedCookies = {};
allCookies.forEach((cookie) => {
  let aCookie = cookie.split("=");
  formattedCookies[aCookie[0]] = aCookie[1];
});

if(formattedCookies.authenticated && formattedCookies.authenticated === "true"){
     window.location.href = "http://localhost:5000/";
}