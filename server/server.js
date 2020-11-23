const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("./config/config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/index"));

// enable public folder
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
  res.json("Hello!");
});

mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("DB Online");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
