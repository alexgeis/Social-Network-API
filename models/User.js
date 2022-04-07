const { Schema, model } = require("mongoose");
// const thoughtSchema = require("./Thought");
// import { isEmail } from 'validator';
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    // Configure individual properties using Schema Types
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, "invalid email"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Use built in date method to get current date
    lastAccessed: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
