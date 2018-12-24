const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  handle: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  password2: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    dafault: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
