import React from 'react';
import { Star, Users, BookOpen, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const SupervisorCard = ({ supervisor, onRequestMentorship }) => {
    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'limited': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    const getAvailabilityIcon = (availability) => {
        switch (availability) {
            case 'available': return <CheckCircle className="h-4 w-4" />;
            case 'limited': return <Users className="h-4 w-4" />;
            default: return <Users className="h-4 w-4" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start space-x-4 mb-4">
                <img
                    src={supervisor.avatar}
                    alt={supervisor.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{supervisor.name}</h3>
                    <p className="text-gray-600">{supervisor.department}</p>
                    <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{supervisor.rating}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{supervisor.publications} publications</span>
                    </div>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(supervisor.availability)}`}>
                    {getAvailabilityIcon(supervisor.availability)}
                    <span className="ml-1 capitalize">{supervisor.availability}</span>
                </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{supervisor.bio}</p>

            {/* Research Areas */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Research Areas</h4>
                <div className="flex flex-wrap gap-2">
                    {supervisor.researchAreas.slice(0, 3).map((area, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                            {area}
                        </span>
                    ))}
                    {supervisor.researchAreas.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{supervisor.researchAreas.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* Expertise */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                    {supervisor.expertise.map((skill, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{supervisor.currentStudents}/{supervisor.maxStudents} students</span>
                </div>
                <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{supervisor.publications} publications</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
                <button
                    onClick={onRequestMentorship}
                    disabled={supervisor.availability === 'unavailable'}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        supervisor.availability === 'unavailable'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Request Mentorship
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default SupervisorCard;
