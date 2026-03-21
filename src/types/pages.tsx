import type { ReactNode } from "react";
import { PATHS, type Page } from ".";
import Home from "@/components/pages/Home";

export const PAGES: { value: Page; content: ReactNode }[] = [
  { value: PATHS.HOME, content: <Home /> },
  { value: PATHS.ABOUT, content: <>About</> },
  { value: PATHS.BLOG, content: <>Writing</> },
  { value: PATHS.WORK, content: <>Projects</> },
  { value: PATHS.CONNECT, content: <>Contact</> },
];
