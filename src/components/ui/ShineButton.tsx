import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ShineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ShineButton({
  children,
  className = "",
  ...props
}: ShineButtonProps) {
  return (
    <button
      className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-transparent px-6 text-sm font-medium text-(--text-primary) transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 top-[-45%] h-[190%] w-4 rotate-[24deg] bg-white/55 opacity-0 blur-[0.5px] transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
      />
    </button>
  );
}
