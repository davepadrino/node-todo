const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();
const User = require("../models/user");
const Product = require("../models/product");

// default options
app.use(fileUpload());

app.put("/upload/:type/:id", function (req, res) {
  const type = req.params.type;
  const id = req.params.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: "No files were uploaded." });
  }

  const validTypes = ["products", "users"];

  if (validTypes.indexOf(type) < 0) {
    return res.status(400).json({
      ok: false,
      err: `Not allowed type, only: ${validTypes.join(
        ","
      )}. Received: "${type}"`,
    });
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = req.files.file;
  const fileNameArray = file.name.split(".");
  const extension = fileNameArray[fileNameArray.length - 1];

  const validExtensions = ["png", "jpg", "gif", "jpeg"];

  if (validExtensions.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: `Not allowed extension, only: ${validExtensions.join(
        ","
      )}. Received: "${extension}"`,
    });
  }

  // change file name
  const filename = `${id}-${new Date().getMilliseconds()}.${extension}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(`uploads/${type}/${filename}`, function (err) {
    if (err) return res.status(500).json({ ok: false, err });
    if (type === "users") {
      userImage(id, res, filename);
    } else {
      productImage(id, res, filename);
    }
  });
});

const userImage = (id, res, filename) => {
  User.findById(id, (err, userDB) => {
    if (err) {
      removeFile(filename, "users");
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!userDB) {
      removeFile(filename, "users");
      return res.status(400).json({
        ok: false,
        err: "user not found",
      });
    }

    removeFile(userDB.img, "users");

    userDB.img = filename;

    userDB.save((err, userSaved) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        user: userSaved,
      });
    });
  });
};

const productImage = (id, res, filename) => {
  Product.findById(id, (err, productDB) => {
    if (err) {
      removeFile(filename, "products");
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productDB) {
      removeFile(filename, "products");
      return res.status(400).json({
        ok: false,
        err: "product not found",
      });
    }

    removeFile(productDB.img, "products");

    productDB.img = filename;

    productDB.save((err, productSaved) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        product: productSaved,
      });
    });
  });
};

const removeFile = (fileName, type) => {
  const pathURL = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);

  if (fs.existsSync(pathURL)) {
    fs.unlinkSync(pathURL); // if an old file exists, we remove it from the fs
  }
};

module.exports = app;
