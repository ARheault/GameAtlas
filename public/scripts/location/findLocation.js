const url = "http://localhost:5000/Locations/findLocation";

async function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#locationToFind").value;

  console.log(`Searching for ${name}`);

  let serverResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(`Error: ${err}`));

  if (serverResponse.success !== true) {
    alert("that game does not exist! check your spelling!");
    return;
  }
  let theLocation = serverResponse.location;
  console.log(theLocation);

  let elem = document.createElement("div");
  elem.setAttribute("id", "location");

  let aName = document.createElement("p");
  aName.setAttribute("id", "nameOfLocation");
  aName.innerHTML = "Name of Location: " + theLocation.name;

  let anAddress = document.createElement("p");
  anAddress.innerHTML = "Address: " + theLocation.address;

  let theNumGames = document.createElement("p");
  theNumGames.innerHTML = "Number of Games: " + theLocation.numGames;

  let theDate = document.createElement("p");
  theDate.innerHTML =
    "Created: " + new Date(theLocation.dateCreated).toLocaleString();

  let gameHeader = document.createElement("h5");
  gameHeader.innerHTML = "Games:";

  let theGames = document.createElement("ul");
  theLocation.games.forEach((game) => {
    let aGame = document.createElement("li");
    aGame.innerHTML = game;
    theGames.appendChild(aGame);
  });

  let gameInputElem = document.createElement("form");
  gameInputElem.setAttribute("id", "addGame");

  let gameLabel = document.createElement("label");
  gameLabel.setAttribute("for", "inputGame");
  gameLabel.innerHTML = "Add Game:";

  let gameInput = document.createElement("input");
  gameInput.setAttribute("type", "inputGame");
  gameInput.setAttribute("id", "inputGame");
  gameInput.setAttribute("required", "required");

  gameInputElem.appendChild(gameLabel);
  gameInputElem.appendChild(gameInput);

  let buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");

  let submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submitGame");
  submit.setAttribute("alt", "submit button");
  submit.innerHTML = "Submit";

  buttons.appendChild(submit);

  gameInputElem.appendChild(buttons);

  let creatorElem = document.createElement("div");

  let creatorHeader = document.createElement("h5");
  creatorHeader.innerHTML = "Creators:";

  let theCreators = document.createElement("ul");
  theLocation.creators.forEach((creator) => {
    let aCreator = document.createElement("li");
    aCreator.innerHTML = creator;
    theCreators.appendChild(aCreator);
  });

  creatorElem.appendChild(creatorHeader);
  creatorElem.appendChild(theCreators);

  let theScript = document.createElement("script");
  theScript.setAttribute(
    "src",
    "../../scripts/location/findlocationaddgame.js"
  );

  elem.append(
    aName,
    anAddress,
    theNumGames,
    theDate,
    gameHeader,
    theGames,
    gameInputElem,
    creatorElem,
    theScript
  );

  document.getElementsByTagName("body")[0].appendChild(elem);
}

const form = document.getElementById("findLocationForm");
form.addEventListener("submit", handleSubmit);
