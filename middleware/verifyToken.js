const jwt = require("jsonwebtoken");

const verifyToken = {
  verifyToken: (req, res, next) => {
    const tokenClient = req.headers.token;
    if (!tokenClient) {
      return res.status(401).json({ message: "login" });
    }
    jwt.verify(tokenClient, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("token is not valid");
      }
      req.user = user;
      next();
    });
  },
  adminVerifyToken: (req, res, next) => {
    verifyToken.verifyToken(req, res, () => {
      console.log(req.user);
      if (req.user._id === req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("you not allowed");
      }
    });
  },
};

module.exports = verifyToken;
