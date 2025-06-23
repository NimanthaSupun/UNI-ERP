// User type
export const UserRoles = ['student', 'supervisor', 'admin'];
export function User({
    id = '',
    name = '',
    email = '',
    role = 'student',
    avatar = '',
    department = '',
    interests = [],
    skills = [],
    year,
    gpa
} = {}) {
    return { id, name, email, role, avatar, department, interests, skills, year, gpa };
}

// Supervisor type
export function Supervisor({
    id = '',
    name = '',
    email = '',
    department = '',
    expertise = [],
    researchAreas = [],
    publications = 0,
    currentStudents = 0,
    maxStudents = 0,
    availability = 'available',
    rating = 0,
    bio = '',
    avatar = ''
} = {}) {
    return {
        id, name, email, department, expertise, researchAreas,
        publications, currentStudents, maxStudents, availability, rating, bio, avatar
    };
}

// Milestone type
export const MilestoneStatus = ['pending', 'in-progress', 'completed', 'overdue'];
export function Milestone({
    id = '',
    title = '',
    description = '',
    dueDate = '',
    status = 'pending',
    completedDate
} = {}) {
    return { id, title, description, dueDate, status, completedDate };
}

// Comment type
export function Comment({
    id = '',
    userId = '',
    userName = '',
    userAvatar = '',
    content = '',
    timestamp = '',
    likes = 0,
    replies = []
} = {}) {
    return { id, userId, userName, userAvatar, content, timestamp, likes, replies };
}

// ResearchProject type
export const ProjectStatus = ['proposed', 'approved', 'in-progress', 'completed', 'on-hold'];
export const ProjectVisibility = ['public', 'private'];
export function ResearchProject({
    id = '',
    title = '',
    description = '',
    domain = '',
    studentId = '',
    supervisorId = '',
    status = 'proposed',
    startDate = '',
    expectedCompletion = '',
    milestones = [],
    tags = [],
    visibility = 'public',
    likes = 0,
    comments = []
} = {}) {
    return {
        id, title, description, domain, studentId, supervisorId, status,
        startDate, expectedCompletion, milestones, tags, visibility, likes, comments
    };
}

// TopicSuggestion type
export const TopicDifficulty = ['beginner', 'intermediate', 'advanced'];
export function TopicSuggestion({
    id = '',
    title = '',
    description = '',
    domain = '',
    difficulty = 'beginner',
    estimatedDuration = '',
    suggestedSupervisors = [],
    matchScore = 0,
    tags = []
} = {}) {
    return {
        id, title, description, domain, difficulty, estimatedDuration,
        suggestedSupervisors, matchScore, tags
    };
}

// MentorshipRequest type
export const MentorshipStatus = ['pending', 'approved', 'rejected'];
export function MentorshipRequest({
    id = '',
    studentId = '',
    supervisorId = '',
    projectTitle = '',
    message = '',
    status = 'pending',
    timestamp = ''
} = {}) {
    return { id, studentId, supervisorId, projectTitle, message, status, timestamp };
}
