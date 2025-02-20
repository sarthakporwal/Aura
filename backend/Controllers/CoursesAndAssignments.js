const User =require("../models/User.js");
const Course =require("../models/course.js");
const Assignment =require ("../models/assignment.js");
//creating a Course (working perfectly) 
const createCourse = async (req, res) => {
    
    
    if(!req.body.user)req.body.user=req.userId;

   try {
    console.log("Creating Course for User:", req.body.user);
        console.log("Request Body:", req.body);
       const course = new Course(req.body);

      const savedCourse= await course.save();

      await User.findByIdAndUpdate(req.body.user,{$push:{courses:savedCourse._id}})

       res.status(201).json({ success: true, message: 'Course created', data: savedCourse });
   } catch (error) {
       res.status(500).json({ success: false, message: 'yo', error });
   }
};

// To update a course (working perfectly)
const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Course successfully updated', data: updatedCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update course' });
    }
};

// To delete a course
const deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({ success: true, message: 'Course successfully deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete course' });
    }
};

// To find a specific course
const getSingleCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const course = await Course.findById(courseId);
        res.status(200).json({ success: true, message: 'Course found', data: course });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Course not found' });
    }
};

// To get all courses for a user
const getAllCourses = async (req, res) => {
    const userId = req.params.userId;

    try {
        const courses = await Course.find({ user: userId });
        res.status(200).json({ success: true, message: 'Courses retrieved', data: courses });
    } catch (error) {
        res.status(404).json({ success: false, message: 'No courses found' });
    }
};





// To get a user's courses and associated assignments(works perfectly)

 const getCoursesWithAssignments = async (req, res) => {
    
    const userId = req.params.userId;
    //console.log(userId);

    try {
        // Retrieve courses with assignments related to each course
        const courses = await Course.find({ user: userId }).populate('assignments');
        res.status(200).json({ success: true, message: 'Courses with assignments retrieved', data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to retrieve courses with assignments' });
    }
};


// Create a new assignment(works perfectly)
 const createAssignment = async (req, res) => {
    
     if(!req.body.course)req.body.course=req.courseId;
     if(!req.body.user)req.body.user=req.userId;

    try {
        console.log(req.body);
        const assignment = new Assignment(req.body);

       const savedassignment= await assignment.save();

       await Course.findByIdAndUpdate(req.body.course,{$push:{assignments:savedassignment._id}});
       //await User.findByIdAndUpdate(req.body.user,{$push:{assignments:savedassignment._id}});
       

        res.status(201).json({ success: true, message: 'Assignment created', data: savedassignment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating assignment', error });
    }
};

// Retrieve a single assignment(wworks pefectly)
 const getSingleAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }
        res.status(200).json({ success: true, message: 'Assignment found', data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving assignment', error });
    }
};

// Update an assignment(works perfectly)
 const updateAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        res.status(200).json({ success: true, message: 'Assignment updated', data: updatedAssignment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating assignment', error });
    }
};

// Delete an assignment(works perfectly)
 const deleteAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
        if (!deletedAssignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }
        res.status(200).json({ success: true, message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting assignment', error });
    }
};

// Retrieve all assignments for a specific user(works perfectly)
 const getAllAssignments = async (req, res) => {
    const userId = req.params.userId;

    try {
        const assignments = await Assignment.find({ user: userId });
        res.status(200).json({ success: true, message: 'Assignments retrieved', data: assignments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving assignments', error });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getSingleCourse,
    getAllCourses,
    getCoursesWithAssignments,
    createAssignment,
    getSingleAssignment,
    updateAssignment,
    deleteAssignment,
    getAllAssignments
};