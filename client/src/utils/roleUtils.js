import { GraduationCap, BookOpen, Users } from 'lucide-react';

export const getRoleInfo = (role) => {
  switch (role) {
    case 'student':
      return { 
        title: 'Student', 
        portalTitle: 'Student Portal',
        registrationTitle: 'Student Registration',
        color: 'from-blue-500 to-blue-600', 
        hoverColor: 'from-blue-600 to-blue-700',
        icon: GraduationCap,
        description: 'Access courses, grades, assignments and academic resources'
      };
    case 'lecturer':
      return { 
        title: 'Lecturer', 
        portalTitle: 'Lecturer Portal',
        registrationTitle: 'Lecturer Registration',
        color: 'from-emerald-500 to-emerald-600', 
        hoverColor: 'from-emerald-600 to-emerald-700',
        icon: BookOpen,
        description: 'Manage courses, students, grades and academic content'
      };
    case 'coordinator':
      return { 
        title: 'Coordinator', 
        portalTitle: 'Coordinator Portal',
        registrationTitle: 'Coordinator Registration',
        color: 'from-purple-500 to-purple-600', 
        hoverColor: 'from-purple-600 to-purple-700',
        icon: Users,
        description: 'Oversee programs, schedules and administrative tasks'
      };
    default:
      return { 
        title: 'User', 
        portalTitle: 'Portal',
        registrationTitle: 'Registration',
        color: 'from-gray-500 to-gray-600', 
        hoverColor: 'from-gray-600 to-gray-700',
        icon: GraduationCap,
        description: 'Access the system'
      };
  }
};