import React, { useState, useEffect } from 'react';
import Card from '../components/Layout/Card';
import { getJobs } from '../ConfigAPI.js';
import { useSearchParams } from 'react-router-dom';
import { Search, Briefcase, MapPin, DollarSign, Filter, SlidersHorizontal } from 'lucide-react';

const AllJobs = ({ isDarkMode, user }) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        company: 'all',
        location: 'all',
        salary: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    const displayJobs = async () => {
        try {
            const jobsData = await getJobs();
            // Debug log to see job data structure
            console.log("Sample Job Data:", jobsData?.[0]);
            setJobs(jobsData);
            filterJobs(jobsData, filters);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const parseSalary = (salaryString) => {
        // Debug log
        console.log("Parsing salary:", salaryString, typeof salaryString);
        
        if (salaryString === undefined || salaryString === null) {
            return 0;
        }

        // Convert to string first
        const str = String(salaryString);
        
        // Extract numbers only
        const matches = str.match(/\d+/g);
        if (!matches) return 0;
        
        // Join all numbers and convert to float
        const number = parseFloat(matches.join(''));
        return isNaN(number) ? 0 : number;
    };

    const filterJobs = (jobsData, currentFilters) => {
        if (!Array.isArray(jobsData)) {
            console.error("Invalid jobs data:", jobsData);
            return;
        }

        let filtered = [...jobsData];

        // Apply search and location filters from URL
        const search = searchParams.get('search')?.toLowerCase();
        const locationParam = searchParams.get('location')?.toLowerCase();

        if (search) {
            filtered = filtered.filter(job => 
                (job.title || '').toLowerCase().includes(search) ||
                (job.company || '').toLowerCase().includes(search) ||
                (job.description || '').toLowerCase().includes(search)
            );
        }

        if (locationParam) {
            filtered = filtered.filter(job => 
                (job.location || '').toLowerCase().includes(locationParam)
            );
        }

        // Apply dropdown filters
        if (currentFilters.company !== 'all') {
            filtered = filtered.filter(job => 
                job.company === currentFilters.company
            );
        }

        if (currentFilters.salary !== 'all') {
            filtered = filtered.filter(job => {
                try {
                    const salary = parseSalary(job.salary);
                    console.log("Processed salary for", job.title, ":", salary); // Debug log
                    
                    switch (currentFilters.salary) {
                        case '0-50k': return salary >= 0 && salary <= 50000;
                        case '50k-100k': return salary > 50000 && salary <= 100000;
                        case '100k+': return salary > 100000;
                        default: return true;
                    }
                } catch (error) {
                    console.error("Error parsing salary for job:", job.title, error);
                    return false;
                }
            });
        }

        if (currentFilters.location !== 'all') {
            filtered = filtered.filter(job => 
                job.location === currentFilters.location
            );
        }

        setFilteredJobs(filtered);
    };

    useEffect(() => {
        displayJobs();
    }, []);


    useEffect(() => {
        if (jobs.length > 0) {
            filterJobs(jobs, filters);
        }
    }, [searchParams, filters, jobs]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-50 text-zinc-900'}`}>
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Discover opportunities that match your skills and aspirations
                </p>

                {/* Search Stats */}
                {(searchParams.get('search') || searchParams.get('location')) && (
                    <div className={`mb-6 p-4 rounded-xl ${
                        isDarkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-white/50 border border-zinc-200'
                    }`}>
                        <div className="flex items-center gap-2">
                            <Search size={20} className="text-blue-500" />
                            <span className="font-medium">Search Results:</span>
                            {searchParams.get('search') && (
                                <span className="text-blue-500">"{searchParams.get('search')}"</span>
                            )}
                            {searchParams.get('location') && (
                                <>
                                    <span>in</span>
                                    <span className="text-blue-500">"{searchParams.get('location')}"</span>
                                </>
                            )}
                        </div>
                        <div className="mt-2 text-sm">
                            Found {filteredJobs.length} matching jobs
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                                ${isDarkMode 
                                    ? 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700' 
                                    : 'bg-white hover:bg-zinc-50 border border-zinc-200'}`}
                        >
                            <SlidersHorizontal size={20} />
                            <span>Filters</span>
                        </button>
                        <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {filteredJobs.length} jobs found
                        </div>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className={`mt-4 p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6
                        ${isDarkMode 
                            ? 'bg-zinc-800/50 border border-zinc-700' 
                            : 'bg-white/50 border border-zinc-200'}`}
                    >
                        {/* Company Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Company</label>
                            <select
                                value={filters.company}
                                onChange={(e) => setFilters(prev => ({...prev, company: e.target.value}))}
                                className={`w-full p-2 rounded-lg border ${
                                    isDarkMode 
                                        ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
                                        : 'bg-white border-zinc-200 text-zinc-900'
                                }`}
                            >
                                <option value="all">All Companies</option>
                                {Array.from(new Set(jobs.map(job => job.company))).map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>

                        {/* Salary Range Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Salary Range</label>
                            <select
                                value={filters.salary}
                                onChange={(e) => setFilters(prev => ({...prev, salary: e.target.value}))}
                                className={`w-full p-2 rounded-lg border ${
                                    isDarkMode 
                                        ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
                                        : 'bg-white border-zinc-200 text-zinc-900'
                                }`}
                            >
                                <option value="all">All Ranges</option>
                                <option value="0-50k">$0 - $50,000</option>
                                <option value="50k-100k">$50,000 - $100,000</option>
                                <option value="100k+">$100,000+</option>
                            </select>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <select
                                value={filters.location}
                                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                                className={`w-full p-2 rounded-lg border ${
                                    isDarkMode 
                                        ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
                                        : 'bg-white border-zinc-200 text-zinc-900'
                                }`}
                            >
                                <option value="all">All Locations</option>
                                {Array.from(new Set(jobs.map(job => job.location))).map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <Card
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                description={job.description}
                                company={job.company}
                                location={job.location}
                                salary={job.salary}
                                isDarkMode={isDarkMode}
                                user={user}
                            />
                        ))
                    ) : (
                        <div className={`col-span-full text-center py-16 ${
                            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                            <div className="flex justify-center mb-4">
                                <Briefcase size={48} className="opacity-20" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                            <p className="text-sm">
                                Try adjusting your search criteria or removing some filters
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllJobs;
