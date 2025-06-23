import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Filter, TrendingUp as Trending, Clock } from 'lucide-react';
import { mockProjects } from '../../data/mockData';

const CollaborationFeed = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    const toggleLike = (projectId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(projectId)) {
            newLiked.delete(projectId);
        } else {
            newLiked.add(projectId);
        }
        setLikedPosts(newLiked);
    };

    const toggleBookmark = (projectId) => {
        const newBookmarked = new Set(bookmarkedPosts);
        if (newBookmarked.has(projectId)) {
            newBookmarked.delete(projectId);
        } else {
            newBookmarked.add(projectId);
        }
        setBookmarkedPosts(newBookmarked);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Research Collaboration</h1>
                <p className="text-gray-600 mt-2">
                    Discover ongoing research projects and connect with fellow researchers
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <div className="flex space-x-2">
                            {['all', 'trending', 'recent', 'following'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        activeFilter === filter
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    {filter === 'all' && 'All Projects'}
                                    {filter === 'trending' && (
                                        <>
                                            <Trending className="h-3 w-3 inline mr-1" />
                                            Trending
                                        </>
                                    )}
                                    {filter === 'recent' && (
                                        <>
                                            <Clock className="h-3 w-3 inline mr-1" />
                                            Recent
                                        </>
                                    )}
                                    {filter === 'following' && 'Following'}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Share Update
                    </button>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
                {mockProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                        {/* Post Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face"
                                        alt="Student"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                                        <p className="text-sm text-gray-600">
                                            Computer Science • {formatDate(project.startDate)}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                {project.title}
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        #{tag.toLowerCase().replace(' ', '')}
                                    </span>
                                ))}
                            </div>

                            {/* Progress Update */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Latest Update</h4>
                                <p className="text-gray-700 text-sm mb-3">
                                    Just completed the literature review phase! Found some fascinating papers on 
                                    computer vision applications in agriculture. The dataset collection is going 
                                    well - we now have over 5,000 labeled images of crop diseases.
                                </p>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress: 33% Complete</span>
                                    <span>Next: Dataset preprocessing</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Post Actions */}
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <button
                                        onClick={() => toggleLike(project.id)}
                                        className={`flex items-center space-x-2 ${
                                            likedPosts.has(project.id) 
                                                ? 'text-red-600' 
                                                : 'text-gray-600 hover:text-red-600'
                                        } transition-colors`}
                                    >
                                        <Heart className={`h-5 w-5 ${likedPosts.has(project.id) ? 'fill-current' : ''}`} />
                                        <span className="text-sm font-medium">
                                            {project.likes + (likedPosts.has(project.id) ? 1 : 0)}
                                        </span>
                                    </button>

                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="text-sm font-medium">{project.comments.length}</span>
                                    </button>

                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                                        <Share2 className="h-5 w-5" />
                                        <span className="text-sm font-medium">Share</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => toggleBookmark(project.id)}
                                    className={`p-2 rounded-lg ${
                                        bookmarkedPosts.has(project.id)
                                            ? 'text-amber-600 bg-amber-50'
                                            : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                                    } transition-colors`}
                                >
                                    <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(project.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Comments Preview */}
                        {project.comments.length > 0 && (
                            <div className="px-6 pb-4">
                                <div className="border-t border-gray-200 pt-4">
                                    {project.comments.slice(0, 2).map((comment) => (
                                        <div key={comment.id} className="flex items-start space-x-3 mb-3">
                                            <img
                                                src={comment.userAvatar}
                                                alt={comment.userName}
                                                className="w-6 h-6 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium text-gray-900">{comment.userName}</span>
                                                    <span className="text-gray-700 ml-2">{comment.content}</span>
                                                </p>
                                                <div className="flex items-center space-x-4 mt-1">
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(comment.timestamp)}
                                                    </span>
                                                    <button className="text-xs text-gray-500 hover:text-blue-600">
                                                        Reply
                                                    </button>
                                                    <button className="text-xs text-gray-500 hover:text-red-600">
                                                        <Heart className="h-3 w-3 inline mr-1" />
                                                        {comment.likes}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {project.comments.length > 2 && (
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            View all {project.comments.length} comments
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
                <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Load More Projects
                </button>
            </div>
        </div>
    );
};

export default CollaborationFeed;