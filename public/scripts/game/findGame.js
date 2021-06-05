const url = "http://localhost:5000/Games/findGame";

async function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#gameToFind").value;

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
  let theGame = serverResponse.game;
  console.log(theGame);

  let elem = document.createElement("div");
  elem.setAttribute("id", "game");

  let aName = document.createElement("p");
  aName.setAttribute("id", "nameOfGame");
  aName.innerHTML = "Name of Game: " + theGame.gameName;

  let minPlayers = document.createElement("p");
  minPlayers.innerHTML = "Minimum Players: " + theGame.minimumPlayers;

  let maxPlayers = document.createElement("p");
  maxPlayers.innerHTML = "Maximum Players: " + theGame.maximumPlayers;

  let theDate = document.createElement("p");
  theDate.innerHTML =
    "Created: " + new Date(theGame.dateCreated).toLocaleString();

  let isReocurring = document.createElement("p");
  if (theGame.reocurring === true) {
    isReocurring.innerHTML = "It is a reocurring event";
  } else {
    isReocurring.innerHTML = "It is not a reocurring event";
  }

  let creatorElem = document.createElement("div");

  let creatorHeader = document.createElement("h5");
  creatorHeader.innerHTML = "Creators:";

  let theCreators = document.createElement("ul");
  theGame.creators.forEach((creator) => {
    let aCreator = document.createElement("li");
    aCreator.innerHTML = creator;
    theCreators.appendChild(aCreator);
  });

  creatorElem.appendChild(creatorHeader);
  creatorElem.appendChild(theCreators);

  elem.append(
    aName,
    minPlayers,
    maxPlayers,
    isReocurring,
    theDate,
    creatorElem
  );

  document.getElementsByTagName("body")[0].appendChild(elem);
}

const form = document.getElementById("findGameForm");
form.addEventListener("submit", handleSubmit);
