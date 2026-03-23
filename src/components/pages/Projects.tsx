import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { projects } from "@/data/ProjectData";
import ProjectCard from "@/components/sections/ProjectCard";
import CrouselNavigator from "../sections/CrouselNavigator";

const DESKTOP_BREAKPOINT = 768;
const WHEEL_INERTIA_FACTOR = 1.05;
const WHEEL_FRICTION_FACTOR = 0.1;
const WHEEL_STOP_THRESHOLD = 0.5;
// const WHEEL_SCROLL_EASING = 0.2;
// const DOT_SCROLL_EASING = 0.11;

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wheelTargetRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);
//   const scrollEasingRef = useRef(WHEEL_SCROLL_EASING);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const totalProjects = projects.length;

  const updateViewportMode = useCallback(() => {
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
  }, []);

  const updateActiveCenterCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !isDesktop) return;

    const containerRect = container.getBoundingClientRect();
    const viewportCenter = containerRect.left + container.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, [isDesktop]);

  useEffect(() => {
    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
  }, [updateViewportMode]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isDesktop) return;

    updateActiveCenterCard();
    const handleScroll = () => {
      updateActiveCenterCard();
      if (wheelRafRef.current === null) {
        wheelTargetRef.current = container.scrollLeft;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop, updateActiveCenterCard]);

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const nextLeft =
      container.scrollLeft +
      (cardRect.left - containerRect.left) -
      (container.clientWidth - cardRect.width) / 2;
    const maxLeft = container.scrollWidth - container.clientWidth;
    const boundedLeft = Math.max(0, Math.min(maxLeft, nextLeft));
    wheelTargetRef.current = boundedLeft;
    // scrollEasingRef.current = DOT_SCROLL_EASING;

    if (wheelRafRef.current === null) {
      wheelRafRef.current = window.requestAnimationFrame(animateWheelScroll);
    }

    setActiveIndex(index);
  };

  const animateWheelScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) {
      wheelRafRef.current = null;
      return;
    }

    const current = container.scrollLeft;
    const target = wheelTargetRef.current;
    const next = current + (target - current) * WHEEL_FRICTION_FACTOR;

    if (Math.abs(target - current) < WHEEL_STOP_THRESHOLD) {
      container.scrollLeft = target;
      wheelRafRef.current = null;
    //   scrollEasingRef.current = WHEEL_SCROLL_EASING;
      return;
    }

    container.scrollLeft = next;
    wheelRafRef.current = window.requestAnimationFrame(animateWheelScroll);
  }, []);

  const handleWheelScroll = useCallback(
    (e: globalThis.WheelEvent) => {
      if (!isDesktop) return;
      const container = scrollRef.current;
      if (!container) return;
      if (e.deltaY === 0 && e.deltaX === 0) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // scrollEasingRef.current = WHEEL_SCROLL_EASING;
      const maxLeft = container.scrollWidth - container.clientWidth;
      const nextTarget = wheelTargetRef.current + delta * WHEEL_INERTIA_FACTOR;
      wheelTargetRef.current = Math.max(0, Math.min(maxLeft, nextTarget));

      if (wheelRafRef.current === null) {
        wheelRafRef.current = window.requestAnimationFrame(animateWheelScroll);
      }
    },
    [animateWheelScroll, isDesktop]
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (event: globalThis.WheelEvent) => {
      handleWheelScroll(event);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [handleWheelScroll]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    wheelTargetRef.current = container.scrollLeft;
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (wheelRafRef.current !== null) {
        window.cancelAnimationFrame(wheelRafRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full">
      <CrouselNavigator currentIdx={activeIndex} totalLength={totalProjects} onScroll={scrollToCard} />

      <div
        ref={scrollRef}
        className="max-h-[calc(100dvh-210px)] overflow-y-auto md:max-h-none md:overflow-y-hidden flex flex-col md:flex-row gap-4 md:gap-5 md:overflow-x-auto md:overscroll-contain md:pb-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          aria-hidden
          className="hidden md:block w-[max(0px,calc(50%-350px))] shrink-0"
        />
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="w-full md:w-[450px] md:h-[330px] shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
        <div
          aria-hidden
          className="hidden md:block w-[max(0px,calc(50%-350px))] shrink-0"
        />
      </div>
    </section>
  );
};

export default Projects;
