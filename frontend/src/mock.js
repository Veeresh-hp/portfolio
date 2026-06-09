// Mock data for Veeresh H P Portfolio
// This is the corrected version. Please replace your existing portfolioData object with this one.

export const portfolioData = {
  personal: {
    name: "Veeresh H P",
    title: "Aspiring Software Engineer",
    description: "Passionate about building scalable, high-performance systems to solve real-world problems with strong Python skills and solid foundation in OOP, DSA, and web development.",
    email: "veereshhp2004@gmail.com",
    phone: "+91 6361968505",
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/veereshhp",
    github: "https://github.com/Veeresh-hp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" // Professional headshot placeholder
  },

  education: [
    {
      id: 1,
      degree: "B.E. in Information Science and Engineering",
      institution: "SJB Institute of Technology",
      location: "Bengaluru",
      score: "CGPA: 8.2",
      year: "2022-2026",
      status: "completed"
    },
    {
      id: 2,
      degree: "Pre-University Course (PUC)",
      institution: "Sri Vyshnavi Chetana PU College",
      location: "Davanagere",
      score: "76.67%",
      year: "2020-2022",
      status: "completed"
    },
    {
      id: 3,
      degree: "10th Grade",
      institution: "B E A High School",
      location: "Davanagere",
      score: "89.6%",
      year: "2020",
      status: "completed"
    }
  ],

  skills: {
    languages: ["Python", "C", "Java (Basics)"],
    frontend: ["HTML", "CSS", "JavaScript", "React.js"],
    frameworks: ["Flask"],
    databases: ["MySQL", "MongoDB"],
    tools: ["VS Code", "Jupyter Notebook", "PyCharm", "Antigravity"],
    softSkills: ["Communication", "Decision-Making", "Adaptability", "Team Collaboration"]
  },

  projects: [
    {
      id: 1,
      title: "Video Transcript Summarizer",
      description: "YouTube transcript summarization tool using Flask and NLP techniques with LSA and abstractive models.",
      technologies: ["Python", "Flask", "NLP", "JavaScript"],
      features: [
        "Integrated language detection",
        "Flexible input handling",
        "Efficient text processing",
        "Responsive web interface"
      ],
      github: "https://github.com/Veeresh-hp/Video-Transcript-Summarizer",
      status: "completed",
      category: "Web Application",
      bgColor: "light-pink"
    },
    {
      id: 2,
      title: "Invoice OCR Web App",
      description: "OCR system using Flask and Tesseract to extract structured data from invoices with React.js frontend.",
      technologies: ["Python", "Flask", "OCR", "React.js", "Tesseract"],
      features: [
        "Interactive tables and PDF previews",
        "Image preview functionality",
        "Secure authentication",
        "User access control"
      ],
      github: "https://github.com/Veeresh-hp/INVOICE_GST",
      status: "completed",
      category: "Full Stack Application",
      bgColor: "mid-blue"
    },
    {
      id: 3,
      title: "BOLT - Breaking Obstacles with Lip-reading Technology",
      description: "Real-time lip-reading system using CNN + RNN (CTC), OpenCV, MediaPipe, and Tkinter GUI.",
      technologies: ["Python", "OpenCV", "Deep Learning", "CNN", "RNN", "NLTK", "MediaPipe"],
      features: [
        "Real-time lip-reading system",
        "NLP integration for grammar correction",
        "Data augmentation and transfer learning",
        "Plans for multilingual support"
      ],
      github: "https://github.com/Veeresh-hp/BOLT",
      status: "completed",
      category: "AI/ML Project",
      bgColor: "mid-purple"
    }
  ],

  certifications: [
    {
      id: 1,
      name: "The Joy of Computing Using Python",
      issuer: "SWAYAM",
      year: "2023",
      type: "programming",
      // Corrected to match the uploaded file exactly
      link: "/certificates/Python_Certificate.pdf"
    },
    {
      id: 2,
      name: "Database Management Systems",
      issuer: "SWAYAM",
      year: "2024",
      type: "database",
      // Corrected to match the uploaded file exactly
      link: "/certificates/DBMS_Certificate.pdf"
    },
    {
      id: 3,
      name: "Programming in Java",
      issuer: "SWAYAM",
      year: "2024",
      type: "programming",
      // Corrected to match the uploaded file exactly
      link: "/certificates/Java_Certificate.pdf"
    },
    {
      id: 4,
      name: "Postman API Fundamentals – Student Expert Certification",
      issuer: "Postman",
      year: "2025",
      type: "api",
      // Corrected to match the uploaded file `POSTMAN_Certificate.pdf` exactly
      link: "/certificates/POSTMAN_Certificate.pdf"
    },
    {
      id: 5,
      name: "Basics of Operating Systems",
      issuer: "Cisco Networking Academy",
      year: "2025",
      type: "systems",
      // Corrected to match the uploaded file exactly
      link: "/certificates/OS_BASICS_Certificate.pdf"
    },
    {
      id: 6,
      name: "TCS Salesforce Certification",
      issuer: "TCS",
      year: "2025",
      type: "cloud",
      link: "/certificates/Tcs_Salesforce_Certificate.pdf"
    }
  ],

  experience: [
    {
      id: 1,
      title: "Self-Directed Learning & Project Development",
      company: "Personal Projects",
      duration: "2022 - Present",
      type: "projects",
      description: "Developing various web applications and AI/ML projects to enhance technical skills and build a strong portfolio.",
      achievements: [
        "Built 3+ full-stack applications using Python and React.js",
        "Implemented machine learning models for real-world applications",
        "Gained expertise in NLP, OCR, and computer vision technologies"
      ]
    }
  ],

  socialLinks: {
    linkedin: "https://www.linkedin.com/in/veereshhp",
    github: "https://github.com/Veeresh-hp",
    email: "veereshhp2004@gmail.com",
    phone: "+91 6361968505"
  }
};

export default portfolioData;
