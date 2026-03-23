// Maintain the order of values inside TABS and PATHS otherwise the the navigation gets messed up
// Like if 'WORK' is 2nd index in PATHS then it should be 2nd index in TABS also 
export const PATHS = {
  HOME: "/",
  ABOUT: "/know-more",
  WORK: "/projects",
  BLOG: "/blog",
  CONNECT: "/contact",
} as const;

export const TABS = [
  { value: PATHS.HOME, label: "Home" },
  { value: PATHS.ABOUT, label: "More" },
  { value: PATHS.WORK, label: "Projects" },
  { value: PATHS.BLOG, label: "Writing" },
  { value: PATHS.CONNECT, label: "Contact" },
];

export type Path = keyof typeof PATHS;
export type Page = (typeof PATHS)[Path];
export interface ProjectPanel {
  title: string;
  techStk: string;
  github: string;
  img: string;
  project_link?: string;
}

export interface BlogPanel {
  title: string;
  date: string;
  desc?: string;
  img: string;
  article_link?: string;
}
