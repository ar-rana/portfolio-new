export const PATHS = {
    HOME: "/",
    ABOUT: "/about",
    BLOG: "/blog"
} as const

export type Path = keyof typeof PATHS
export type Page = typeof PATHS[Path]