'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the user\'s name'
  },
  dni: {
    type: Number,
    required: 'Kindly enter the user\'s identification number'
  },
  email: {
    type: String,
    required: 'Kindly enter the user\'s email'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);