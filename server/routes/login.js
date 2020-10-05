const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!user) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "User wrong or not found",
        },
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "Wrong password",
        },
      });
    }

    const token = jwt.sign(
      {
        user,
      },
      process.env.SEED,
      { expiresIn: process.env.EXP_TOKEN }
    );

    res.json({
      ok: true,
      user,
      token,
    });
  });
});

module.exports = app;
