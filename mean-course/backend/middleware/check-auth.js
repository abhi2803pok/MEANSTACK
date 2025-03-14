const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization.split(" ")[1]);
    const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], "secret_token");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
}
// Compare this snippet from backend/routes/posts.js:
