const { Schema, model } = require("mongoose");

// Schema for what makes up a reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      // id: false,
    },
  }
);

// Initialize the Reaction model
const Reaction = model("reaction", reactionSchema);

module.exports = { reactionSchema, Reaction };
