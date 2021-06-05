const url = "http://localhost:5000/Users/add";

async function handleSubmit(event) {
  event.preventDefault();
  const username = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const secondPass = document.querySelector("#confirmPassword").value;
  const homeLocation = document.querySelector("#homeLocation").value;
  if (password !== secondPass) {
    console.log("Bad password!");
    return;
  }
  let authenticated = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      homeLocation: homeLocation,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result.success;
    })
    .catch((err) => console.log(`Error: ${err}`));

    if (
        typeof authenticated !== undefined &&
        authenticated !== null &&
        authenticated === true
      ) {
        document.cookie = `username=${username}`;
        document.cookie = `authenticated=true`;
        window.location.href = "http://localhost:5000/";
      }
}

const form = document.getElementById("loginForm");
form.addEventListener("submit", handleSubmit);
