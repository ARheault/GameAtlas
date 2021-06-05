const url = "http://localhost:5000/Locations/";
let results = document.querySelector("#locations");

let getData = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw "Invalid server response";
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
        let headline = document.createElement("h3");
        headline.textContent = `There are ${data.length} locations to choose from!`;
        headline.setAttribute("id", "pageIntent");
        results.append(headline);
      data.forEach((location) => {
        console.log(location.maximumPlayers);
        let elem = document.createElement("div");
        elem.setAttribute("id", "location");
        let textArea = `<p>name: ${location.name}</p><p>address: ${location.address}</p><p>number of games: ${location.numGames}</p>`;
        textArea+=`<p>Created: ${new Date(location.dateCreated).toLocaleString()}</p>`;

        textArea += `<h5>Games:<h5><ul>`;
        location.games.forEach((game) => {
          textArea += `<li>${game}</li>`;
        });
        textArea += "</ul>";

        textArea += `<h5>Creators:<h5><ul>`;
        location.creators.forEach((creator) => {
          textArea += `<li>${creator}</li>`;
        });
        textArea += "</ul>";
        elem.innerHTML = textArea;
        results.append(elem);
      });
    })
    .catch((error) => console.log("Error: ", error));
};

getData(url);
