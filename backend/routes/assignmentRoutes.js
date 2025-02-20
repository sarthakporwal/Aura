const express = require ('express');
const {
    createAssignment,
    getSingleAssignment,
    updateAssignment,
    deleteAssignment,
    getAllAssignments
} =require ('../Controllers/CoursesAndAssignments.js');

const router = express.Router();

// Create a new assignment for a specific course
router.post('/create', createAssignment);

// Get a single assignment by ID
router.get('/:assignmentId', getSingleAssignment);

// Update an assignment by ID
router.put('/update/:assignmentId', updateAssignment);

// Delete an assignment by ID
router.delete('/delete/:assignmentId', deleteAssignment);

// Get all assignments for the authenticated user
router.get('/all/:userId', getAllAssignments);

module.exports = router;
