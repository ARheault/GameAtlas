// I cannot figure out how to import this into other files!
let formattedCookies = () => {
  let allCookies = document.cookie;
  allCookies = allCookies.split("; ");
  allCookies.forEach((cookie) => {
    let aCookie = cookie.split("=");
    formattedCookies[aCookie[0]] = aCookie[1];
  });
};
