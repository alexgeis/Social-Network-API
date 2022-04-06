const { Thought, Reaction } = require("../models");

module.exports = {
  getReactions(req, res) {
    Reaction.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single reaction
  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No reaction found with that id" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "reaction created, but no thoughts with this ID",
            })
          : res.json({ message: "reaction created" })
      )
      .catch((err) => {
        console.error(err);
      });
  },
};
