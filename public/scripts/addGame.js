const url = "http://localhost:5000/addGame";

async function handleSubmit(event) {
    event.preventDefault();
    const gameName = document.querySelector("#name").value;
    const gameLocation = document.querySelector("#location").value;
    const maxPlayers = document.querySelector("#maxPlayers").value;
    const minPlayers = document.querySelector("#minPlayers").value;
    const reccuring = document.querySelector("#reccuring").value;


    ((Response) => {
        return Response.json();
    })
    .then((result) => {
        console.log(sesult);
        return result.success;
    })
    .catch((err) => console.log(`Error: ${err}`));
}

const form = document.getElementById("addGameForm");
form.addEventListener("submit", handleSubmit);