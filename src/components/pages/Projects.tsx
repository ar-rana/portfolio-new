import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/ProjectData";
import ProjectCard from "@/components/sections/ProjectCard";
import CrouselNavigator from "../sections/CrouselNavigator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const WHEEL_INERTIA_FACTOR = 1.05;
const WHEEL_FRICTION_FACTOR = 0.1;
const WHEEL_STOP_THRESHOLD = 0.5;
const WHEEL_MAX_VELOCITY = 45;

const Projects = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelVelocityRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);

  const totalProjects = projects.length;

  useEffect(() => {
    if (!carouselApi) return;

    const updateActiveCard = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    updateActiveCard();
    carouselApi.on("select", updateActiveCard);
    carouselApi.on("reInit", updateActiveCard);

    return () => {
      carouselApi.off("select", updateActiveCard);
      carouselApi.off("reInit", updateActiveCard);
    };
  }, [carouselApi]);

  const scrollToCard = useCallback(
    (index: number) => {
      if (!carouselApi) return;
      carouselApi.scrollTo(index);
    },
    [carouselApi]
  );

  useEffect(() => {
    if (!carouselApi) return;

    const rootNode = carouselApi.rootNode();
    const engine = carouselApi.internalEngine();

    const animateWheelInertia = () => {
      const velocity = wheelVelocityRef.current;

      if (Math.abs(velocity) < WHEEL_STOP_THRESHOLD) {
        wheelVelocityRef.current = 0;
        wheelRafRef.current = null;
        return;
      }

      engine.scrollTo.distance(velocity, false);
      wheelVelocityRef.current *= WHEEL_FRICTION_FACTOR;
      wheelRafRef.current = window.requestAnimationFrame(animateWheelInertia);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0 && event.deltaX === 0) return;

      if (event.cancelable) {
        event.preventDefault();
      }

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      wheelVelocityRef.current -= delta * WHEEL_INERTIA_FACTOR;
      wheelVelocityRef.current = Math.max(
        -WHEEL_MAX_VELOCITY,
        Math.min(WHEEL_MAX_VELOCITY, wheelVelocityRef.current)
      );

      if (wheelRafRef.current === null) {
        wheelRafRef.current = window.requestAnimationFrame(animateWheelInertia);
      }
    };

    rootNode.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      rootNode.removeEventListener("wheel", onWheel);

      if (wheelRafRef.current !== null) {
        window.cancelAnimationFrame(wheelRafRef.current);
        wheelRafRef.current = null;
      }

      wheelVelocityRef.current = 0;
    };
  }, [carouselApi]);

  return (
    <section className="w-full">
      <CrouselNavigator
        currentIdx={activeIndex}
        totalLength={totalProjects}
        onScroll={scrollToCard}
      />

      <div
        className="max-h-[calc(100dvh-210px)] overflow-y-auto flex flex-col gap-4 md:hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-full h-[330px] shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "center",
          dragFree: true,
          skipSnaps: true,
        }}
        className="hidden md:block"
      >
        <CarouselContent className="-ml-5">
          {projects.map((project) => (
            <CarouselItem
              key={project.title}
              className="pl-5 basis-[450px] h-[330px]"
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Projects;
