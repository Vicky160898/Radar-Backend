const express = require("express");
const {
  getAllBlog,
  getOwnBlog,
  addBlog,
  deleteBlog,
  editBlog,
  getSearchResult,
  getSingleBlog,
} = require("../Controller/blog");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/all", getAllBlog);
router.get("/own", isAuth, getOwnBlog);
router.post("/add", isAuth, addBlog);
router.delete("/delete/:ID", isAuth, deleteBlog);
router.patch("/edit/blog/:ID", isAuth, editBlog);
router.get("/single/:ID", isAuth, getSingleBlog);
router.get("/title", getSearchResult);

module.exports = router;
