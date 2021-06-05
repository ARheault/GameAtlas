const url = "http://localhost:5000/Locations/add";

async function handleSubmit(event) {
  event.preventDefault();
  const locationName = document.querySelector("#name").value;
  const address = document.querySelector("#address").value;

  console.group("=== Game Submission ===");
  console.log(`locationName: ${locationName}`);
  console.log(`address: ${address}`);
  console.log(`Creator: ${formattedCookies.username}`);
  console.groupEnd();

  let success = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: locationName,
      address: address,
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
    .catch((err) => console.log(`Error: ${err}`));

  window.location.href = "http://localhost:5000/location";
}

const form = document.getElementById("locationForm");
form.addEventListener("submit", handleSubmit);
