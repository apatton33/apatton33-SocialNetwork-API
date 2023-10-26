const { Schema, model, } = require('mongoose');
const {thoughtsSchema} = require('./thoughts');

// Schema to create user model
const userSchema = new Schema (
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
     
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/],
    },
    thoughts: {
      thoughts: [thoughtsSchema],
    },
    friends: {
      user: [this],
    }
   
  },
  {
    toJSON: {
      getters: true,
    },
  }

  );

  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const user = model('user', userSchema);

module.exports = user;
