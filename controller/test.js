const testSchema = require("../module/testSchema");

exports.getTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const query = { test_id: testId };
    const testData = await testSchema.findOne(query);
    if (testData) {
      return res.status(200).json({ status: "success", data: testData });
    }
    return res.status(404).json({ status: "success", data: "Data not found." });
  } catch (err) {
    console.log("catch exception in get test", err);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};
