let placement = document.querySelector("#placement");

let allCookies = document.cookie;
allCookies = allCookies.split("; ");
let formattedCookies = {};
allCookies.forEach((cookie) => {
  let aCookie = cookie.split("=");
  formattedCookies[aCookie[0]] = aCookie[1];
});

if (formattedCookies["username"] === undefined) {
  let filler = document.createElement("li");
  filler.setAttribute("class", "putTop");
  let filler1 = document.createElement("li");
  filler1.setAttribute("class", "putTop");

  placement.append(filler);

  let elem = `<a href="/login">Please login to add a Location</a>`;

  let ListItem = document.createElement("li");
  ListItem.setAttribute("id", "link");
  ListItem.innerHTML = elem;
  placement.append(ListItem);

  placement.append(filler1);
} else {
  let form = document.createElement("form");
  form.setAttribute("id", "locationForm");

  let headLine = document.createElement("h3");
  headLine.innerHTML = "Add Location";

  let locationNameElem = document.createElement("div");

  let locationNameLabel = document.createElement("label");
  locationNameLabel.setAttribute("for", "name");
  locationNameLabel.innerHTML = "Name of Location *";

  let locationNameInput = document.createElement("input");
  locationNameInput.setAttribute("type", "name");
  locationNameInput.setAttribute("id", "name");
  locationNameInput.setAttribute("required", "required");

  locationNameElem.appendChild(locationNameLabel);
  locationNameElem.appendChild(locationNameInput);

  let addressElem = document.createElement("div");

  let addressLabel = document.createElement("label");
  addressLabel.setAttribute("for", "minPlayers");
  addressLabel.innerHTML = "Address of location *";

  let addressInput = document.createElement("input");
  addressInput.setAttribute("type", "address");
  addressInput.setAttribute("id", "address");
  addressInput.setAttribute("required", "required");

  addressElem.appendChild(addressLabel);
  addressElem.appendChild(addressInput);

  let buttons = document.createElement("div");
  buttons.setAttribute("id", "buttons");

  let submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submit");
  submit.setAttribute("alt", "submit button");
  submit.innerHTML = "Submit";

  let reset = document.createElement("button");
  reset.setAttribute("type", "reset");
  reset.setAttribute("id", "reset");
  reset.setAttribute("alt", "reset button");
  reset.innerHTML = "Reset";

  buttons.appendChild(submit);
  buttons.appendChild(reset);

  form.append(
    headLine,
    locationNameElem,
    addressElem,
    buttons
  );

  document.getElementsByTagName("body")[0].appendChild(form);
}
