const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./config/config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/user"));

app.get("/", (req, res) => {
  res.json("Hello!");
});

mongoose.connect("mongodb://localhost:27017/coffee", (err) => {
  if (err) {
    throw err;
  }
  console.log("DB Online");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
