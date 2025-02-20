const mongoose = require('mongoose');
const CourseSchema = require('../schema/coursesSchema.js');

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;