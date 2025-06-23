import React from 'react';
import { Link } from 'react-router-dom';
import { 
    BookOpen, 
    Users, 
    Target, 
    TrendingUp, 
    Clock, 
    CheckCircle,
    AlertCircle,
    Plus,
    Star,
    MessageSquare
} from 'lucide-react';
import { mockProjects, mockTopicSuggestions, mockUser } from '../../data/mockData';

const StudentDashboard = () => {
    const currentProject = mockProjects[0];
    const suggestions = mockTopicSuggestions.slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {mockUser.name}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Here's what's happening with your research journey
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Projects</p>
                            <p className="text-2xl font-bold text-gray-900">1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Completed Milestones</p>
                            <p className="text-2xl font-bold text-gray-900">1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Star className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">AI Match Score</p>
                            <p className="text-2xl font-bold text-gray-900">92%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Peer Interactions</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Project */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Current Project</h2>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                                    In Progress
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {currentProject.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{currentProject.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentProject.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Progress</span>
                                    <span>33% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                                </div>
                            </div>

                            {/* Upcoming Milestones */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Upcoming Milestones</h4>
                                {currentProject.milestones
                                    .filter(milestone => milestone.status !== 'completed')
                                    .slice(0, 2)
                                    .map((milestone) => (
                                        <div key={milestone.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className={`p-1 rounded-full ${
                                                milestone.status === 'in-progress' 
                                                    ? 'bg-blue-600' 
                                                    : 'bg-gray-400'
                                            }`}>
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{milestone.title}</p>
                                                <p className="text-sm text-gray-600">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                                            </div>
                                            {milestone.status === 'in-progress' && (
                                                <Clock className="h-4 w-4 text-blue-600" />
                                            )}
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-6 flex space-x-3">
                                <Link
                                    to={`/project/${currentProject.id}`}
                                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Project Details
                                </Link>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Update Progress
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                to="/supervisors"
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Users className="h-5 w-5 text-blue-600 mr-3" />
                                <span className="font-medium">Find Supervisors</span>
                            </Link>
                            
                            <Link
                                to="/collaboration"
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <MessageSquare className="h-5 w-5 text-emerald-600 mr-3" />
                                <span className="font-medium">Join Discussions</span>
                            </Link>
                            
                            <button className="flex items-center w-full p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                                <Plus className="h-5 w-5 mr-3" />
                                <span className="font-medium">Start New Project</span>
                            </button>
                        </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <Target className="h-5 w-5 text-purple-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {suggestions.map((suggestion) => (
                                <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                                            {suggestion.title}
                                        </h3>
                                        <div className="flex items-center text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                                            <Star className="h-3 w-3 mr-1" />
                                            {Math.round(suggestion.matchScore * 100)}%
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                        {suggestion.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            suggestion.difficulty === 'beginner' 
                                                ? 'bg-green-100 text-green-800'
                                                : suggestion.difficulty === 'intermediate'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {suggestion.difficulty}
                                        </span>
                                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Link
                            to="/suggestions"
                            className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            View All Suggestions →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;