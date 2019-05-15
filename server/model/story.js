const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const StorySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user-demos" },
  title: String
});

StorySchema.plugin(mongoosastic, {
  host: process.env.ELASTIC_HOST,
  port: process.env.ELASTIC_PORT
});

module.exports = Story = mongoose.model("Story", StorySchema);
