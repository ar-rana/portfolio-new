export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  WORK: "/projects",
  CONNECT: "/contact",
} as const;

export type Path = keyof typeof PATHS;
export type Page = (typeof PATHS)[Path];

export const TABS = [
  { value: PATHS.HOME, label: "Home" },
  { value: PATHS.ABOUT, label: "About" },
  { value: PATHS.BLOG, label: "Writing" },
  { value: PATHS.WORK, label: "Projects" },
  { value: PATHS.CONNECT, label: "Contact" },
];
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
