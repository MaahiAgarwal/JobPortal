import React, { useState, useEffect } from 'react';
import CompanyCard from '../components/Layout/CompanyCard';
import { Building2, Search } from 'lucide-react';

const Companies = ({ isDarkMode }) => {
    const [companies, setCompanies] = useState([
        {
            name: "Google",
            location: "Mountain View, CA",
            employees: "150,000+",
            jobsPosted: 245
        },
        {
            name: "Microsoft",
            location: "Redmond, WA",
            employees: "180,000+",
            jobsPosted: 189
        },
        {
            name: "Apple",
            location: "Cupertino, CA",
            employees: "160,000+",
            jobsPosted: 167
        },
        {
            name: "Amazon",
            location: "Seattle, WA",
            employees: "1,600,000+",
            jobsPosted: 432
        },
        {
            name: "Meta",
            location: "Menlo Park, CA",
            employees: "85,000+",
            jobsPosted: 156
        },
        {
            name: "Netflix",
            location: "Los Gatos, CA",
            employees: "12,000+",
            jobsPosted: 89
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState(companies);

    useEffect(() => {
        const filtered = companies.filter(company => 
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }, [searchTerm, companies]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-50 text-zinc-900'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Top Companies Hiring Now</h1>
                    <p className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Discover your next career move with these industry leaders
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${
                        isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-zinc-200'
                    }`}>
                        <Search className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
                        <input
                            type="text"
                            placeholder="Search companies by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`flex-1 bg-transparent border-none outline-none placeholder:${
                                isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                            }`}
                        />
                    </div>
                </div>

                {/* Companies Grid */}
                {filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.map((company, index) => (
                            <CompanyCard
                                key={index}
                                name={company.name}
                                location={company.location}
                                employees={company.employees}
                                jobsPosted={company.jobsPosted}
                                isDarkMode={isDarkMode}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={`text-center py-16 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <div className="flex justify-center mb-4">
                            <Building2 size={48} className="opacity-20" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No companies found</h3>
                        <p className="text-sm">
                            Try adjusting your search terms
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Companies;