let placement = document.querySelector("#placement");

let allCookies = document.cookie;
allCookies = allCookies.split("; ");
let formattedCookies = {};
allCookies.forEach((cookie) => {
  let aCookie = cookie.split("=");
  formattedCookies[aCookie[0]] = aCookie[1];
  console.log(
    `New Cookie Key: ${aCookie[0]} value: ${formattedCookies[aCookie[0]]}`
  );
});

if (formattedCookies["username"] === undefined) {
  let filler = document.createElement("li");
  filler.setAttribute("class", "putTop");
  let filler1 = document.createElement("li");
  filler1.setAttribute("class", "putTop");

  placement.append(filler);

  let elem = `<a href="/login">Please login to add a game</a>`;

  let ListItem = document.createElement("li");
  ListItem.setAttribute("id", "link");
  ListItem.innerHTML = elem;
  placement.append(ListItem);

  placement.append(filler1);
} else {
  let form = document.createElement("form");
  form.setAttribute("id", "gameForm");

  let headLine = document.createElement("h3");
  headLine.innerHTML = "Add Game";

  let gameNameElem = document.createElement("div");

  let gameNameLabel = document.createElement("label");
  gameNameLabel.setAttribute("for", "name");
  gameNameLabel.innerHTML = "Name of Game *";

  let gameNameInput = document.createElement("input");
  gameNameInput.setAttribute("type", "name");
  gameNameInput.setAttribute("id", "name");
  gameNameInput.setAttribute("required", "required");

  gameNameElem.appendChild(gameNameLabel);
  gameNameElem.appendChild(gameNameInput);

  let minPlayersElem = document.createElement("div");

  let minPlayersLabel = document.createElement("label");
  minPlayersLabel.setAttribute("for", "minPlayers");
  minPlayersLabel.innerHTML = "Minimum number of players *";

  let minPlayersInput = document.createElement("input");
  minPlayersInput.setAttribute("type", "number");
  minPlayersInput.setAttribute("step", "1");
  minPlayersInput.setAttribute("id", "minPlayers");
  minPlayersInput.setAttribute("required", "required");

  minPlayersElem.appendChild(minPlayersLabel);
  minPlayersElem.appendChild(minPlayersInput);

  let maxPlayersElem = document.createElement("div");

  let maxPlayersLabel = document.createElement("label");
  maxPlayersLabel.setAttribute("for", "maxPlayers");
  maxPlayersLabel.innerHTML = "Maximum number of players *";

  let maxPlayersInput = document.createElement("input");
  maxPlayersInput.setAttribute("type", "number");
  maxPlayersInput.setAttribute("step", "1");
  maxPlayersInput.setAttribute("id", "maxPlayers");
  maxPlayersInput.setAttribute("required", "required");

  maxPlayersElem.appendChild(maxPlayersLabel);
  maxPlayersElem.appendChild(maxPlayersInput);

  let reocurringElem = document.createElement("div");

  let reocurringLabel = document.createElement("label");
  reocurringLabel.setAttribute("for", "reocurring");
  reocurringLabel.innerHTML = "Will this game/event be reocurring?";

  let reocurringInput = document.createElement("input");
  reocurringInput.setAttribute("type", "checkbox");
  reocurringInput.setAttribute("id", "reocurring");

  reocurringLabel.appendChild(reocurringInput);
  reocurringElem.appendChild(reocurringLabel);

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
    gameNameElem,
    minPlayersElem,
    maxPlayersElem,
    reocurringElem,
    buttons
  );

  document.getElementsByTagName("body")[0].appendChild(form);
}
