const url = "http://localhost:5000/Games/";
let results = document.querySelector("#games");
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
        headline.textContent = `There are ${data.length} games to choose from!`;
        headline.setAttribute("id", "pageIntent");
        results.append(headline);
      data.forEach((game) => {
        console.log(game.maximumPlayers);
        let elem = document.createElement("div");
        elem.setAttribute("id", "game");
        let textArea = `<p>Name: ${game.gameName}</p><p>Maximum Players: ${game.maximumPlayers}</p><p>Minimum Players: ${game.minimumPlayers}</p>`;
        if (game.reocurring) {
          textArea += `<p>The game is reocurring</p>`;
        } else {
          textArea += `<p>The game is not reocurring</p>`;
        }
        textArea+=`<p>Created: ${new Date(game.dateCreated).toLocaleString()}</p>`;
        textArea += `<h5>Creators:<h5><ul>`;
        game.creators.forEach((creator) => {
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
