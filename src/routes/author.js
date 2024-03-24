const express = require("express");
const {
  authorLogin,
  authorSignUp,
  getAuthorProfile,
  editAuthorProfile,
} = require("../Controller/author");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/login", authorLogin);
router.post("/signup", authorSignUp);
router.get("/profile", isAuth, getAuthorProfile);
router.patch("/edit/profile", isAuth, editAuthorProfile);

module.exports = router;
