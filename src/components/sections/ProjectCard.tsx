import type { ProjectPanel } from "@/types";

interface ProjectCardProps {
  project: ProjectPanel;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full w-full flex-col rounded-xl border border-white/12 bg-white/[0.03] p-3">
      <div className="flex h-40 w-full items-center justify-center">
        <img
          src={project.img}
          alt={project.title}
          className="h-full w-full rounded-md object-contain"
          loading="lazy"
        />
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-1.5 min-h-0">
        <h3 className="text-[1em] font-bold text-(--text-primary) overflow-hidden">
          {project.title}
        </h3>
        <p className="text-sm leading-normal text-(--secondary) overflow-hidden">
          {project.techStk}
        </p>
        <div className="mt-auto ml-auto flex items-center gap-3 text-sm">
          <a
            href={project.github}
            target="_blank"
            className="group inline-flex items-center gap-1 text-(--text-primary)"
          >
            <i className="bi bi-github text-[1em]" aria-hidden="true" />
            <span className="group-hover:underline font-bold">GitHub</span>
          </a>

          {project.project_link ? (
            <a
              href={project.project_link}
              target="_blank"
              className="group inline-flex items-center gap-1 text-(--text-primary)"
            >
              <i className="bi bi-browser-chrome text-[1em]" aria-hidden="true" />
              <span className="group-hover:underline font-bold">Live</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
