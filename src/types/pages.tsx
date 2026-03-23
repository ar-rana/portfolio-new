import type { ReactNode } from "react";
import { PATHS, type Page } from ".";
import Home from "@/components/pages/Home";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import Projects from "@/components/pages/Projects";
import Blog from "@/components/pages/Blog";

export const PAGES: { value: Page; content: ReactNode }[] = [
  { value: PATHS.HOME, content: <Home /> },
  { value: PATHS.ABOUT, content: <About /> },
  { value: PATHS.BLOG, content: <Blog /> },
  { value: PATHS.WORK, content: <Projects /> },
  { value: PATHS.CONNECT, content: <Contact /> },
];
