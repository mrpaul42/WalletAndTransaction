const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuid } = require("uuid");

const testSchema = new Schema({
  test_id: {
    type: String,
  },
  testName: {
    type: String,
  },
});

testSchema.set("timestamps", true);

module.exports = mongoose.model("test", testSchema);
