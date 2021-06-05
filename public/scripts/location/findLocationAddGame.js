const secondUrl = "http://localhost:5000/Locations/addGame";

async function handleGameSubmit(event) {
  event.preventDefault();
  const gameName = document.querySelector("#inputGame").value;
  const locationName = document
    .querySelector("#nameOfLocation")
    .textContent.split(": ")[1];

  console.log(
    `Request to add new game: ${gameName} to location: ${locationName}`
  );

  let serverResponse = await fetch(secondUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: locationName,
      newGame: gameName,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(`Error: ${err}`));

  console.log(serverResponse);
  window.location.href = "http://localhost:5000/location";
}

const AddGameform = document.getElementById("addGame");
AddGameform.addEventListener("submit", handleGameSubmit);
