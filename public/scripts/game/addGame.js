const url = "http://localhost:5000/Games/add";

async function handleSubmit(event) {
  event.preventDefault();
  const gameName = document.querySelector("#name").value;
  const minPlayers = document.querySelector("#minPlayers").value;
  const maxPlayers = document.querySelector("#maxPlayers").value;
  const reocurring = document.querySelector("#reocurring").checked;

  console.group("=== Game Submission ===");
  console.log(`gameName: ${gameName}`);
  console.log(`minPlayers: ${minPlayers}`);
  console.log(`maxPlayers: ${maxPlayers}`);
  console.log(`Reocurring: ${reocurring}`);
  console.log(`Creator: ${formattedCookies.username}`);
  console.groupEnd();

  let success = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: gameName,
      min: minPlayers,
      max: maxPlayers,
      isReocurring: reocurring,
      creator: formattedCookies.username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert(`There was an error adding you game: ${err}`);
    });
  if (success.success === true) {
    window.location.href = "http://localhost:5000/game";
  } else {
    alert(`Game could not be added, ${success.reason}`);
  }
}

const form = document.getElementById("gameForm");
form.addEventListener("submit", handleSubmit);
