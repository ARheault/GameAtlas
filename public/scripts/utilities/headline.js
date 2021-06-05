console.log(formattedCookies);
let header = document.querySelector("#headLine");
if (formattedCookies.authenticated === undefined) {
  header.textContent = "Welcome to GameAtlas!";
  document.cookie = "authenticated=false;";
} else if (formattedCookies.JustLoggedIn === "true") {
  header.textContent = `Welcome back to GameAtlas, ${formattedCookies.username}!`;
  document.cookie = "JustLoggedIn=false;";
} else {
  header.textContent = "GameAtlas";
}
