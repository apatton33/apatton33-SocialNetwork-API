const { User, Thoughts,  } = require('../models');

module.exports = {
  // Get all courses
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getUsersById(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.user_Id })
        .select('-__v');

      if (!users) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createAUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 // Update a course
 async updateAUser(req, res) {
  try {
    const users = await User.findOneAndUpdate(
      { _id: req.params.user_Id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!users) {
      return res.status(404).json({ message: 'No User with this id!' });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
},

  // Delete a course
  async deleteAUser(req, res) {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.userId });

      if (!users) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      await Thoughts.deleteMany({ _id: { $in: User.Thoughts } });
      res.json({ message: 'User and Thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateAUser(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.user_Id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!users) {
        return res.status(404).json({ message: 'No User with this id!' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addAFriend(req, res) {
    try {
      console.log('You are adding an Friend');
      console.log(req.body);
      const users = await User.findOneAndUpdate(
        { _id: req.params.user_Id },
        { $addToSet: { Friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!users) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' })
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeAFriend(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.user_Id },
        { $pull: { Friends: { friendsId: req.params.friendsId } } },
        { runValidators: true, new: true }
      );

      if (!users) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

