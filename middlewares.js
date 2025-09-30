const { isTokenActive } = require("./services/tokenService");

const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || !isTokenActive(token)) {
    return res.status(401).json({ message: "Unuthorized" });
  }
  next();
};
module.exports = { isLoggedIn };
