import Clock from "../sections/Clock/Clock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CertificatesCrousel from "../sections/CertificatesCrousel";

const About = () => {
  return (
    <div className="max-w-lg mx-auto flex flex-col items-baseline gap-2 wrap-break-word text-left">
      <Clock />

      <a
        href="https://github.com/ar-rana"
        target="_blank"
        className="group inline-flex items-center text-inherit"
        aria-label="ar-rana on GitHub"
      >
        <i
          className="bi bi-github mr-1 text-[1.25em] leading-none"
          aria-hidden="true"
          title="My GitHub Account"
        />
        <span className="inline-flex items-center border-b border-transparent group-hover:border-current">
          <span>@ar-rana</span>
          <i
            className="bi bi-arrow-up-right text-[13px] translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </a>

      <a
        href="https://www.linkedin.com/in/-aryan-rana/"
        target="_blank"
        className="group inline-flex items-center text-inherit"
        aria-label="-aryan-rana on LinkedIn"
      >
        <i
          className="bi bi-linkedin mr-1 text-[1.2em] leading-none"
          aria-hidden="true"
          title="Say hello on LinkedIn"
        />
        <span className="inline-flex items-center border-b border-transparent group-hover:border-current">
          <span>@-aryan-rana</span>
          <i
            className="bi bi-arrow-up-right text-[13px] translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </a>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex list-none cursor-pointer items-center">
              <i className="bi bi-fire mr-1 text-[1.2em]" aria-hidden="true" />
              <span>DSA</span>
              <i
                className="bi bi-chevron-down ml-1 text-[0.8em] transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={-4}
            className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg [&_svg]:bg-zinc-100! [&_svg]:fill-zinc-100!"
          >
            <div className="flex flex-col">
              <a
                href="https://leetcode.com/u/ar_rana/"
                target="_blank"
                className="group inline-flex items-center text-inherit"
                aria-label="-aryan-rana on LinkedIn"
              >
                <span className="font-semibold">LeetCode:&nbsp;</span>
                <span className="inline-flex items-center border-b border-transparent group-hover:border-current">
                  <span>@ar_rana</span>
                  <i
                    className="bi bi-arrow-up-right text-[10px] translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
              <a
                href="https://www.geeksforgeeks.org/profile/ar_rana/"
                target="_blank"
                className="group inline-flex items-center text-inherit"
                aria-label="-aryan-rana on LinkedIn"
              >
                <span className="font-semibold">GeeksForGeeks:&nbsp;</span>
                <span className="inline-flex items-center border-b border-transparent group-hover:border-current">
                  <span>@ar_rana</span>
                  <i
                    className="bi bi-arrow-up-right text-[10px] translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="h-2" />
      <a
        href="https://learn.microsoft.com/en-us/users/ar-rana/"
        target="_blank"
        className="group inline-flex items-center text-inherit"
      >
        <i
          className="bi bi-microsoft mr-1 text-[1em]"
          aria-hidden="true"
          title="My Learn account"
        />
        <span className="inline-flex items-center border-b border-transparent group-hover:border-current">
          <span>Microsoft Learn</span>
          <i
            className="bi bi-arrow-up-right text-[13px] translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </a>
      <div>
        <i
          className="bi bi-patch-check-fill mr-1 text-[1.2em]"
          aria-hidden="true"
        />
        <span>Certificates</span>
      </div>
      <CertificatesCrousel time={35} />
      <div>
        <i
          className="bi bi-mortarboard-fill mr-1 text-[1.2em]"
          aria-hidden="true"
        />
        <span>CGPA: 9.09/10</span>
      </div>
    </div>
  );
};

export default About;
