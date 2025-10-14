import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { postJob } from "../ConfigAPI.js";
import { v4 as uuidv4 } from 'uuid';

const JobPosting = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: "",
        company: "",
        location: "",
        description: "",
        // requiredSkills: "",
        salary: "",
        // jobType: "full-time",
        email: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add job posting logic here (send data to backend, save to localStorage, etc.)
        postJob(formData);
        console.log("Job Posted:", formData);
        navigate("/all-jobs"); // Redirect after posting
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? "bg-zinc-900 text-zinc-200" : "bg-zinc-50 text-zinc-900"}`}
        >
            <div className="max-w-lg w-full space-y-8">
                <h2 className={`text-center text-3xl font-extrabold ${isDarkMode ? "text-blue-500" : "text-blue-600"}`}>
                    Post a New Job
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Job Title */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    />

                    {/* Company Name */}
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Contact Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode
                                ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400"
                                : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                    />


                    {/* Location */}
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    />

                    {/* Job Description */}
                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    />

                    {/* Required Skills */}
                    {/* <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills"
            value={formData.requiredSkills}
            onChange={handleChange}
            required
            className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
          /> */}

                    {/* Salary */}
                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary Range"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className={`block w-full px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    />

                    {/* Job Type */}
                    {/* <div className="flex justify-between">
            <label className="block text-sm font-medium">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={`block w-2/5 px-3 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-zinc-800 text-zinc-200 border-zinc-700 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-zinc-900 border-zinc-300 focus:ring-blue-500 focus:border-blue-500"}`}
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
            </select>
          </div> */}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md font-medium text-white ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            Post Job
                        </button>
                    </div>
                </form>

                {/* Footer Section */}
                <div className="text-center">
                    <p>
                        Want to view all jobs?{' '}
                        <Link
                            to="/all-jobs"
                            className={`transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'}`}
                        >
                            View Jobs
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobPosting;
