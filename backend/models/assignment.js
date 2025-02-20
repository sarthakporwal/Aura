const mongoose = require('mongoose');
const AssignmentSchema = require('../schema/assignmentSchema.js');

const Assignment = mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignment;