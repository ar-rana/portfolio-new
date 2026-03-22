import { useState, type ReactNode } from "react";
import { certs } from "@/data/Certificates";

const loopedCerts = [...certs, ...certs];
const defaultScrollDurationSeconds = Math.max(26, certs.length * 5);

interface CertificatesCrouselProps {
  time?: number;
}

function renderIcon(icon: string | ReactNode, title: string) {
  if (typeof icon === "string") {
    return (
      <img
        src={icon}
        alt={`${title} icon`}
        className="h-[1em] w-auto shrink-0 object-contain"
        loading="lazy"
      />
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center [&_svg]:h-[1em] [&_svg]:w-auto">
      {icon}
    </span>
  );
}

export default function CertificatesCrousel({
  time = defaultScrollDurationSeconds,
}: CertificatesCrouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollDurationSeconds =
    Number.isFinite(time) && time > 0 ? time : defaultScrollDurationSeconds;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <style>
        {`
          @keyframes certificates-crousel-loop {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div
        className="flex w-max min-w-max items-center gap-6 whitespace-nowrap motion-reduce:animate-none"
        style={{
          animation: `certificates-crousel-loop ${scrollDurationSeconds}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {loopedCerts.map((cert, index) => (
          <a
            key={`${cert.title}-${index}`}
            href={cert.link}
            target="_blank"
            rel="noreferrer noopener"
            className="group/item inline-flex cursor-pointer items-center gap-1.5 text-sm leading-tight text-(--text-primary)"
            aria-label={cert.title}
          >
            {renderIcon(cert.icon, cert.title)}
            <span className="group-hover/item:underline">{cert.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
