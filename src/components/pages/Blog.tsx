import { useCallback, useEffect, useRef, useState } from "react";
import { blogs } from "@/data/BlogData";
import BlogCard from "@/components/sections/BlogCard";
import CrouselNavigator from "../sections/CrouselNavigator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const WHEEL_INERTIA_FACTOR = 1.05;
const WHEEL_FRICTION_FACTOR = 0.1;

const Blog = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelVelocityRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);

  const totalBlogs = blogs.length;

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

      if (Math.abs(velocity) < 0.1) {
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
        -45,
        Math.min(45, wheelVelocityRef.current)
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
        totalLength={totalBlogs}
        onScroll={scrollToCard}
      />

      <div
        className="max-h-[calc(100dvh-210px)] overflow-y-auto flex flex-col gap-4 md:hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {blogs.map((blog) => (
          <div
            key={`${blog.title}-${blog.date}`}
            className="w-full h-[330px] shrink-0"
          >
            <BlogCard blog={blog} />
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
          {blogs.map((blog) => (
            <CarouselItem
              key={`${blog.title}-${blog.date}`}
              className="pl-5 basis-[450px] h-[330px]"
            >
              <BlogCard blog={blog} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Blog;
