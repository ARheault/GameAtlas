const url = "http://localhost:5000/Users/login";

async function handleSubmit(event) {
  event.preventDefault();
  const username = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  console.log(`Attempted login by user: ${username}`);
  let authenticated = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result.authenticated;
    })
    .catch((err) => console.log(`Error: ${err}`));
  if (
    typeof authenticated !== undefined &&
    authenticated !== null &&
    authenticated === true
  ) {
    // Implement cookie..
    document.cookie = `username=${username};`;
    document.cookie = `authenticated=true;`;
    document.cookie = `JustLoggedIn=true;`;
    window.location.href = "http://localhost:5000/";
  } else {
    alert("Login failed! Check your spelling.");
  }
}

const form = document.getElementById("loginForm");
form.addEventListener("submit", handleSubmit);
