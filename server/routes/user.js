const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const User = require("../models/user");
const { checkToken, verifyAdmin } = require("../middlewares/auth");

const app = express();

app.get("/user", checkToken, (req, res) => {
  let from = Number(req.query.from) || 0;
  from = Number(from);
  let limit = req.query.limit || 5;
  limit = Number(limit);

  User.find({ status: true }, "name email role status google img")
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err,
        });
      }

      User.count({ status: true }, (_, count) => {
        res.json({ ok: true, users, count });
      });
    });
});

app.post("/user", [checkToken, verifyAdmin], (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, userDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, user: userDB });
  });
});

app.put("/user/:id", [checkToken, verifyAdmin], (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, "name", "email", "role", "img", "status");

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({ ok: true, user: userDB });
    }
  );
});

app.delete("/user/:id", [checkToken, verifyAdmin], (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }
    if (!user) {
      res.status(400).json({
        ok: false,
        err: "not found",
      });
    }
    res.json({ ok: true, user });
  });
});

module.exports = app;
