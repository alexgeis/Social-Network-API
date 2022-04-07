const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { Reaction } = require("../models/Reaction");
const { getRandomName, getRandomThought, getRandomEmail } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  // Empty arrays for randomly generated thoughts and reactions
  const users = [];
  const thoughts = getRandomThought(10);

  for (let i = 0; i < 5; i++) {
    const username = getRandomName();
    const email = getRandomEmail();
    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
