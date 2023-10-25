
const { User, Thought } = require('../models');


module.exports = {
  // Get all students
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single student
  async getThoughtsById(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought found with that id' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new student
  async createAThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateAThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // Remove assignment from a student
  async deleteAThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtIdId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addAReaction(req, res) {
    try {
      console.log('You are adding an Reaction');
      console.log(req.body);
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { Reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' })
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeAReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { Reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
