import React from 'react';
import { Building2, MapPin, Users, Briefcase } from 'lucide-react';

const CompanyCard = ({ name, location, employees, jobsPosted, isDarkMode }) => {
    return (
        <div className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${
            isDarkMode 
                ? 'bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700' 
                : 'bg-white/50 hover:bg-white border border-zinc-200'
        }`}>
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative p-6">
                {/* Company Name */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${
                        isDarkMode ? 'bg-zinc-700' : 'bg-zinc-100'
                    }`}>
                        <Building2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                </div>

                {/* Company Details */}
                <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>{location}</span>
                    </div>

                    {/* Employees */}
                    <div className="flex items-center gap-2 text-sm">
                        <Users className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                            {employees} Employees
                        </span>
                    </div>

                    {/* Jobs Posted */}
                    <div className="flex items-center gap-2 text-sm">
                        <Briefcase className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                            {jobsPosted} Jobs Posted
                        </span>
                    </div>
                </div>

                {/* View Jobs Button */}
                <button className={`w-full mt-6 px-4 py-2 rounded-xl font-medium transition-all
                    bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                    text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-600/25
                    transform hover:-translate-y-0.5`}>
                    View Jobs
                </button>
            </div>
        </div>
    );
};

export default CompanyCard;