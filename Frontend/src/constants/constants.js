import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Award, 
  Clock,
  FileText,
  Mail,
  Lock,
  MapPin,
  Smartphone,
  HelpCircle
} from 'lucide-react';


// pages/Home.js
export const jobTitles = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UI/UX Designer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Machine Learning Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Java Developer',
  'Python Developer',
  'Mobile App Developer',
  'Cloud Architect',
  'Data Analyst',
  'Business Analyst',
  'Digital Marketing Specialist',
  'Content Writer',
  'Graphic Designer',
  'Mechanical Engineer',
  'Electrical Engineer',
  'HR Manager',
  'Financial Analyst'
];

export const cities = [
  // Indian Cities
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
  // US Cities
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  // Other Global Cities
  'London', 'Tokyo', 'Sydney', 'Singapore', 'Dubai'
];

export const getFeatures = (isDarkMode) => [
  {
    icon: <Briefcase className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} size={24} />,
    title: "100,000+ Jobs",
    description: "Access to premium job listings from top companies worldwide."
  },
  {
    icon: <DollarSign className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} size={24} />,
    title: "Competitive Salaries",
    description: "Find jobs with salary ranges matching your expectations."
  },
  {
    icon: <Globe className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} size={24} />,
    title: "Remote Opportunities",
    description: "Discover remote and flexible working options."
  },
  {
    icon: <Users className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size={24} />,
    title: "Networking",
    description: "Connect with industry professionals and recruiters."
  },
  {
    icon: <TrendingUp className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} size={24} />,
    title: "Career Growth",
    description: "Resources and tools to advance your career."
  },
  {
    icon: <Award className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} size={24} />,
    title: "Skill Development",
    description: "Courses and certifications to enhance your skills."
  }
];

export const testimonials = [
  {
    feedback: "HireMe helped me transition from a non-tech background to a Product Manager role at a FAANG company!",
    name: "Priya Patel",
    job: "Product Manager at Amazon",
    avatar: "/avatars/priya.jpg",
    rating: 5
  },
  {
    feedback: "Within 3 weeks of using HireMe, I had 5 interview offers and landed my dream remote job.",
    name: "Rahul Sharma",
    job: "Senior Developer at GitLab",
    avatar: "/avatars/rahul.jpg",
    rating: 5
  },
  {
    feedback: "The salary negotiation tools alone were worth creating an account. I increased my offer by 30%!",
    name: "Anjali Mehta",
    job: "Data Scientist at Microsoft",
    avatar: "/avatars/anjali.jpg",
    rating: 4
  },
  {
    feedback: "As a hiring manager, I find the quality of candidates through HireMe to be exceptional.",
    name: "David Wilson",
    job: "Engineering Director at Google",
    avatar: "/avatars/david.jpg",
    rating: 5
  }
];

export const categories = ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 'Design'];

export const faqs = [
  {
    question: 'How do I create a HireMe account?',
    answer: 'Creating an account is easy! Click on the "Sign Up" button on the homepage and fill in your details.',
  },
  {
    question: 'Is HireMe free to use?',
    answer: 'Yes, HireMe is completely free for job seekers.',
  },
  {
    question: 'How can I apply for jobs?',
    answer: 'Once you find a job listing that matches your skills, click on the "Apply Now" button and follow the instructions.',
  },
  {
    question: 'Can I connect directly with employers?',
    answer: 'Yes, our platform allows you to connect and network with employers.',
  },
  {
    question: 'How do I search for jobs by location?',
    answer: 'Use the search bar to enter your desired location and find jobs nearby.',
  },
];

// components/CommunityComponents/CommunityFeed.js
export const INITIAL_POSTS = [
  {
    id: 1,
    user: "Aarav Sharma",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    content: "Just got an internship at Google! 🎉 Super excited to start my journey in tech! #FirstJob #Google #TechLife",
    timestamp: "1 hour ago",
    likes: 325,
    comments: 42,
    commentsList: [],
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3L7BJpqvR6Z07rEAG7M9OA.png",
  },
  {
    id: 2,
    user: "Ishita Patel",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    content: "Looking for JavaScript resources. Any recommendations? Currently learning React and Node.js. #WebDev #JavaScript #LearningToCode",
    timestamp: "3 hours ago",
    likes: 169,
    comments: 156,
    commentsList: [],
  },
  {
    id: 3,
    user: "Rohan Gupta",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "Excited to join this community! 🚀 Looking forward to connecting with fellow developers! #TechCommunity #Networking",
    timestamp: "5 hours ago",
    likes: 212,
    comments: 33,
    commentsList: [],
  },
  {
    id: 4,
    user: "Ananya Singh",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    content: "Just started learning Python. Any tips for beginners? Currently following the 100 Days of Code challenge! #Python #CodingJourney",
    timestamp: "7 hours ago",
    likes: 408,
    comments: 256,
    commentsList: [],
  },
  {
    id: 5,
    user: "Vikram Singh",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "Sharing my journey into AI and Machine Learning. Check out my blog on Deep Learning fundamentals! #AI #ML #DeepLearning",
    timestamp: "9 hours ago",
    likes: 545,
    comments: 120,
    commentsList: [],
    image: "https://www.springboard.com/blog/wp-content/uploads/2018/12/image2-4-1024x571.png",
  },
  {
    id: 6,
    user: "Neha Verma",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    content: "Just got my first job as a Web Developer! 🎉 Thanks to this amazing community for all the support! #WebDev #Success",
    timestamp: "11 hours ago",
    likes: 709,
    comments: 145,
    commentsList: [],
  },
  {
    id: 7,
    user: "Arjun Reddy",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    content: "Completed my AWS certification! Cloud computing is the future. Happy to help anyone starting their cloud journey. #AWS #Cloud",
    timestamp: "12 hours ago",
    likes: 433,
    comments: 89,
    commentsList: [],
    image: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certification-Badge.4a8f0c22f0d9935362d0cdb6655cf9e4b4c39783.png",
  },
  {
    id: 8,
    user: "Priya Malhotra",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    content: "Hosting a free workshop on UI/UX design this weekend! DM for details. Let's learn together! #Design #Workshop #UX",
    timestamp: "14 hours ago",
    likes: 289,
    comments: 94,
    commentsList: [],
  },
  {
    id: 9,
    user: "Karan Shah",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "Just launched my first mobile app! It's a meditation app with AI-powered personalization. #MobileApp #Startup",
    timestamp: "16 hours ago",
    likes: 512,
    comments: 167,
    commentsList: [],
    image: "https://cdn.dribbble.com/users/2131993/screenshots/15628402/media/7bb0d27e44d8c2eff47276ae86bfd6a3.png?compress=1&resize=800x600",
  },
  {
    id: 10,
    user: "Meera Iyer",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    content: "Transitioning from marketing to data science. The journey is challenging but worth it! Any tips? #CareerChange #DataScience",
    timestamp: "18 hours ago",
    likes: 378,
    comments: 142,
    commentsList: [],
  }
];

export const POSTS_PER_PAGE = 5;

export const DEFAULT_AVATAR = "https://via.placeholder.com/40";
export const DEFAULT_USER_NAME = "Anonymous User";


// src/components/Navbar.js
export const sampleNotifications = [
  {
    id: 1,
    message: "New job matching your profile!",
    time: "2 hours ago",
    read: false,
    type: "job"
  },
  {
    id: 2,
    message: "Your application was viewed by Google",
    time: "1 day ago",
    read: false,
    type: "application"
  },
  {
    id: 3,
    message: "Interview scheduled with Microsoft",
    time: "2 days ago",
    read: true,
    type: "interview"
  }
];

// src/components/FeaturedCompanies.js
export   const companies = [
    { name: "Infosys", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png", description: "Leading technology company" },
    { name: "Accenture", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png", description: "Global professional services company" },
    { name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png", description: "E-commerce and cloud computing company" },
    { name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png", description: "Multinational technology company" },
    { name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png", description: "Multinational technology company" },
    { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png", description: "Multinational technology company" },
    { name: "IBM", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png", description: "Multinational technology company" },
    { name: "Wipro", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png", description: "Indian multinational corporation" },
  ];

// components/CommunityComponents/HeaderSection.js 
export const headlines = [
  "Find Your Dream Job Here",
  "Empowering Careers, Connecting Talent",
  "Remote, Onsite, Hybrid — We've Got You",
  "Job Seekers & Employers — Join Us Today!",
  "Your Next Career Move Starts Now",
  "Tech Talent Meets Opportunity",
  "Building Careers, One Connection at a Time",
  "Where Passion Meets Profession"
];

// components/CommunityComponents/PinnedPosts.js 
export const pinnedPosts = [
  {
    id: 1,
    title: "Community Meetup",
    details: "Next Saturday at 6 PM",
    timestamp: "Apr 13, 2025",
  },
  {
    id: 2,
    title: "AMA with Google Engineers",
    details: "Monday, 8 PM IST on Zoom",
    timestamp: "Apr 15, 2025",
  },
  {
    id: 3,
    title: "Open Source Sprint",
    details: "Join us this weekend on GitHub",
    timestamp: "Apr 20, 2025",
  },
  {
    id: 4,
    title: "Resume Workshop",
    details: "Wednesday at 4 PM in Community Hall",
    timestamp: "Apr 17, 2025",
  },
  {
    id: 5,
    title: "Mock Interview Day",
    details: "Practice with senior developers",
    timestamp: "Apr 22, 2025",
  },
  {
    id: 6,
    title: "Tech Talk: AI in 2025",
    details: "Keynote by Dr. Smith from MIT",
    timestamp: "Apr 25, 2025",
  }
];

// components/CommunityComponents/PollsQA.js 
export const pollQuestions = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    options: [
      { id: 1, label: "JavaScript" },
      { id: 2, label: "Python" },
      { id: 3, label: "Java" },
      { id: 4, label: "C++" },
    ],
  },
  {
    id: 2,
    question: "Which frontend framework do you prefer?",
    options: [
      { id: 1, label: "React" },
      { id: 2, label: "Vue" },
      { id: 3, label: "Angular" },
      { id: 4, label: "Svelte" },
    ],
  },
  {
    id: 3,
    question: "What's your preferred work environment?",
    options: [
      { id: 1, label: "Fully Remote" },
      { id: 2, label: "Hybrid" },
      { id: 3, label: "Office Only" },
      { id: 4, label: "No Preference" },
    ],
  },
  {
    id: 4,
    question: "Which cloud platform do you use most?",
    options: [
      { id: 1, label: "AWS" },
      { id: 2, label: "Azure" },
      { id: 3, label: "Google Cloud" },
      { id: 4, label: "Other" },
    ],
  }
];

// src/pages/Community.js
export const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechVerse",
    location: "Remote",
    type: "Full-time",
    salary: "6–10 LPA",
    experience: "1–3 yrs"
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Microsoft",
    location: "Bangalore",
    type: "Full-time",
    salary: "12–18 LPA",
    experience: "2–4 yrs"
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Google",
    location: "Remote",
    type: "Full-time",
    salary: "10–16 LPA",
    experience: "3–5 yrs"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Figma",
    location: "San Francisco",
    type: "Contract",
    salary: "8–12 LPA",
    experience: "2–3 yrs"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Hyderabad",
    type: "Full-time",
    salary: "9–15 LPA",
    experience: "2–5 yrs"
  },
  {
    id: 6,
    title: "Mobile Developer (Flutter)",
    company: "Flipkart",
    location: "Bangalore",
    type: "Full-time",
    salary: "8–14 LPA",
    experience: "1–4 yrs"
  },
  {
    id: 7,
    title: "AI Research Intern",
    company: "OpenAI",
    location: "Remote",
    type: "Internship",
    salary: "4–6 LPA",
    experience: "0–1 yrs"
  },
  {
    id: 8,
    title: "Product Manager",
    company: "Zoho",
    location: "Chennai",
    type: "Full-time",
    salary: "12–20 LPA",
    experience: "3–6 yrs"
  }
];

export const resources = [
  {
    id: 1,
    title: "React Official Docs",
    link: "https://reactjs.org",
    description: "Comprehensive guide to learn React.js fundamentals and advanced patterns.",
    tag: "Docs",
    topics: ["react", "hooks", "components"]
  },
  {
    id: 2,
    title: "JavaScript Roadmap 2025",
    link: "https://roadmap.sh/javascript",
    description: "A structured path to master modern JavaScript.",
    tag: "Roadmap",
    topics: ["javascript", "frontend"]
  },
  {
    id: 3,
    title: "Intro to DSA - Video Course",
    link: "https://youtube.com/...",
    tag: "Video",
    topics: ["dsa", "beginner", "interview prep"]
  },
  {
    id: 4,
    title: "System Design Primer",
    link: "https://github.com/donnemartin/system-design-primer",
    description: "Learn how to design large-scale systems.",
    tag: "GitHub",
    topics: ["system design", "backend"]
  },
  {
    id: 5,
    title: "CSS Tricks Complete Guide",
    link: "https://css-tricks.com",
    description: "Everything about modern CSS techniques.",
    tag: "Tutorial",
    topics: ["css", "styling"]
  },
  {
    id: 6,
    title: "The Art of Command Line",
    link: "https://github.com/jlevy/the-art-of-command-line",
    description: "Master the command line in one page.",
    tag: "Cheatsheet",
    topics: ["terminal", "linux"]
  }
];

export const trendingTopics = [
  { id: 1, title: "#RemoteWork", posts: 120 },
  { id: 2, title: "#CareerGrowth", posts: 98 },
  { id: 3, title: "#TechTrends", posts: 85 },
  { id: 4, title: "#LearnPython", posts: 72 },
  { id: 5, title: "#JobSearchTips", posts: 65 },
  { id: 6, title: "#DevCommunity", posts: 58 },
  { id: 7, title: "#OpenSource", posts: 52 },
  { id: 8, title: "#WorkLifeBalance", posts: 47 }
];

export const leaderboard = [
  { id: 1, name: "Raj Malhotra", points: 1500 },
  { id: 2, name: "Neha Verma", points: 1350 },
  { id: 3, name: "Vikram Singh", points: 1200 },
  { id: 4, name: "Priya Patel", points: 1150 },
  { id: 5, name: "Amit Sharma", points: 1050 },
  { id: 6, name: "Sneha Gupta", points: 980 },
  { id: 7, name: "Rahul Joshi", points: 920 },
  { id: 8, name: "Ananya Iyer", points: 870 }
];