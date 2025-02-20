const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');

const User = mongoose.model('User', userSchema); // generating model
module.exports = User; // exporting model