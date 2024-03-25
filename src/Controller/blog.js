const BlogShcema = require("../Model/blog");

const addBlog = async (req, res) => {
  const { title, desc, category, category_desc, image } = req.body;
  try {
    if (!title && !desc && !category && !category_desc) {
      return res.status(401).json({ msg: "Please Fill All the Details." });
    }

    const NewBlog = new BlogShcema({
      title,
      desc,
      category,
      category_desc,
      author_ID: req.authorID,
      image: image,
    });
    await NewBlog.save();
    return res
      .status(200)
      .json({ msg: "Blog Created successfully.", blog: NewBlog });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "please fill unique title and desc.", error: error });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogShcema.find().populate("author_ID");
    if (blogs.length === 0) {
      return res.status(401).json({ msg: "Blog not present." });
    }
    return res
      .status(200)
      .json({ msg: "Blog fetched successfully.", blog: blogs });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in get all the blog.", error: error });
  }
};

const getOwnBlog = async (req, res) => {
  try {
    const author_ID = req.authorID;
    const ownBlog = await BlogShcema.find({ author_ID: author_ID }).populate(
      "author_ID"
    );
    if (!ownBlog || ownBlog.length === 0) {
      return res.status(404).json({ msg: "No blogs found for this author." });
    }
    return res
      .status(200)
      .json({ msg: "Blog fetched successfully.", blog: ownBlog });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in geting the own blog.", error: error });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { ID } = req.params;
    const author_ID = req.authorID;

    console.log("singlblog", ID, author_ID);

    const ownBlog = await BlogShcema.findOne({
      author_ID: author_ID,
      _id: ID,
    }).populate("author_ID");
    if (!ownBlog || ownBlog.length === 0) {
      return res.status(404).json({ msg: "No blogs found." });
    }
    return res
      .status(200)
      .json({ msg: "Blog fetched successfully.", blog: ownBlog });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in geting the single blog.", error: error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { ID } = req.params;
    const author_ID = req.authorID;
    const isCheck = await BlogShcema.findOne({
      _id: ID,
      author_ID: author_ID,
    });

    if (!isCheck) {
      return res.status(404).json({ msg: "No blogs found for this author." });
    }
    const isDeleted = await BlogShcema.findByIdAndDelete({ _id: ID });

    if (isDeleted) {
      return res.status(200).json({ msg: "Blog Deleted successfully." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in deleting the own blog.", error: error });
  }
};

const editBlog = async (req, res) => {
  try {
    const { title, desc, category, category_desc, image } = req.body;
    const { ID } = req.params;
    const author_ID = req.authorID;
    const isCheck = await BlogShcema.findOne({ _id: ID, author_ID: author_ID });
    if (!isCheck) {
      return res.status(404).json({ msg: "No blogs found for this author." });
    }
    const UpdatedData = {
      title,
      desc,
      category,
      category_desc,
      image,
    };
    const isUpdated = await BlogShcema.findByIdAndUpdate(
      { _id: ID },
      { $set: UpdatedData },
      { new: true }
    );
    if (isUpdated) {
      return res.status(200).json({ msg: "Blog Updated successfully." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ msg: "Error in editing the own blog.", error: error });
  }
};

const getSearchResult = async (req, res) => {
  try {
    const { search } = req.query;
    console.log("query", search);
    const results = await BlogShcema.find({
      title: { $regex: new RegExp(search, "i") },
    }).populate("author_ID");
    return res.status(200).json({ blog: results });
  } catch (error) {
    return res
      .status(501)
      .json({ msg: "Error in searching the blog.", error: error });
  }
};

module.exports = {
  getAllBlog,
  getOwnBlog,
  deleteBlog,
  editBlog,
  addBlog,
  getSearchResult,
  getSingleBlog,
};
