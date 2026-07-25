import {
  CodeXml,
  Server,
  Database,
  Wrench,
  MonitorCog,
  Braces,
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    desc: "Interfaces & UX",
    icon: CodeXml,
    items: [
      "React",
      "Vite",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    desc: "APIs & Services",
    icon: Server,
    items: ["Node.js", "Express", "Django", "Firebase"],
  },
  {
    category: "Databases",
    desc: "Data Storage",
    icon: Database,
    items: ["MongoDB", "MySQL", "SQLite"],
  },
  {
    category: "DevOps",
    desc: "Deployment & Infra",
    icon: MonitorCog,
    items: ["Docker", "Nginx", "Cloudflare", "VPS Deployment", "Linux"],
  },
  {
    category: "Tools",
    desc: "Development Workflow",
    icon: Wrench,
    items: ["Git", "GitHub"],
  },
  {
    category: "Languages",
    desc: "Programming Languages",
    icon: Braces,
    items: ["JavaScript", "Python", "Java", "C/C++", "Bash", "GD Script"],
  },
];

export default skills;
