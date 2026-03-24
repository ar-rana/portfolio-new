import type { BlogPanel } from "@/types";

interface BlogCardProps {
  blog: BlogPanel;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 flex items-center justify-center">
      <img
        src={blog.img}
        alt={blog.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-black/45"
      />

      <div className=" mx-7 h-[80%] bottom-3 rounded-2xl border border-white/10 bg-black/10 p-4 backdrop-blur-md sm:p-5">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex items-start justify-between gap-3">
            {blog.article_link ? (
              <a
                href={blog.article_link}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-zinc-500"
              >
                <i
                  className="bi bi-journal text-sm text-black font-bold"
                  aria-hidden="true"
                />
                <span className="group-hover:underline font-bold text-zinc-500">
                  Read
                </span>
              </a>
            ) : null}
            <p className="text-right text-xs font-semibold leading-tight text-zinc-500">
              {blog.date}
            </p>
          </div>

          <h3 className="mt-1 text-[1.15em] font-bold leading-tight text-white">
            {blog.title}
          </h3>

          <p className="mt-1 flex-1 min-h-0 whitespace-pre-line text-xs leading-relaxed text-black font-thin">
            {blog.desc}
          </p>
        </div>
      </div>
    </article>
  );
}
