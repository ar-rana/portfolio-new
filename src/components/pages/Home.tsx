import { TypingText } from "../sections/TypingText";

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-baseline gap-2 wrap-break-word text-left">
      <div>
        <span className="italic font-semibold">hello, </span>
        <TypingText />
      </div>
      <div aria-hidden className="h-2" />
      <div>
        <span>Originally from Himachal ⛰, raised in Delhi, and currently over the head deep in Computer Science.</span>
      </div>
      {/* <br /> */}
      <div>
        <span>I like distributed systems and building for scale using Java, TypeScript, and Go. <br /> Currently, I'm spending my time exploring <b>IoT</b>.</span>
      </div>
      <div aria-hidden className="h-2" />
      <div>
        <span>When I’m not spending an arguably unhealthy amount of time looking at code, I’m usually checking up on geopolitics, world affairs and defence updates to stay up-to-date with the world.</span>
      </div>
    </div>
  );
};

export default Home;
