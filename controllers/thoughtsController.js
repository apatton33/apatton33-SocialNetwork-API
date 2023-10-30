
const { User, thoughts } = require('../models');


module.exports = {

  getThoughts(req, res) {
  console.log('getThoughts');
  thoughts.find({})
  .then(data => res.json(data))
  .catch(err => res.status(404).json({ message: 'No User with that ID' }));
  },

  createAThought({body}, res) {
    console.log('createAThought')
    User.create({body})
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: 'No User with that ID' }));
  },
};