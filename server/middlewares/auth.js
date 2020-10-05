const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.get("Authorization");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err,
      });
    }

    req.user = decoded.user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === "ADMIN_ROLE") {
    next();
  } else {
    res.status(401).json({
      ok: false,
      message: "non admin user",
    });
  }
};

module.exports = {
  checkToken,
  verifyAdmin,
};
