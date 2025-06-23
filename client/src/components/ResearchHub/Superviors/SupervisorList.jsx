import React, { useState } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import SupervisorCard from './SupervisorCard';
import { mockSupervisors } from '../data/mockData.js';

const SupervisorList = () => {
    const [supervisors] = useState(mockSupervisors);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    const filteredSupervisors = supervisors
        .filter(supervisor => {
            const matchesSearch = supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                supervisor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                supervisor.researchAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesAvailability = filterAvailability === 'all' || supervisor.availability === filterAvailability;
            const matchesDepartment = filterDepartment === 'all' || supervisor.department === filterDepartment;

            return matchesSearch && matchesAvailability && matchesDepartment;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'publications':
                    return b.publications - a.publications;
                default:
                    return 0;
            }
        });

    const departments = [...new Set(supervisors.map(s => s.department))];

    const handleRequestMentorship = (supervisorId) => {
        // This would open a modal or navigate to request form
        console.log('Requesting mentorship from supervisor:', supervisorId);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Find Supervisors</h1>
                <p className="text-gray-600 mt-2">
                    Connect with academic supervisors who match your research interests
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, expertise, or research area..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Availability Filter */}
                    <div>
                        <select
                            value={filterAvailability}
                            onChange={(e) => setFilterAvailability(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Availability</option>
                            <option value="available">Available</option>
                            <option value="limited">Limited</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>

                    {/* Department Filter */}
                    <div>
                        <select
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">Sort by:</span>
                        <div className="flex items-center space-x-2">
                            <SortAsc className="h-4 w-4 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="rating">Rating</option>
                                <option value="name">Name</option>
                                <option value="publications">Publications</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        {filteredSupervisors.length} of {supervisors.length} supervisors
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSupervisors.map((supervisor) => (
                    <SupervisorCard
                        key={supervisor.id}
                        supervisor={supervisor}
                        onRequestMentorship={() => handleRequestMentorship(supervisor.id)}
                    />
                ))}
            </div>

            {filteredSupervisors.length === 0 && (
                <div className="text-center py-12">
                    <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No supervisors found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
            )}
        </div>
    );
};

export default SupervisorList;
