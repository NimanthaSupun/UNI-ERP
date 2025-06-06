import PropTypes from 'prop-types';

// User roles as constants
export const UserRole = {
    COORDINATOR: 'coordinator',
    LECTURE: 'lecture',
    STUDENT: 'student',
};

// User PropTypes
export const User = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['coordinator', 'lecture', 'student']).isRequired,
    department: PropTypes.string,
    profileImage: PropTypes.string,
});

// Course PropTypes
export const Course = PropTypes.shape({
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    credits: PropTypes.string.isRequired,
    lecturer: PropTypes.string.isRequired,
    studentsCount: PropTypes.number.isRequired,
    degreeProgram: PropTypes.string.isRequired,
});

// Hall PropTypes
export const Hall = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    availability: PropTypes.bool.isRequired,
    image: PropTypes.string,
});

// TimeSlot PropTypes
export const TimeSlot = PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired, // Format: HH:MM
    end: PropTypes.string.isRequired,   // Format: HH:MM
    day: PropTypes.string.isRequired,   // Monday, Tuesday, etc.
});

// Lecture PropTypes
export const Lecture = PropTypes.shape({
    id: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    lecturerId: PropTypes.string.isRequired,
    hallId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, // YYYY-MM-DD
    timeSlotId: PropTypes.string.isRequired,
    studentCount: PropTypes.number.isRequired,
    recurring: PropTypes.bool.isRequired,
    status: PropTypes.oneOf(['scheduled', 'canceled', 'rescheduled']).isRequired,
});

// Notification PropTypes
export const Notification = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'warning', 'success', 'error']).isRequired,
    date: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    recipients: PropTypes.arrayOf(PropTypes.string).isRequired, // User IDs
});

// Report PropTypes
export const Report = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['hall-usage', 'clashes', 'free-slots', 'student-load']).isRequired,
    dateGenerated: PropTypes.string.isRequired,
    generatedBy: PropTypes.string.isRequired,
    fileUrl: PropTypes.string,
});

// Dashboard Types
export const ScheduleSummary = PropTypes.shape({
    totalLectures: PropTypes.number.isRequired,
    upcomingLectures: PropTypes.number.isRequired,
    todayLectures: PropTypes.number.isRequired,
    weekLectures: PropTypes.number.isRequired,
});

// Clash PropTypes
export const Clash = PropTypes.shape({
    id: PropTypes.string.isRequired,
    lectures: PropTypes.arrayOf(Lecture).isRequired,
    reason: PropTypes.string.isRequired,
    resolved: PropTypes.bool.isRequired,
});