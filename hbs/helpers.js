const hbs = require("hbs");

hbs.registerHelper("getYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("capitalize", (text) => {
  let char = text.split(" ");
  char.forEach((element, i) => {
    char[i] = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
  return char.join(" ");
});
