function handleSubmit(event){
    event.preventDefault();
    console.log("User attempting to login ...");
    window.location.href = "http://localhost:5000/";
}

const form = document.getElementById("loginForm");
form.addEventListener("submit", handleSubmit);