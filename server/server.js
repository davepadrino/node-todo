const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./config/config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.get("/user", (req, res) => {
  res.json("Users");
});

app.post("/user", (req, res) => {
  const body = req.body;
  res.json({ body });
});

app.put("/user", (req, res) => {
  const id = req.params.id;
  res.json({ id });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
