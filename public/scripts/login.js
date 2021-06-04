const url = "http://localhost:5000/Users/login";

function handleSubmit(event) {
  event.preventDefault();
  const username = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  console.log(`Attempted login by user: ${username}`);
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "username": username, "password": password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(`Error: ${err}`));

  //window.location.href = "http://localhost:5000/";
}

const form = document.getElementById("loginForm");
form.addEventListener("submit", handleSubmit);
