const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
// Require model
// const { Library } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Finds all ITEMS
app.get("/all-items", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  MODEL.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(result);
  });
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
