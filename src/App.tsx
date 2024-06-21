import { twMerge } from "tailwind-merge";

import VideoPlayer from "./video-player";

function App() {
  return (
    <main className="min-h-screen px-6 py-7 grid place-items-center">
      <section className="flex flex-col gap-5 max-w-5xl">
        <div className="flex flex-col gap-6">
          <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl text-white text-center font-semibold">
            Custom Picture in Picture
          </h1>
          <p className="text-white text-xl opacity-80 text-balance text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            illum illo obcaecati placeat odit, optio consequatur quis sunt
            impedit! Dignissimos cumque distinctio possimus quae nostrum magni
            molestias impedit labore odio.
          </p>
        </div>
        <VideoPlayer />
        {new Array(10).fill(1).map((item, index) => {
          return (
            <div
              key={`item-${index + item}`}
              className={twMerge(
                "rounded-md w-full leading-relaxed",
                Math.random() > 0.5 ? "h-48 bg-[#201726]" : "h-20 bg-[#201720]"
              )}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
