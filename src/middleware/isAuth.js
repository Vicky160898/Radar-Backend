const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(404).json({ msg: "Token not found." });
    }

    const tokenParts = token.split(" ");
    console.log("tokenParts", tokenParts);
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ msg: "Invalid token format." });
    }
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    console.log("decoded", decoded);
    if (!decoded) {
      return res.status(404).json({ msg: "Invalid Token." });
    }
    req.authorID = decoded.authorID;
    next();
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Token invalid error.", error: error });
  }
};

module.exports = isAuth;
