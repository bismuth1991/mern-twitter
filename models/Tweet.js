const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model('tweets', TweetSchema);
module.exports = Tweet;
