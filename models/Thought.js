const { Schema, model } = require("mongoose");
const validate = require("mongoose-validator");
const { reactionSchema } = require("./Reaction");

const charLengthValidator = [
  validate({
    validator: "isLength",
    arguments: [1, 280],
    message: "Name should be between 1 and 280 characters",
  }),
  // IF SPECIAL CHARACTERS ARE EXCLUDED
  // validate({
  //   validator: 'isAlphanumeric',
  //   passIfEmpty: true,
  //   message: 'Name should contain alpha-numeric characters only',
  // }),
];

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: charLengthValidator,
    },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
