export const PATHS = {
    HOME: "/",
    ABOUT: "/about",
    BLOG: "/blog"
} as const

export type Path = keyof typeof PATHS
export type Page = typeof PATHS[Path]

export const TABS = [
    { value: PATHS.HOME, label: "Home" },
    { value: PATHS.ABOUT, label: "About" },
    { value: PATHS.BLOG, label: "Writings" },
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
