const jwt = require("jsonwebtoken");

module.exports = (role) => (req, res, next) => {
  try {
    const token = req.header("auth");
    console.log(token);
    if (token) {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      if (verifyToken.user.role === role) {
        next();
      } else {
        res.status(401).json({ msg: "No estas autorizado" });
      }
    } else {
      res.status(400).json({ msg: "Token incorrecto" });
    }
  } catch (error) {
    console.log(error);
  }
};
