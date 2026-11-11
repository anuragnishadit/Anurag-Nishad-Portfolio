// Optional: npm run seed  -> adds the resume projects to MongoDB
require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Project.create([
    { title: "Student Management Dashboard", tech: ["MongoDB","Express.js","React.js","Node.js","CRUD Operations"],
      description: "A student management dashboard built with the MERN stack, with CRUD operations to add, view, update and delete student records." },
    { title: "Online Medical Store", tech: ["ASP.NET","HTML5","CSS3","JavaScript","SQL Server"],
      description: "An online medical store web application built with ASP.NET, with user login, product management and CRUD operations, using SQL Server for data management." },
    { title: "E-Commerce Website", tech: ["HTML5","CSS3","JavaScript"],
      description: "An e-commerce website with product listing, homepage and navigation in a modern UI, with interactive components and smooth navigation." },
  ]);
  console.log("Seeded projects"); process.exit(0);
})();
