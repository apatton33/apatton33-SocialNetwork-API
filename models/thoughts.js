const dateFormat = require("../utils/dateFormat");
const { Schema, Types, model } = require('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: string,
      required: "Must add a Thought!",
      minlength:2,
      maxlength:280,
      default: () => new Types.ObjectId(),
    },
    UserName: {
      type: String,
      required: true,
  
    },
    score: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const reactionsSchema = new Schema(
  {
    reactionId: { 
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const thoughts = model("thoughts", thoughtsSchema);



module.exports = thoughts;
