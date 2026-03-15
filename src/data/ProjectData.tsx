import type { ProjectPanel } from "@/types";
const incEdu = "/projects/inc_p.png";
const sportsManage = "/projects/sportsM.png";
const algoVis = "/projects/algovis.png";
const tweet = "/projects/tweet.png";
const spring = "/projects/spring.png";
const chatApp = "/projects/chatApp.png";
const board = "/projects/board.png";
const defaultImg = "/projects/defaultImg.png";
const ecommerce = "/projects/ecommerce.png";
const disasterSys = "/projects/disasterSys.png";
const scribeAI = "/projects/scribeAI.png";

export const projects: ProjectPanel[] = [
  {
    title: "Enterprise E-Commerce Application",
    techStk:
      "React, Spring Boot, Firestore, Redis, JUnit, Spring Data JPA, PostgreSQL",
    github: "https://github.com/ar-rana/E-Commerce",
    img: ecommerce,
  },
  {
    title: "Disaster Relief System",
    techStk:
      "React, Spring Boot, Redis, RabbitMQ, Spring Data JPA, PostgreSQL, Spring AI, OpenStreetMap, GraphHopper",
    github: "https://github.com/ar-rana/Disaster-Relief-System",
    img: disasterSys,
  },
  {
    title: "ScribeAI",
    techStk:
      "Next.js, XState, Node.js, Express, Socket.io, RabbitMQ, PostgreSQL, Prisma, Better Auth, TailwindCSS, Gemini API",
    github: "https://github.com/ar-rana/ScribeAI",
    img: scribeAI,
  },
  {
    title: "Collaborative Whiteboard",
    techStk: "React, HTML Canvas, Spring Boot, STOMP Websockets, Redis",
    github: "https://github.com/ar-rana/Whiteboard-App",
    img: board,
  },
  {
    title: "ChatApp-2.0 (Scalable Chat Application)",
    techStk:
      "Next.js v14, TailwindCSS, Socket.io, Node.js, ExpressJS, Redis, Kafka, Prisma, PostgreSQL, OAuth",
    github: "https://github.com/ar-rana/ChatApp-2.0",
    img: chatApp,
  },
  {
    title: "Spring Search",
    techStk: "React, Modular CSS, Spring Boot, Spring AI, Ollama, OAuth",
    github: "https://github.com/ar-rana/SpringSearch",
    img: spring,
    project_link: "https://spring-search.vercel.app/",
  },
  {
    title: "Pathfinding Algorithm Visualizer",
    techStk: "HTML, CSS, Javascript",
    github: "https://github.com/ar-rana/Path-Visualizer",
    img: algoVis,
    project_link:
      "https://path-visualizer-git-main-aryan-ranas-projects.vercel.app/",
  },
  {
    title: "Twitter Clone",
    techStk: "NextJs, Firebase Storage & Firestore, TailwindCSS",
    github: "https://github.com/ar-rana/twitter_clone",
    img: tweet,
    project_link: "https://twitter-rho-one.vercel.app/",
  },
  {
    title: "Sports Management Portal",
    techStk: "React, Firebase Storage & Firestore, ExpressJs, Node.js",
    github: "https://github.com/ar-rana/Sports-Management-Portal",
    img: sportsManage,
    project_link: "https://sports-management-portal.vercel.app/",
  },
  {
    title: "Employee Management System",
    techStk: "Spring Web MVC, Jakarta Server Pages(JSP), JDBC Template, MySQL",
    github: "https://github.com/ar-rana/Employee-Management-System",
    img: defaultImg,
  },
  // {
  //   title: "Monster Hunter - Arcade Game",
  //   techStk: "HTML, CSS, JS",
  //   github: "https://github.com/ar-rana/MonsterHunter",
  //   img: mhag,
  //   project_link: "https://monster-hunter-aryan-ranas-projects.vercel.app/",
  // },
  {
    title: "Inclusive Education Website",
    techStk: "HTML, CSS",
    github: "https://github.com/ar-rana/Inclusive-Education-Frontend-Website",
    img: incEdu,
    project_link: "https://inclusive-education-frontend-website.vercel.app/",
  },
];
