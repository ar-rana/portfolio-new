import type { BlogPanel } from "@/types";

interface BlogCardProps {
  blog: BlogPanel;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="flex h-full w-full flex-col rounded-xl border border-white/12 bg-white/[0.03] p-3">
      <div className="flex h-40 w-full items-center justify-center">
        <img
          src={blog.img}
          alt={blog.title}
          className="h-full w-full rounded-md object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-1.5 min-h-0">
        <p className="text-xs text-(--secondary)">{blog.date}</p>
        <h3 className="text-[1em] font-bold text-(--text-primary) overflow-hidden">
          {blog.title}
        </h3>
        {blog.desc ? (
          <p className="text-sm leading-normal text-(--secondary) overflow-hidden">
            {blog.desc}
          </p>
        ) : null}

        {blog.article_link ? (
          <a
            href={blog.article_link}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-auto ml-auto inline-flex items-center gap-1 text-sm text-(--text-primary)"
          >
            <i className="bi bi-file-earmark-text text-[1em]" aria-hidden="true" />
            <span className="group-hover:underline font-bold">Read</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
