// Dummy data for registered users
export const dummyUsers = [
  {
    id: 1,
    email: 'john.student@university.edu',
    password: 'password123',
    role: 'student',
    fullName: 'John Doe',
    studentId: 'STU001',
    degreeProgram: 'BSc IT',
    yearOfStudy: '2nd Year',
    department: 'Computer Science',
    researchInterests: ['AI', 'Web Development']
  },
  {
    id: 2,
    email: 'jane.lecturer@university.edu',
    password: 'password123',
    role: 'lecturer',
    fullName: 'Dr. Jane Smith',
    staffId: 'LEC001',
    designation: 'Senior Lecturer',
    department: 'Computer Science',
    researchAreas: ['Machine Learning', 'Data Science']
  },
  {
    id: 3,
    email: 'admin.coordinator@university.edu',
    password: 'password123',
    role: 'coordinator',
    fullName: 'Mike Johnson',
    staffId: 'ADM001',
    designation: 'Timetable Officer',
    department: 'Administration',
    contactNumber: '+94771234567'
  }
];

// Dropdown options for forms
export const degreePrograms = [
  'BSc IT',
  'BSc Management',
  'BSc Engineering',
  'BA Business',
  'BSc Computer Science',
  'MBA'
];

export const yearsOfStudy = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
];

export const departments = [
  'Computer Science',
  'Management',
  'Engineering',
  'Business',
  'Mathematics',
  'Physics'
];

export const lecturerDesignations = [
  'Lecturer',
  'Senior Lecturer',
  'Professor',
  'Assistant Professor'
];

export const coordinatorDesignations = [
  'Timetable Officer',
  'Hall Manager',
  'Academic Coordinator',
  'Program Coordinator'
];

export const coordinatorDepartments = [
  'Administration',
  'Academic Affairs',
  'Student Services',
  'IT Services'
];

export const researchAreas = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Web Development',
  'Mobile Development',
  'Cybersecurity',
  'Software Engineering',
  'Database Systems'
];