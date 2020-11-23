process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/coffee";
} else {
  urlDB = process.env.MONGO_URI;
}

// ***********
// Token exp
// ***********
process.env.EXP_TOKEN = 60 * 60 * 34 * 30;
process.env.SEED = process.env.SEED || "secret";

process.env.URLDB = urlDB;

// ***********
// Google client id
// ***********
process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "886157966767-jjeme837g67ko39ck4eb497u5gdl3ius.apps.googleusercontent.com";
