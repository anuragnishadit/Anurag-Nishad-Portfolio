// ALL portfolio text lives here (taken from the latest resume). Edit freely.
export const profile = {
  name: "Anurag Nishad",
  titles: ["MERN Stack Developer", "Frontend Developer", "Web Developer"],
  phone: "+91 74598 40858",
  email: "anuragnishad102@gmail.com",
  location: "Sultanpur, Uttar Pradesh, India",
  photo: "/images/profile.jpeg",                 // replace this file to change the photo
  resume: "/resume/Anurag_Nishad_Resume.pdf",    // replace this file to update the resume
  linkedin: "https://www.linkedin.com/in/anurag-nishad-b77149372",                                  // TODO: paste real LinkedIn URL
  github: "https://github.com/anuragnishadit",                                    // TODO: paste real GitHub URL
  summary: "Passionate and motivated MERN Stack Developer with hands-on experience in building responsive and user-friendly web applications. Skilled in React.js, Node.js, Express.js, MongoDB, JavaScript, HTML, CSS, and REST APIs. Eager to contribute to innovative projects while continuously learning and growing as a Full Stack Developer.",
};
export const experience = [
  { role: "MERN Stack Developer Intern", company: "SkillManthan Technologies Pvt. Ltd., Lucknow", period: "June 2026 – Present",
    points: ["Developed responsive web applications using React.js.", "Built REST APIs using Node.js and Express.js.", "Integrated MongoDB for CRUD operations.", "Collaborated on real-world MERN Stack projects.", "Used Git and GitHub for version control."] },
  { role: "Industrial Trainee – ASP.NET", company: "DigiCoders Technologies Pvt. Ltd., Lucknow", period: "June 2025 – July 2025",
    points: ["Completed industrial training in ASP.NET, HTML5, CSS3, and JavaScript.", "Developed responsive and user-friendly web pages using HTML, CSS, and JavaScript."] },
];
export const skills = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Web Design"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST API Development"] },
  { group: "Database", items: ["MongoDB"] },
  { group: "Tools", items: ["Git & GitHub"] },
];
export const education = [
  { level: "Diploma", title: "Diploma in Information Technology", place: "Govt. Polytechnic Aurai, Bhadohi", loc: "Uttar Pradesh", year: "2023 – 2026", icon: "grad" },
  { level: "Class XII", title: "Higher Secondary (Class XII)", place: "S B R S S S I College", loc: "Pakarpur, Sultanpur", year: "2023", icon: "book" },
  { level: "Class X", title: "High School (Class X)", place: "S B R S S S I College", loc: "Pakarpur, Sultanpur", year: "2021", icon: "school" },
];
// Shown when the database has no projects yet. liveUrl/githubUrl empty = button shows "coming soon".
export const defaultProjects = [
  { _id: "d1", title: "Student Management Dashboard", tech: ["MongoDB", "Express.js", "React.js", "Node.js", "CRUD Operations"], liveUrl: "", githubUrl: "",
    description: "A student management dashboard built with the MERN stack, with CRUD operations to add, view, update and delete student records." },
  { _id: "d2", title: "Online Medical Store", tech: ["ASP.NET", "HTML5", "CSS3", "JavaScript", "SQL Server"], liveUrl: "", githubUrl: "",
    description: "An online medical store web application built with ASP.NET, with user login, product management and CRUD operations, using SQL Server for data management." },
  { _id: "d3", title: "E-Commerce Website", tech: ["HTML5", "CSS3", "JavaScript"], liveUrl: "", githubUrl: "",
    description: "An e-commerce website with product listing, homepage and navigation in a modern UI, with interactive components and smooth navigation." },
];
