import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, User, Mail, Phone, FileText, Upload } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001/api";

const ApplyJob = ({ isDarkMode, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/signin');
            return;
        }

        if (user?.userType === 'employer') {
            navigate('/all-jobs');
            return;
        }

        fetchJobDetails();
    }, [id, user, navigate]);

    const fetchJobDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
            if (response.data && response.data.data) {
                console.log("Job details:", response.data.data);
                setJob(response.data.data);
            } else {
                throw new Error('Job not found');
            }
        } catch (err) {
            console.error("Error fetching job:", err);
            setError(err.response?.data?.message || 'Job not found');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setFormData(prev => ({
                    ...prev,
                    resume: file
                }));
                setFormErrors(prev => ({
                    ...prev,
                    resume: ''
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    resume: 'Please upload a PDF file'
                }));
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.coverLetter.trim()) errors.coverLetter = 'Cover letter is required';
        if (!formData.resume) errors.resume = 'Resume is required';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitting(true);
        const formDataToSend = new FormData();
        formDataToSend.append('jobId', id);
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('coverLetter', formData.coverLetter);
        formDataToSend.append('resume', formData.resume);

        try {
            const response = await axios.post(`${API_BASE_URL}/applications`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                // Navigate to success page
                navigate('/application-success', {
                    state: {
                        title: job.title,
                        company: job.company
                    }
                });
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100'}`}>
                <div className={`max-w-md w-full p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Error</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/all-jobs')}
                        className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100'}`}>
            <div className="max-w-6xl mx-auto p-6">
                <button
                    onClick={() => navigate('/all-jobs')}
                    className={`flex items-center gap-2 mb-6 ${
                        isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-800'
                    }`}
                >
                    <ArrowLeft size={16} />
                    Back to Jobs
                </button>

                <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                    {/* Job Details Section */}
                    <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                                <Briefcase size={16} />
                                <span>{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={16} />
                                <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{job.type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Apply for this position</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <User size={16} />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 rounded-lg border ${
                                            isDarkMode 
                                                ? 'bg-zinc-900 border-zinc-700' 
                                                : 'bg-white border-zinc-200'
                                        } ${formErrors.fullName ? 'border-red-500' : ''}`}
                                        placeholder="John Doe"
                                    />
                                    {formErrors.fullName && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <Mail size={16} />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 rounded-lg border ${
                                            isDarkMode 
                                                ? 'bg-zinc-900 border-zinc-700' 
                                                : 'bg-white border-zinc-200'
                                        } ${formErrors.email ? 'border-red-500' : ''}`}
                                        placeholder="john@example.com"
                                    />
                                    {formErrors.email && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <Phone size={16} />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 rounded-lg border ${
                                            isDarkMode 
                                                ? 'bg-zinc-900 border-zinc-700' 
                                                : 'bg-white border-zinc-200'
                                        } ${formErrors.phone ? 'border-red-500' : ''}`}
                                        placeholder="+1 (123) 456-7890"
                                    />
                                    {formErrors.phone && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                                    )}
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <Upload size={16} />
                                        Resume (PDF)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="resume-upload"
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className={`cursor-pointer w-full p-3 rounded-lg border ${
                                            isDarkMode 
                                                ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800' 
                                                : 'bg-white border-zinc-200 hover:bg-zinc-50'
                                        } ${formErrors.resume ? 'border-red-500' : ''} flex items-center justify-center gap-2`}
                                    >
                                        {formData.resume ? formData.resume.name : 'Choose File'}
                                    </label>
                                    {formErrors.resume && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.resume}</p>
                                    )}
                                </div>

                                {/* Cover Letter */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                        <FileText size={16} />
                                        Cover Letter
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className={`w-full p-3 rounded-lg border ${
                                            isDarkMode 
                                                ? 'bg-zinc-900 border-zinc-700' 
                                                : 'bg-white border-zinc-200'
                                        } ${formErrors.coverLetter ? 'border-red-500' : ''}`}
                                        placeholder="Tell us why you're the perfect candidate for this position..."
                                    ></textarea>
                                    {formErrors.coverLetter && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.coverLetter}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                                        isDarkMode 
                                            ? 'bg-blue-600 hover:bg-blue-700' 
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;