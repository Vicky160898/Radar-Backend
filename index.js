require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoute = require("./src/routes/blog");
const authorRoute = require("./src/routes/author");
const notFoundRoute = require("./src/View/notFound");
const cors = require("cors");
const connectDB = require("./src/config/db");

const PORT = 8080 || process.env;
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

//api route;
app.use("/api/author", authorRoute);
app.use("/api/blog", blogRoute);
app.use("*", notFoundRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Local server started at ${PORT}`);
});
