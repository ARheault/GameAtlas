// I cannot figure out how to import this into other files!
let allCookies = document.cookie;
allCookies = allCookies.split("; ");
let formattedCookies = {};
allCookies.forEach((cookie) => {
  let aCookie = cookie.split("=");
  formattedCookies[aCookie[0]] = aCookie[1];
  console.log(
    `New Cookie Key: ${aCookie[0]} value: ${formattedCookies[aCookie[0]]}`
  );
});

export {formattedCookies};