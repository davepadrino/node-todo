const express = require("express");
const { checkToken, verifyAdmin } = require("../middlewares/auth");
const app = express();
const Category = require("../models/category");

app.get("/category", checkToken, (req, res) => {
  Category.find({})
    .sort("description")
    .populate("user", "name email") // to get info from  the user
    .exec((err, categories) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        categories,
      });
    });
});

app.get("/category/:id", checkToken, (req, res) => {
  const id = req.params.id;
  Category.findById(id, (err, categoryDb) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoryDb) {
      res.status(500).json({
        ok: false,
        err: "ID not correct",
      });
    }

    res.json({
      ok: true,
      categoryDb,
    });
  });
});

app.post("/category", checkToken, (req, res) => {
  const body = req.body;
  const category = new Category({
    description: body.description,
    user: req.user._id,
  });

  category.save((err, categoryDb) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoryDb) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, category: categoryDb });
  });
});

app.put("/category/:id", checkToken, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const category = {
    description: body.description,
  };

  Category.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, categoryDb) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!categoryDb) {
        res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({ ok: true, user: categoryDb });
    }
  );
});

app.delete("/category/:id", [checkToken, verifyAdmin], (req, res) => {
  const id = req.params.id;
  Category.findByIdAndRemove(id, (err, categoryDb) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoryDb) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, message: "Category deleted" });
  });
});

module.exports = app;
