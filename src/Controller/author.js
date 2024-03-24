const AuthorShcema = require("../Model/author");
const bcrypt = require("bcrypt");
const Token = require("../utils/generateToken");

const saltRounds = 10;
const authorSignUp = async (req, res) => {
  const { full_name, email, password } = req.body;
  console.log(full_name, email, password);
  try {
    const isCheckAuthor = await AuthorShcema.findOne({ email });
    if (isCheckAuthor) {
      return res.status(401).json({ msg: "Author Already SingUp." });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newAuthor = new AuthorShcema({
      full_name,
      email,
      password: hashPassword,
    });
    await newAuthor.save();
    return res
      .status(200)
      .json({ msg: "Author SingUp Successfully.", author: newAuthor });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in signup author.", error: error });
  }
};

const authorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isCheckAuthor = await AuthorShcema.findOne({ email });
    if (!isCheckAuthor) {
      return res.status(401).json({ msg: "User Not Found." });
    }
    const isCheckPassword = await bcrypt.compare(
      password,
      isCheckAuthor.password
    );
    if (!isCheckPassword) {
      return res.status(401).json({ msg: "Incorrect Password." });
    }
    const token = await Token(isCheckAuthor._id);
    console.log("token", token);
    return res
      .status(200)
      .json({ msg: "Author Login successfully.", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in login author.", error: error });
  }
};

const editAuthorProfile = async (req, res) => {
  try {
    const { full_name, email, image } = req.body;
    const author_ID = req.authorID;
    const isCheck = await AuthorShcema.findById({ _id: author_ID });
    if (!isCheck) {
      return res.status(404).json({ msg: "Author not Found." });
    }
    // const hashPassword = await bcrypt.hash(password, saltRounds);
    const updatedProfile = {
      full_name,
      email,
      image
      // password: hashPassword,
    };

    const isUpdatedAuthor = await AuthorShcema.findByIdAndUpdate(
      { _id: author_ID },
      { $set: updatedProfile },
      { new: true }
    );

    if (isUpdatedAuthor) {
      return res.status(200).json({ msg: "Profile Updated successfully." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in edit author profile.", error: error });
  }
};

const getAuthorProfile = async (req, res) => {
  try {
    const author_ID = req.authorID;
    const isCheck = await AuthorShcema.findById({ _id: author_ID });
    if (!isCheck) {
      return res.status(404).json({ msg: "Author not Found." });
    }
    return res
      .status(200)
      .json({ msg: "Author fetched successfully.", author: isCheck });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in author profile.", error: error });
  }
};

module.exports = {
  authorLogin,
  authorSignUp,
  editAuthorProfile,
  getAuthorProfile,
};
