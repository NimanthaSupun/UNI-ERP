export const mockUser = {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    department: 'Computer Science',
    interests: ['Machine Learning', 'Data Science', 'AI Ethics'],
    skills: ['Python', 'TensorFlow', 'Statistical Analysis'],
    year: 3,
    gpa: 3.8
};

export const mockSupervisors = [
    {
        id: '1',
        name: 'Dr. Michael Rodriguez',
        email: 'm.rodriguez@university.edu',
        department: 'Computer Science',
        expertise: ['Machine Learning', 'Neural Networks', 'Computer Vision'],
        researchAreas: ['Deep Learning', 'AI Ethics', 'Autonomous Systems'],
        publications: 45,
        currentStudents: 3,
        maxStudents: 5,
        availability: 'available',
        rating: 4.8,
        bio: 'Leading researcher in deep learning applications with focus on ethical AI development.',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
        id: '2',
        name: 'Prof. Emma Thompson',
        email: 'e.thompson@university.edu',
        department: 'Data Science',
        expertise: ['Statistics', 'Bioinformatics', 'Data Mining'],
        researchAreas: ['Healthcare Analytics', 'Genomics', 'Statistical Modeling'],
        publications: 67,
        currentStudents: 4,
        maxStudents: 6,
        availability: 'limited',
        rating: 4.9,
        bio: 'Expert in applying statistical methods to biological and healthcare data.',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
        id: '3',
        name: 'Dr. James Park',
        email: 'j.park@university.edu',
        department: 'Engineering',
        expertise: ['Robotics', 'Control Systems', 'IoT'],
        researchAreas: ['Autonomous Vehicles', 'Smart Cities', 'Industrial Automation'],
        publications: 38,
        currentStudents: 2,
        maxStudents: 4,
        availability: 'available',
        rating: 4.7,
        bio: 'Specializes in robotics and autonomous systems for real-world applications.',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    }
];

export const mockProjects = [
    {
        id: '1',
        title: 'AI-Powered Crop Disease Detection',
        description: 'Developing a mobile application that uses computer vision to identify crop diseases in real-time.',
        domain: 'Machine Learning',
        studentId: '1',
        supervisorId: '1',
        status: 'in-progress',
        startDate: '2024-01-15',
        expectedCompletion: '2024-05-15',
        milestones: [
            {
                id: '1',
                title: 'Literature Review',
                description: 'Complete comprehensive review of existing crop disease detection methods',
                dueDate: '2024-02-15',
                status: 'completed',
                completedDate: '2024-02-12'
            },
            {
                id: '2',
                title: 'Dataset Collection',
                description: 'Gather and preprocess image dataset of crop diseases',
                dueDate: '2024-03-01',
                status: 'in-progress'
            },
            {
                id: '3',
                title: 'Model Development',
                description: 'Design and train CNN model for disease classification',
                dueDate: '2024-04-01',
                status: 'pending'
            }
        ],
        tags: ['Computer Vision', 'Agriculture', 'Mobile App'],
        visibility: 'public',
        likes: 24,
        comments: [
            {
                id: '1',
                userId: '2',
                userName: 'Alex Kim',
                userAvatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
                content: 'This is such an impactful project! Have you considered using transfer learning?',
                timestamp: '2024-02-20T10:30:00Z',
                likes: 5
            }
        ]
    },
    {
        id: '2',
        title: 'Smart Traffic Management System',
        description: 'IoT-based system for optimizing traffic flow in urban areas using real-time data.',
        domain: 'IoT',
        studentId: '2',
        supervisorId: '3',
        status: 'approved',
        startDate: '2024-02-01',
        expectedCompletion: '2024-06-01',
        milestones: [],
        tags: ['IoT', 'Smart Cities', 'Traffic Management'],
        visibility: 'public',
        likes: 18,
        comments: []
    }
];

export const mockTopicSuggestions = [
    {
        id: '1',
        title: 'Predicting Student Performance Using Learning Analytics',
        description: 'Develop machine learning models to predict student academic performance based on learning management system data.',
        domain: 'Educational Technology',
        difficulty: 'intermediate',
        estimatedDuration: '4-5 months',
        suggestedSupervisors: ['1', '2'],
        matchScore: 0.92,
        tags: ['Machine Learning', 'Education', 'Data Mining']
    },
    {
        id: '2',
        title: 'Blockchain-Based Academic Credential Verification',
        description: 'Create a decentralized system for verifying academic credentials using blockchain technology.',
        domain: 'Blockchain',
        difficulty: 'advanced',
        estimatedDuration: '5-6 months',
        suggestedSupervisors: ['1'],
        matchScore: 0.87,
        tags: ['Blockchain', 'Security', 'Web3']
    },
    {
        id: '3',
        title: 'Natural Language Processing for Research Paper Summarization',
        description: 'Build an NLP system that automatically generates summaries of academic research papers.',
        domain: 'Natural Language Processing',
        difficulty: 'intermediate',
        estimatedDuration: '4 months',
        suggestedSupervisors: ['1', '2'],
        matchScore: 0.89,
        tags: ['NLP', 'Text Mining', 'Academic Research']
    }
];

export const mockMentorshipRequests = [
    {
        id: '1',
        studentId: '1',
        supervisorId: '1',
        projectTitle: 'AI-Powered Crop Disease Detection',
        message: 'I am very interested in computer vision applications for agriculture. I have experience with Python and TensorFlow.',
        status: 'approved',
        timestamp: '2024-01-10T14:30:00Z'
    },
    {
        id: '2',
        studentId: '3',
        supervisorId: '2',
        projectTitle: 'Healthcare Data Analysis for Diabetes Prediction',
        message: 'I would like to work on healthcare analytics as it aligns with my career goals in medical technology.',
        status: 'pending',
        timestamp: '2024-02-15T09:15:00Z'
    }
];
