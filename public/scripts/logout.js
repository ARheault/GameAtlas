function deleteCookie(cookieName) {
  document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

deleteCookie("username");

window.location.href = "http://localhost:5000/";
