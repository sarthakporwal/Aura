import React, { useState , useEffect} from "react";
import { Transition } from "@headlessui/react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchGoals();
}, []);

const fetchGoals = async () => {
    const response = await fetch('http://localhost:5174/dashboard/goals',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const data = await response.json();
    setGoals(data);
};

const handleAddGoal = async () => {
  if (input.trim()) {
      const response = await fetch('http://localhost:5174/dashboard/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
      });
      if (response.ok) {
          fetchGoals(); // Refresh the list after adding a new goal
          setInput("");
      }
  }
};

const handleDeleteGoal = async (id) => {
  await fetch(`http://localhost:5000/api/goals/${id}`, { method: 'DELETE' });
  fetchGoals(); // Refresh the list after deletion
};

  

  const toggleCompletion = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  // Calculate progress
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Daily Goals</h2>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-center text-sm mt-1">{completedGoals} of {totalGoals} goals completed</p>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new goal"
        />
        <button
          onClick={handleAddGoal}
          className="px-4 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 transition-all"
        >
          Add
        </button>
      </div>

      <div>
        {goals.map((goal, index) => (
          <Transition
            key={goal.id}
            show={true}
            enter="transition transform duration-300 ease-out"
            enterFrom="opacity-0 translate-x-4"
            enterTo="opacity-100 translate-x-0"
            leave="transition transform duration-300 ease-in"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-4"
          >
            <div className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded-lg mb-2 shadow-sm">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-gray-500"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => handleSaveGoal(index)}
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-1 ${goal.completed ? 'line-through' : ''} text-black`}>
                    {goal.text}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleCompletion(goal.id)}
                      className={`text-${goal.completed ? 'red' : 'green'}-500 hover:text-${goal.completed ? 'red' : 'green'}-600 transition-all`}
                    >
                      {goal.completed ? 'Undo' : '✔️'}
                    </button>
                    <button
                      onClick={() => handleEditGoal(index)}
                      className="text-yellow-500 hover:text-yellow-600 transition-all"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-600 transition-all"
                    >
                      ✘
                    </button>
                  </div>
                </>
              )}
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Goals;




