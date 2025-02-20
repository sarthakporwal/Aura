const express = require('express');
const {
    createCourse,
    updateCourse,
    deleteCourse,
    getSingleCourse,
    getAllCourses,
    getCoursesWithAssignments
} = require('../Controllers/CoursesAndAssignments.js');

const router = express.Router();

//Create a new course
router.post('/createCourse',createCourse);

//update a course by ID
router.put('/update/:courseId',updateCourse);

//delete a course by ID
router.delete('/delete/:courseId', deleteCourse);

// Get a specific course by ID
router.get('/:courseId', getSingleCourse);

// Get all courses for the authenticated user
router.get('/AllCourses/:userId', getAllCourses);

// Get all courses with their assignments for the authenticated user
router.get('/with-assignments/:userId', getCoursesWithAssignments);

module.exports = router;

