const jwt = require("jsonwebtoken");

const Token = async (authorID) => {
  try {
    const token = jwt.sign({ authorID: authorID }, process.env.JWT_SECRET, {
      expiresIn: "1day",
    });
    return token;
  } catch (error) {
    return res
      .status(501)
      .json({ msg: "Error in generating token.", error: error });
  }
};

module.exports = Token;
