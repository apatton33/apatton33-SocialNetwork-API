const { User, thoughts,  } = require('../models');

module.exports = {
    getUsers(req, res) {
      console.log(User);
    console.log('getUsers');
    User.find({})
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: 'No User with that ID' }))
    },
    
    getUsersById(params, res) {
      console.log('getUsersById')
      User.findOne({_Id: params.id})
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: 'No User with that ID' }));
    },


    updateAUser({params, body}, res) {
    console.log('updateAUser')
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: 'No User with that ID' }));
  },

};

