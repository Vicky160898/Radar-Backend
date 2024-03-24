const NotFound = async (req, res) => {
  try {
    let obj = {
      error: "Not Found",
    };
    return res.status(404).json(obj);
  } catch (error) {
    console.log("error", err);
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports = NotFound;
