import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Brain, 
    Users, 
    Target, 
    TrendingUp, 
    BookOpen, 
    MessageSquare,
    Zap,
    Award,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
                                <Brain className="h-4 w-4 mr-2" />
                                AI-Powered Research Mentoring
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Bridge the Gap Between
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent block">
                                Students & Supervisors
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            ResearchHub uses machine learning to intelligently match undergraduate researchers 
                            with academic supervisors, fostering innovation and academic success through 
                            collaborative research partnerships.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/supervisors"
                                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Browse Supervisors
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Intelligent Research Collaboration
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform leverages advanced AI to create meaningful connections between 
                            students and supervisors while fostering peer-to-peer collaboration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* AI Matching */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-full border border-blue-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                    <Brain className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Matching</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our neural network analyzes student preferences, skills, and academic goals to 
                                    recommend the most suitable research topics and supervisors.
                                </p>
                            </div>
                        </div>

                        {/* Supervisor Engagement */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 h-full border border-emerald-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lecturer Engagement</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Academic staff can browse student ideas, express interest in mentoring, 
                                    and build meaningful research relationships based on shared interests.
                                </p>
                            </div>
                        </div>

                        {/* Peer Collaboration */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 h-full border border-purple-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                                    <MessageSquare className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Peer Collaboration</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Students can share progress, receive feedback, and collaborate with peers 
                                    working on similar research domains.
                                </p>
                            </div>
                        </div>

                        {/* Project Management */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 h-full border border-amber-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Tracking</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Comprehensive dashboard for tracking milestones, managing deliverables, 
                                    and maintaining structured communication between all stakeholders.
                                </p>
                            </div>
                        </div>

                        {/* Analytics */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 h-full border border-rose-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Analytics</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Data-driven insights help optimize research pathways and improve 
                                    matching accuracy over time through continuous learning.
                                </p>
                            </div>
                        </div>

                        {/* Academic Integrity */}
                        <div className="group">
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 h-full border border-indigo-200 group-hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Integrity</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Built-in moderation tools and content review systems ensure all 
                                    research activities maintain the highest academic standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Why Choose ResearchHub?
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our platform addresses the critical gap in undergraduate research by 
                                providing intelligent matching, seamless collaboration, and comprehensive 
                                project management tools.
                            </p>
                            
                            <div className="space-y-4">
                                {[
                                    'AI-driven supervisor matching with 92% accuracy',
                                    'Streamlined communication between all stakeholders',
                                    'Real-time project tracking and milestone management',
                                    'Peer feedback and collaboration features',
                                    'Academic integrity and content moderation',
                                    'Data-driven insights for continuous improvement'
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Instant Matching</h4>
                                            <p className="text-sm text-gray-600">Get matched in seconds</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <Users className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Expert Network</h4>
                                            <p className="text-sm text-gray-600">500+ verified supervisors</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Success Rate</h4>
                                            <p className="text-sm text-gray-600">87% project completion</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Research Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students and supervisors who are already using ResearchHub 
                        to create meaningful research collaborations.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                        >
                            Start Research Project
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/supervisors"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
                        >
                            Find Supervisors
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;