import type React from "react";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_STRINGS = [
  "I'm Aryan Rana",
  "I'm a fullstack engineer",
  "a CS Engineering student",
];

type TypingTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  strings?: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  showCursor?: boolean;
  cursorChar?: string;
};

export function TypingText({
  strings,
  typingSpeedMs = 110,
  deletingSpeedMs = 55,
  pauseMs = 900,
  showCursor = true,
  cursorChar = "|",
  className,
  ...rest
}: TypingTextProps) {
  const activeStrings = useMemo(() => {
    if (strings && strings.length > 0) {
      return strings;
    }
    return DEFAULT_STRINGS;
  }, [strings]);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const listKey = useMemo(() => activeStrings.join("||"), [activeStrings]);

  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setIsDeleting(false);
  }, [listKey]);

  useEffect(() => {
    const current = activeStrings[index] ?? "";

    if (!isDeleting && subIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % activeStrings.length);
      return;
    }

    const delay = isDeleting ? deletingSpeedMs : typingSpeedMs;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    activeStrings,
    deletingSpeedMs,
    index,
    isDeleting,
    pauseMs,
    subIndex,
    typingSpeedMs,
  ]);

  const text = (activeStrings[index] ?? "").substring(0, subIndex);

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap ${
        className ?? ""
      }`}
      {...rest}
    >
      <span className="whitespace-pre">{text}</span>
      {showCursor ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block align-baseline leading-none animate-pulse relative -top-[1px]"
        >
          {cursorChar}
        </span>
      ) : null}
    </span>
  );
}
