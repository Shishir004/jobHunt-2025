// JobCard.jsx
import React from 'react';

const JobCard = ({ companyName, location, jobTitle, description, tags = [] }) => {
    const tagColorClasses = {
        blue: 'bg-blue-900/50 text-blue-300',
        red: 'bg-red-900/50 text-red-300',
        purple: 'bg-purple-900/50 text-purple-300',
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg hover:bg-slate-800 transition-colors duration-300 h-full flex flex-col">
            {/* Company Info */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{companyName || "Company Name"}</h3>
                <p className="text-sm text-gray-400">{location || "Location"}</p>
            </div>

            {/* Job Info */}
            <div className="mb-4 flex-grow">
                <h4 className="text-2xl font-bold text-white">{jobTitle || "Job Title"}</h4>
                <p className="text-gray-400 mt-2">{description || "Job description goes here."}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span 
                        key={index}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${tagColorClasses[tag.color] || 'bg-gray-700 text-gray-300'}`}
                    >
                        {tag.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default JobCard;
