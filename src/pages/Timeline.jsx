import React from "react";
import Times from "../components/Times";
import "../styles/Timeline.css";
import Butterfly from "../components/ButterflyCanvas"
const projects = [
  {
    title: "🏙️ Smart City Backend",
    semester:"Semester:4",
    description: "Python backend for a smart city dashboard with biomedical imaging and waste classification.",
    tech: "Python, Flask, REST APIs, Image Processing",
    link: "https://github.com/rasram/smart-city-backend",
  },
  {
    title: "🤖 KinematicLab",
    semester:"Semester:4",
    description: "Simulates forward and inverse kinematics for robotic arm control and path analysis.",
    tech: "Python, NumPy, Matplotlib",
    link: "https://github.com/JayanSubramanian/KinematicLab",
  },
  {
    title: "💬 MURBURN Chatbot",
    semester:"Semester:4",
    description: "AI chatbot inspired by the Murburn concept using NLP for intelligent dialogue.",
    tech: "Python, NLP, Transformers",
    link: "https://github.com/smadhiva/MURBURN-CHATBOT",
  },
  {
    title: "🌐 Crypto Pulse – Web Design",
    semester:"Semester:2",
    description: "Responsive UI for a fictional crypto trading platform with dashboards and FAQ.",
    tech: "HTML, CSS, JavaScript",
    link: "https://github.com/smadhiva/WEB-DESIGN",
  },
  {
    title: "⚖️ Nyaya Sethu – GenAI Hackathon",
    semester:"Semester:4",
    description: "AI legal advisor with RAG to answer legal queries and analyze documents/images.",
    tech: "React, Vite, Python, LangChain, Pinecone",
    link: "https://github.com/Twinn-github09/GenAI-hackathon",
  },
  {
    title: "🖥️ Smart City Frontend",
    semester:"Semester:4",
    description: "Frontend for smart city dashboard using React and Tailwind for UI data visualization.",
    tech: "React, TypeScript, Tailwind CSS, Vite",
    link: "https://github.com/JayanSubramanian/SmartCityFrontend",
  },
  {
    title: "🧮 Hybrid Processor",
    semester:"Semester:2",
    description: "Experimental architecture combining traditional and hybrid logic processing.",
    tech: "Designing the Processor",
    link: "https://github.com/smadhiva/Hybrid-Processor",
  },
  {
    title: "📊 Kernel Regression in Java",
    semester:"Semester:2",
    description: "Non-parametric regression using kernel methods in Java demonstrating ML concepts.",
    tech: "Java, Machine Learning, Statistics",
    link: "https://github.com/smadhiva/KERNEL-REGRESSION-JAVA",
  },
  {
    title: "🧠 NTK – Neural Tangent Kernel",
    semester:"Semester:2",
    description: "Explores NTK theory and deep learning dynamics with visual simulations and analysis.",
    tech: "Python, NumPy, Research Report",
    link: "https://github.com/smadhiva/NTK",
  },
];

export default function Help() {
  return (
    <div className="help-container">
      <h1 className="help-title">My Projects Timeline</h1>
      <Times projects={projects} />
      <div className="butterfly-container butterfly-1">
  <Butterfly />
</div>
<div className="butterfly-container butterfly-2">
  <Butterfly />
</div>
<div className="butterfly-container butterfly-3">
  <Butterfly />
</div>
<div className="butterfly-container butterfly-4">
  <Butterfly />
</div>

    </div>
  );
}
