const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: {
    type: String,
    unique: true,
    required: [true, "Description is required"],
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
});

module.exports = mongoose.model("Category", categorySchema);
