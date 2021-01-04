const express = require("express");
const app = express();

const { checkToken } = require("../middlewares/auth");
const product = require("../models/product");
const Product = require("../models/product");

// ======
// Get product
// ======
app.get("/products", checkToken, (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);

  Product.find({ available: true })
    .skip(from)
    .limit(5)
    .populate("user", "name email")
    .populate("category", "description")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        products,
      });
    });
});

// ======
// Get product by id
// ======
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .populate("user", "name email")
    .populate("category", "description")
    .exec((err, productDB) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!productDB) {
        res.status(400).json({
          ok: false,
          err: "Product missing or mistaken",
        });
      }

      res.json({ ok: true, product: productDB });
    });
});

// ======
// Add product
// ======
app.post("/products", checkToken, (req, res) => {
  const body = req.body;
  const product = new Product({
    name: body.name,
    priceUni: body.priceUni,
    description: body.description,
    available: body.available,
    category: body.category,
    user: req.user._id,
  });

  product.save((err, productDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({ ok: true, product: productDB });
  });
});

// ======
// Update product
// ======
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Product.findById(id, (err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err: "Id does not exist",
      });
    }

    productDB.name = body.name;
    productDB.priceUni = body.priceUni;
    productDB.category = body.category;
    productDB.available = body.available;
    productDB.description = body.description;

    productDB.save((err, productSaved) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({ ok: true, product: productSaved });
    });
  });
});

// ======
// Remove product
// ======
app.delete("/products/:id", checkToken, (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err: "Product missing or mistaken",
      });
    }

    productDB.available = false;
    productDB.save((err, productDeleted) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        product: productDeleted,
        message: "Deleted",
      });
    });
  });
});

module.exports = app;
