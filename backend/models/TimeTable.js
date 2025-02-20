const mongoose = require('mongoose');
const timeTableSchema = require('../schema/timetableSchema');

const TimeTable = mongoose.model("TimeTable", timeTableSchema); // generating model
module.exports = TimeTable; // exporting model