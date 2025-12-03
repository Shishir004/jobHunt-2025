const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authenticated", success: false });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Authentication Failed", success: false });
  }
};

module.exports = isAuthenticated;
