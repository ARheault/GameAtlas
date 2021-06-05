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
      
        let elem = document.createElement("div");
        elem.setAttribute("id", "location");
      
        let aName = document.createElement("p");
        aName.innerHTML = "Name: " + location.name;
      
        let anAddress = document.createElement("p");
        anAddress.innerHTML = "Address: " + location.address;
      
        let theNumGames = document.createElement("p");
        theNumGames.innerHTML = "Number of Games: " + location.numGames;
      
        let theDate = document.createElement("p");
        theDate.innerHTML =
          "Created: " + new Date(location.dateCreated).toLocaleString();
      
        let gameHeader = document.createElement("h5");
        gameHeader.innerHTML = "Games:";
      
        let theGames = document.createElement("ul");
        location.games.forEach((game) => {
          let aGame = document.createElement("li");
          aGame.innerHTML = game;
          theGames.appendChild(aGame);
        });
      
        let creatorHeader = document.createElement("h5");
        creatorHeader.innerHTML = "Games:";
      
        let theCreators = document.createElement("ul");
        location.creators.forEach((creator) => {
          let aCreator = document.createElement("li");
          aCreator.innerHTML = creator;
          theCreators.appendChild(aCreator);
        });
      
        elem.append(
          aName,
          anAddress,
          theNumGames,
          theDate,
          gameHeader,
          theGames,
          creatorHeader,
          theCreators
        );
      
        document.getElementsByTagName("body")[0].appendChild(elem)
        results.append(elem);
        
      });
    })
    .catch((error) => console.log("Error: ", error));
};

getData(url);
