const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");
// import { isEmail } from 'validator';
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
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
});

userSchema
  .virtual("friendCount")
  // getter for the virtual that returns the full name of the user (first + last)
  .get(function () {
    return this.friends.length;
  });

const User = mongoose.model("User", userSchema);

// User.create([
//   { username: "Carly", email: "carly@gmail.com", friendCount: 2 },
//   { username: "Lisa", email: "lisa@gmail.com", friendCount: 0 },
//   { username: "Sandy", email: "sandy@gmail.com", friendCount: 3 },
//   { username: "Abby", email: "abby@gmail.com", friendCount: 1 },
//   { username: "Emily", email: "emily@gmail.com", friendCount: 0 },
//   { username: "Paige", email: "paige@gmail.com", friendCount: 0 },
//   { username: "Tawni", email: "tawni@gmail.com", friendCount: 2 },
// ]);

module.exports = User;
