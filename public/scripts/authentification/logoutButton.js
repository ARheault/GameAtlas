let results = document.querySelector("#login");

console.log(results);
let allCookies = document.cookie;
allCookies = allCookies.split("; ");
let formattedCookies = {};
allCookies.forEach((cookie) => {
  let aCookie = cookie.split("=");
  formattedCookies[aCookie[0]] = aCookie[1];
});

if (formattedCookies["username"] === undefined) {
    let elem = document.createElement("a");
    elem.setAttribute("href", "/login");
    elem.textContent = "Login";
    results.append(elem);
} else {
    let elem = document.createElement("a");
    elem.setAttribute("href", "/logout");
    elem.textContent = "Logout";
    results.append(elem);
}
