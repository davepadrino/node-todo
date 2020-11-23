const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

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

// Google conf
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  return {
    name,
    email,
    img: picture,
    google: true,
  };
}

app.post("/google", async (req, res) => {
  const token = req.body.idtoken;
  const googleUser = await verify(token).catch((err) =>
    res.status(403).json({
      ok: false,
      err,
    })
  );

  User.findOne({ email: googleUser.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (userDB) {
      if (!userDB.google) {
        return res.status(400).json({
          ok: false,
          err: { message: "Use normal auth" },
        });
      } else {
        const token = jwt.sign(
          {
            user,
          },
          process.env.SEED,
          { expiresIn: process.env.EXP_TOKEN }
        );
        res.status(200).json({ ok: true, user: userDB });
      }
    } else {
      const user = new User();
      user.name = googleUser.name;
      user.email = googleUser.email;
      user.img = googleUser.img;
      user.google = true;
      user.password = "ke";
      user.save((err, us) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        const token = jwt.sign(
          {
            us,
          },
          process.env.SEED,
          { expiresIn: process.env.EXP_TOKEN }
        );
        res.status(200).json({ ok: true, user: us });
      });
    }
  });
});

module.exports = app;
