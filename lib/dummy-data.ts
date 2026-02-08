export interface Announcement {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author?: string;
    badge?: 'New' | 'Important' | 'Update';
}

export interface Event {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    date: string;
    time: string;
    location: string;
    isOnline: boolean;
    accentColor: string;
    image: string;
    agenda?: string[];
}

export interface Material {
    id: string;
    title: string;
    description: string;
    type: 'PDF Guide' | 'Video Tutorial' | 'Article' | 'Template' | 'Checklist' | 'Slides';
    downloadUrl?: string;
    thumbnail?: string;
}

export const announcements: Announcement[] = [
    {
        id: '1',
        title: 'Welcome to the New BUCC Platform!',
        excerpt: 'We\'re excited to launch our brand new community platform for all BUCC members.',
        content: `We're thrilled to announce the launch of our brand new BUCC community platform! This platform has been designed with you in mind, offering a seamless experience for staying connected with fellow computing students.

**What's New:**
- Modern, intuitive interface
- Real-time announcements and updates
- Event registration and tracking
- Resource library for learning materials
- Profile customization

We hope you enjoy using the platform. If you have any feedback or suggestions, please don't hesitate to reach out to the BUCC executive team.

Welcome aboard! 🎉`,
        date: '2026-02-08',
        author: 'BUCC Executive Team',
        badge: 'New'
    },
    {
        id: '2',
        title: 'Scheduled Maintenance: Feb 15, 2026',
        excerpt: 'Brief maintenance window scheduled for system improvements and security updates.',
        content: `**Maintenance Notice**

We will be performing scheduled maintenance on February 15, 2026, from 2:00 AM to 4:00 AM WAT.

During this time, the platform may be temporarily unavailable. We apologize for any inconvenience this may cause.

**What We're Updating:**
- Security patches and improvements
- Database optimization
- Performance enhancements

Thank you for your patience and understanding.`,
        date: '2026-02-06',
        author: 'Technical Team',
        badge: 'Important'
    },
    {
        id: '3',
        title: 'Feature Update: Dark Mode Now Live!',
        excerpt: 'You asked, we delivered! Dark mode is now available for all users.',
        content: `Great news! Dark mode is now available on the BUCC platform.

**How to Enable:**
1. Go to your Profile settings
2. Look for the "Appearance" section
3. Toggle "Dark Mode" on

Dark mode reduces eye strain during late-night study sessions and saves battery on OLED devices.

Let us know what you think! More customization options coming soon.`,
        date: '2026-02-05',
        author: 'Product Team',
        badge: 'Update'
    },
    {
        id: '4',
        title: 'Mid-Semester Exam Schedule Released',
        excerpt: 'The academic calendar for mid-semester examinations has been published.',
        content: `The mid-semester examination schedule for the 2025/2026 academic session has been released.

**Key Dates:**
- Exam Period: March 3-14, 2026
- Results Release: March 28, 2026

Please check your department notice board or the university portal for your specific exam timetable.

**Tips for Success:**
- Start revising early
- Form study groups
- Use the resources in our Materials section
- Take breaks and stay healthy

Good luck to everyone! 📚`,
        date: '2026-02-03'
    },
    {
        id: '5',
        title: 'BUCC Coding Challenge 2026',
        excerpt: 'Register now for the annual BUCC Coding Challenge. Amazing prizes to be won!',
        content: `**BUCC Coding Challenge 2026 🏆**

The annual BUCC Coding Challenge is back and bigger than ever!

**Event Details:**
- Date: February 28 - March 1, 2026
- Format: 24-hour hackathon
- Team Size: 2-4 members
- Location: Room 305, CSC Building

**Prizes:**
- 1st Place: ₦500,000 + Internship opportunities
- 2nd Place: ₦300,000
- 3rd Place: ₦150,000
- Best UI/UX: ₦100,000

Registration closes February 25, 2026. Don't miss out!`,
        date: '2026-02-01',
        badge: 'Important'
    }
];

export const events: Event[] = [
    {
        id: '1',
        title: 'Team All-Hands Meeting',
        description: 'Monthly general meeting for all BUCC members.',
        fullDescription: `Join us for our monthly All-Hands meeting where we discuss upcoming activities, share updates, and connect as a community.

**Agenda:**
- Welcome and introductions
- Monthly highlights and achievements
- Upcoming events preview
- Open floor for questions and suggestions
- Networking session

All members are encouraged to attend!`,
        date: 'Feb 20, 2026',
        time: '14:00 - 15:30',
        location: 'Room 201, CSC Building',
        isOnline: false,
        accentColor: '#2563eb',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
        agenda: ['Welcome', 'Monthly Highlights', 'Upcoming Events', 'Q&A', 'Networking']
    },
    {
        id: '2',
        title: 'Product Roadmap Webinar',
        description: 'Learn about upcoming features and the future of BUCC platform.',
        fullDescription: `A special webinar session where the product team will share the roadmap for the BUCC platform.

**What to Expect:**
- Platform development journey so far
- Upcoming features and improvements
- How to contribute to platform development
- Live Q&A with the development team

This is a great opportunity to learn and get involved!`,
        date: 'Feb 22, 2026',
        time: '16:00 - 17:00',
        location: 'Google Meet',
        isOnline: true,
        accentColor: '#059669',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    },
    {
        id: '3',
        title: 'Workshop: Advanced React Patterns',
        description: 'Deep dive into advanced React concepts and patterns.',
        fullDescription: `A hands-on workshop covering advanced React patterns used in production applications.

**Topics Covered:**
- Component composition patterns
- Custom hooks deep dive
- State management strategies
- Performance optimization techniques
- Testing best practices

**Prerequisites:**
- Basic React knowledge
- Laptop with Node.js installed
- VS Code or preferred IDE`,
        date: 'Feb 25, 2026',
        time: '10:00 - 13:00',
        location: 'Computer Lab 2',
        isOnline: false,
        accentColor: '#7c3aed',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        agenda: ['Component Patterns', 'Custom Hooks', 'State Management', 'Performance', 'Hands-on Practice']
    },
    {
        id: '4',
        title: 'BUCC Game Night',
        description: 'Unwind and connect with fellow members over games!',
        fullDescription: `Take a break from the code and join us for a fun-filled game night!

**Activities:**
- FIFA Tournament
- Chess Competition
- Card games
- Board games
- Just hanging out!

Snacks and drinks will be provided. Bring your competitive spirit! 🎮`,
        date: 'Feb 27, 2026',
        time: '18:00 - 21:00',
        location: 'CSC Common Room',
        isOnline: false,
        accentColor: '#dc2626',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f9b79?w=400&h=250&fit=crop'
    },
    {
        id: '5',
        title: 'Web Development Bootcamp',
        description: 'Intensive 3-day bootcamp for aspiring web developers.',
        fullDescription: `An intensive 3-day bootcamp designed to take you from beginner to confident web developer.

**Day 1: Foundations**
- HTML5 and semantic markup
- CSS3 and modern layouts
- Responsive design principles

**Day 2: JavaScript**
- JavaScript fundamentals
- DOM manipulation
- Async programming

**Day 3: Frameworks**
- Introduction to React
- Building your first React app
- Deployment basics

**Who Should Attend:**
New members and anyone looking to strengthen their web development skills.`,
        date: 'Mar 1-3, 2026',
        time: '09:00 - 16:00',
        location: 'Room 305, CSC Building',
        isOnline: false,
        accentColor: '#0891b2',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
        agenda: ['HTML & CSS', 'JavaScript', 'React Basics', 'Project Building']
    }
];

export const materials: Material[] = [
    {
        id: '1',
        title: 'BUCC Platform User Guide',
        description: 'Complete guide to navigating and using all platform features.',
        type: 'PDF Guide',
        downloadUrl: '#'
    },
    {
        id: '2',
        title: 'Getting Started with Git & GitHub',
        description: '15-minute video tutorial on version control basics.',
        type: 'Video Tutorial',
        downloadUrl: '#'
    },
    {
        id: '3',
        title: 'Best Practices for Clean Code',
        description: 'Essential tips and conventions for writing maintainable code.',
        type: 'Article',
        downloadUrl: '#'
    },
    {
        id: '4',
        title: 'Project README Template',
        description: 'Professional README template for your GitHub projects.',
        type: 'Template',
        downloadUrl: '#'
    },
    {
        id: '5',
        title: 'Interview Preparation Checklist',
        description: 'Comprehensive checklist to ace your tech interviews.',
        type: 'Checklist',
        downloadUrl: '#'
    },
    {
        id: '6',
        title: 'Introduction to System Design',
        description: 'Slide deck covering fundamental system design concepts.',
        type: 'Slides',
        downloadUrl: '#'
    }
];
