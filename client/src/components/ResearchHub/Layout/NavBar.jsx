import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Brain, 
    User, 
    Bell, 
    Search, 
    BookOpen,
    Users,
    MessageSquare,
    Settings
} from 'lucide-react';
import { mockUser } from '../data/mockData';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">ResearchHub</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects, supervisors, or topics..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/indashboard"
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/indashboard')
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                        
                        <Link
                            to="/supervisors"
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/supervisors')
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            <Users className="h-4 w-4 mr-2" />
                            Supervisors
                        </Link>

                        <Link
                            to="/collaboration"
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/collaboration')
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Collaborate
                        </Link>

                        {/* Notifications */}
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                                <img
                                    src={mockUser.avatar}
                                    alt={mockUser.name}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-gray-700">{mockUser.name}</span>
                            </button>
                            
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </Link>
                                <hr className="my-1" />
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;