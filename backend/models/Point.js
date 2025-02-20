const mongoose = require('mongoose');
const pointSchema = require('../schema/pointSchema');

const Point = mongoose.model('Point', pointSchema); // generating model
module.exports = Point; // exporting model