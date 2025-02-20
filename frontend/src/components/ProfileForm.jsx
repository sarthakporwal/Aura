import React, { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pno: "",
    RegNo: "",
    gender: "Male",
    Branch: "",
    year: "",
    esavings: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6"
      >
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Profile Form
        </h3>
        <p className="text-center text-lg text-red-700 mb-8">
          Please fill with your details
        </p>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
          <input
            type="tel"
            name="pno"
            placeholder="Phone Number"
            value={formData.pno}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <input
            type="number"
            name="RegNo" // Corrected name from "Registration Number" to "RegNo" to match state
            placeholder="Registration Number"
            value={formData.RegNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
          <div className="flex items-center">
            <label className="mr-4 text-red-700">Gender:</label>
            <label className="mr-4 text-black">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="text-black">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <p className="text-center text-lg text-red-700 mb-8">
          Please fill the additional info
        </p>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <input
            type="text"
            name="Branch"
            placeholder="Branch"
            value={formData.Branch}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
          <input
            type="number"
            name="year" // Corrected name from "Year" to "year" to match state
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 text-black placeholder-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-700 text-white font-semibold py-2 px-6 rounded hover:bg-red-800 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;