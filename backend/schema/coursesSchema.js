// models/course.model.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: String },
    schedule: { type: String }, // e.g., "Mon-Wed-Fri 10:00-11:00"
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user
});

module.exports = CourseSchema;
