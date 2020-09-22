const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");

app.get("/user", (req, res) => {
  res.json("Users");
});

app.post("/user", (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, userDB) => {
    console.log("err", err);
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, user: userDB });
  });
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, user: userDB });
  });
});

app.delete("/user", (req, res) => {
  console.log("delete");
});

module.exports = app;
