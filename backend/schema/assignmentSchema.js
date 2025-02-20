// models/assignment.model.js
const mongoose = require('mongoose');


const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to the course
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user
});

module.exports = AssignmentSchema;
