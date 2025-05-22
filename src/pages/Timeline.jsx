import Time from '../components/time';
import Starfield from '../components/Starfield'
const projects = [
  {
    title: "🏙️ Smart City Backend",
    description: "Python backend for a smart city dashboard with biomedical imaging and waste classification.",
    tech: "Python, Flask, REST APIs, Image Processing",
    link: "https://github.com/rasram/smart-city-backend",
    semester:"4"
  },
  {
    title: "🤖 KinematicLab",
    description: "Simulates forward and inverse kinematics for robotic arm control and path analysis.",
    tech: "Python, NumPy, Matplotlib",
    link: "https://github.com/JayanSubramanian/KinematicLab",
    semester:"4"
  },
  {
    title: "💬 MURBURN Chatbot",
    description: "AI chatbot inspired by the Murburn concept using NLP for intelligent dialogue.",
    tech: "Python, NLP, Transformers",
    link: "https://github.com/smadhiva/MURBURN-CHATBOT",
    semester:"4"
  },
  {
    title: "🌐 Crypto Pulse – Web Design",
    description: "Responsive UI for a fictional crypto trading platform with dashboards and FAQ.",
    tech: "HTML, CSS, JavaScript",
    link: "https://github.com/smadhiva/WEB-DESIGN",
    semester:"2"
  },
  {
    title: "⚖️ Nyaya Sethu – GenAI Hackathon",
    description: "AI legal advisor with RAG to answer legal queries and analyze documents/images.",
    tech: "React, Vite, Python, LangChain, Pinecone",
    link: "https://github.com/Twinn-github09/GenAI-hackathon",
    semester:"3"
  },
  {
    title: "🖥️ Smart City Frontend",
    description: "Frontend for smart city dashboard using React and Tailwind for UI data visualization.",
    tech: "React, TypeScript, Tailwind CSS, Vite",
    link: "https://github.com/JayanSubramanian/SmartCityFrontend",
    semester:"4"
  },
  {
    title: "🧮 Hybrid Processor",
    description: "Experimental architecture combining traditional and hybrid logic processing.",
    tech: "C / Verilog (please confirm)",
    link: "https://github.com/smadhiva/Hybrid-Processor",
    semester:"2"
  },
  {
    title: "📊 Kernel Regression in Java",
    description: "Non-parametric regression using kernel methods in Java demonstrating ML concepts.",
    tech: "Java, Machine Learning, Statistics",
    link: "https://github.com/smadhiva/KERNEL-REGRESSION-JAVA",
    semester:"2"
  },
  {
    title: "🧠 NTK – Neural Tangent Kernel",
    description: "Explores NTK theory and deep learning dynamics with visual simulations and analysis.",
    tech: "Python, NumPy, Research Report",
    link: "https://github.com/smadhiva/NTK",
    semester:"2"
  },
];

export default function Timeline() {
  return (
    <div className="timeline-wrapper">
      <h1 className="timeline-title" >Project Timeline</h1>
      <Time projects={projects} />
    </div>
  );
}
