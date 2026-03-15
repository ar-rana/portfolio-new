import type { BlogPanel } from "@/types";
const RD = "/blogs/rd.png";
const article = "/blogs/article.jpg";

export const blogs: BlogPanel[] = [
  {
    title:
      "A Novel Task Scheduling Algorithm in Heterogeneous Multi-cloud Environment",
    date: "22 November, 2024",
    desc: "The Proposed 2-phased algorithm for cloud task scheduling.",
    img: RD,
    article_link: "https://link.springer.com/chapter/10.1007/978-981-97-7880-5_13",
  },
  {
    title:
      "A survey on cloud computing security: Challenges, issues and solutions",
    date: "9 August, 2025",
    desc: "Discussed Cloud Architecture, service, types of cloud and analyzed Cloud Security Concerns, proposed 4-5 potential solutions to improve Data Integrity",
    img: RD,
    article_link: "https://link.springer.com/chapter/10.1007/978-3-031-91798-1_17"
  },
  // articles start
  {
    title: "Essential System Design Concepts",
    date: "25 July, 2025",
    desc: `Here we talk about system design concepts and their uses cases by taking an example of a growing ecommerce application. 
      We discuss about vertical scaling, horizontal scaling, CAP theorem, load balancing, caching, sharding and many more concept including what makes a good design.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/essential-system-design-concepts-6bc4282f44ce",
  },
  {
    title: "The OSI and TCP/IP Reference Models",
    date: "11 July, 2025",
    desc: `In this article we discuss about the all the seven layers in the OSI Reference Model and in the TCP/IP Reference Model. 
      We also go through a brief difference between these model and their significance.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/the-osi-and-tcp-ip-reference-models-c989bbde1d2a",
  },
  {
    title: "What are Compilers and Interpreters?",
    date: "20 June, 2025",
    desc: `We discuss in detail about what are compilers and the process of your source code being converted to executals in a compiled language. 
      We also discuss about what are interpreters, what is JIT compilation and how is it fater the plain interpreted languages.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/what-are-compilers-interpreters-650b7d2826ae",
  },
  {
    title: "A detailed overview of Microservices",
    date: "22 March, 2025",
    desc: `Talks about microservices architecture, its diffrent components and design pattern. Also goes through the difference between a microservice and monolithis architecture. 
      Along with the advantages and disabvantage of following this pattern.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/a-detailed-overview-of-microservices-d5f4a4f50220",
  },
  {
    title: "How does Kafka architecture work?",
    date: "21 March, 2025",
    desc: `Discusses what is event streaming? and how different Kafka objects communicate with each other to form a hybrid system 
      that can act as a publisher-subscriber and a Queue model. Also goes through the APIs involved in achieving this type of architecture.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/how-does-kafka-architecture-work-e3d8bb8ee7e9",
  },
  {
    title: "8 Common Architectural Patterns",
    date: "20 March, 2025",
    desc: `Discusses about the following software architectural patterns; Monolithic Architecture, Microservices Architecture, Event-Driven Architecture, 
      Microkernel Architecture, Layered Architecture, Client-Server Architecture, Peer-to-Peer Architecture and Hybrid Architecture.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/8-common-architectural-patterns-6e475b820df8",
  },
  {
    title: "A Brief Overview of Docker",
    date: "19 March, 2025",
    desc: `A article on why we used docker?, what problme does docker solve and how we solved this problem before docker's existance. 
      It also briefly discusses the docker architecture and it components.`,
    img: article,
    article_link: "https://medium.com/@ar_rana/a-brief-overview-of-docker-32679b9a4d05",
  },
];
