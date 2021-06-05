const url = "http://localhost:5000/Locations/findLocation";
let results = document.querySelector("placement");

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
    return;
  }
  let theLocation = serverResponse.location;
  console.log(theLocation);

  let elem = document.createElement("div");
  elem.setAttribute("id", "location");
  let textArea = `<p>name: ${theLocation.name}</p><p>address: ${theLocation.address}</p><p>number of games: ${theLocation.numGames}</p>`;
  textArea += `<p>Created: ${new Date(
    theLocation.dateCreated
  ).toLocaleString()}</p>`;

  textArea += `<h5>Games:<h5><ul>`;
  theLocation.games.forEach((game) => {
    textArea += `<li>${game}</li>`;
  });
  textArea += "</ul>";

  textArea += `<h5>Creators:<h5><ul>`;
  theLocation.creators.forEach((creator) => {
    textArea += `<li>${creator}</li>`;
  });
  textArea += "</ul>";
  elem.innerHTML = textArea;

  document.getElementsByTagName("body")[0].appendChild(elem);
}

const form = document.getElementById("findLocationForm");
form.addEventListener("submit", handleSubmit);
