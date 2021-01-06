const express = require("express");
const fs = require("fs");
const path = require("path");
const { checkToken, verifyTokenImg } = require("../middlewares/auth");

const app = express();

app.get("/image/:type/:img", verifyTokenImg, (req, res) => {
  const type = req.params.type;
  const img = req.params.img;
  const pathURL = path.resolve(__dirname, `../../uploads/${type}/${img}`);

  if (fs.existsSync(pathURL)) {
    res.sendFile(pathURL);
  } else {
    const noImagePath = path.resolve(__dirname, "../assets/no-image.jpg");
    res.sendFile(noImagePath);
  }
});

module.exports = app;
