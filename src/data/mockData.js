export const mockOpportunities = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Google",
    type: "internship",
    location: "Mountain View, CA",
    duration: "10 weeks",
    description:
      "Join our team to work on cutting-edge projects that impact billions of users worldwide.",
    requirements: ["JavaScript", "React", "Node.js", "Python"],
    deadline: "2024-03-15",
    posted: "2024-01-15",
    salary: "8,000/month",
    remote: false,
    trending: true,
    applicants: 1247,
    image:
      "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Data Science Intern",
    company: "Microsoft",
    type: "internship",
    location: "Seattle, WA",
    duration: "12 weeks",
    description:
      "Work with massive datasets and build predictive models using cutting-edge tools.",
    requirements: ["Python", "R", "SQL", "Machine Learning"],
    deadline: "2024-03-01",
    posted: "2024-01-20",
    salary: "7,500/month",
    remote: true,
    trending: true,
    applicants: 892,
    image:
      "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Blockchain Developer Challenge",
    company: "Ethereum Foundation",
    type: "hackathon",
    location: "Virtual",
    duration: "72 hours",
    description:
      "Build decentralized applications that could reshape the future of finance.",
    requirements: ["Solidity", "JavaScript", "Web3.js", "React"],
    deadline: "2024-02-25",
    posted: "2024-01-12",
    prizes: "100,000 total",
    remote: true,
    trending: false,
    participants: 1200,
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Mobile App Development",
    company: "Udemy",
    type: "course",
    location: "Online",
    duration: "12 weeks",
    description:
      "Learn to build native iOS and Android apps with React Native and Flutter.",
    requirements: ["Basic programming knowledge", "JavaScript"],
    deadline: "2024-03-10",
    posted: "2024-01-08",
    price: "89.99",
    remote: true,
    trending: true,
    enrolled: 8900,
    image:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const categories = [
  {
    name: "Internships",
    count: 150,
    icon: "💼",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Hackathons",
    count: 45,
    icon: "🚀",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Courses",
    count: 230,
    icon: "📚",
    color: "bg-green-100 text-green-800",
  },
];
