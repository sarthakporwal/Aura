import React, { useState } from 'react';

const TimelineComponent = () => {
  // Initial state with 8 assignments
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Computer Networks Assignment', deadline: '2024-11-01', details: 'Upload the Cisco Packet Tracer Assignment on Moodle' },
    { id: 2, title: 'DBMS Assignment', deadline: '2024-11-03', details: 'Draw ER Diagram for Library Management System' },
    { id: 3, title: 'Cryptography Assignment', deadline: '2024-11-05', details: 'Solve the questions given in class.' },
    { id: 4, title: 'Software Engineering Assignment', deadline: '2024-11-08', details: 'Solve the questions from Rajib Mall' },
    { id: 5, title: 'Software Engineering Assignment', deadline: '2024-11-10', details: 'Upload the assignment on Moodle regarding White Box testing.' },
    { id: 6, title: 'Assignment 6', deadline: '2024-11-12', details: 'Description for Assignment 6' },
    { id: 7, title: 'Assignment 7', deadline: '2024-11-14', details: 'Description for Assignment 7' },
    { id: 8, title: 'Assignment 8', deadline: '2024-11-16', details: 'Description for Assignment 8' },
  ]);

  const [hoveredId, setHoveredId] = useState(null);
  
  // State for new assignment input
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    deadline: '',
    details: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding new assignment
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (newAssignment.title && newAssignment.deadline && newAssignment.details) {
      const newId = assignments.length ? Math.max(assignments.map(a => a.id)) + 1 : 1;
      setAssignments((prev) => [...prev, { id: newId, ...newAssignment }]);
      setNewAssignment({ title: '', deadline: '', details: '' }); // Reset form
    }
  };

  return (
    <div className="mt-[20px] flex flex-col items-center px-8">
      {/* Title Section */}
      <p className="text-2xl font-extrabold text-red-500 mb-6">
        Deadlines for Assignments!!
      </p>

      {/* Form to Add New Assignment */}
      <form onSubmit={handleAddAssignment} className="mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAssignment.title}
          onChange={handleChange}
          required
          className="mr-2 p-2 border rounded text-gray-400"
        />
        <input
          type="date"
          name="deadline"
          value={newAssignment.deadline}
          onChange={handleChange}
          required
          className="mr-2 p-2 border rounded text-gray-400"
        />
        <input
          type="text"
          name="details"
          placeholder="Details"
          value={newAssignment.details}
          onChange={handleChange}
          required
          className="mr-2 p-2 border rounded text-gray-400"
        />
        <button type="submit" className="p-2 bg-red-500 text-white rounded">Add Assignment</button>
      </form>

      {/* Timeline Scroll Section */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 transition-all duration-300 ease-in-out h-auto">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              onMouseEnter={() => setHoveredId(assignment.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex-shrink-0 w-[250px] h-[300px] p-4 bg-gray-100 rounded-lg shadow-lg text-center transform transition-transform duration-300 ease-in-out ${
                hoveredId === assignment.id ? "scale-105 bg-gray-200" : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {assignment.title}
              </h3>
              <p className="text-gray-600">Deadline:</p>
              <p className="text-gray-800 font-bold">{assignment.deadline}</p>
              {/* Show additional details if hovered */}
              {hoveredId === assignment.id && (
                <p className="mt-2 text-gray-700">{assignment.details}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;   