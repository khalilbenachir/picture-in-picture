import { useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  MediaController,
  MediaPosterImage,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeRange,
  MediaControlBar,
  MediaDurationDisplay,
  MediaFullscreenButton,
} from "media-chrome/dist/react";
import { useInView } from "react-intersection-observer";

const VideoPlayer = () => {
  const [pipIsForcedClose, setPipForcedClose] = useState(false);
  const mediaControllerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useInView({
    threshold: [0, 0.9, 1],
  });

  const isFloating = useMemo(() => {
    const isIntersecting = entry?.isIntersecting;
    const intersectionRatio = entry?.intersectionRatio || 0;

    if (isIntersecting && intersectionRatio > 0.9) {
      setPipForcedClose(false);
      return false;
    }

    if (pipIsForcedClose) return false;

    if (mediaControllerRef?.current?.hasAttribute("mediapaused")) return false;

    return true;
  }, [entry?.isIntersecting, entry?.intersectionRatio, pipIsForcedClose]);

  const onClose = () => {
    setPipForcedClose(true);
    if (mediaControllerRef?.current)
      mediaControllerRef.current?.querySelector("video")?.pause();
  };

  return (
    <div className="relative flex rounded-lg w-full" ref={ref}>
      <MediaController
        ref={mediaControllerRef}
        className={twMerge(
          "w-full z-10 overflow-clip rounded-lg",
          isFloating
            ? "fixed bottom-6 right-6 w-[300px] animate-videoFloating is-floating"
            : "relative animate-videoInline"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 h-8 w-8 bg-[#120918] px-2 rounded-lg hidden [.is-floating_&]:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 50 50"
            className="fill-white h-4 w-4"
          >
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
          </svg>
          <span className="sr-only">close picture in picture</span>
        </button>
        <video slot="media" src="https://www.w3schools.com/html/mov_bbb.mp4">
          Your browser does not support the video tag.
        </video>
        <MediaPosterImage slot="poster" />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaMuteButton />
          <MediaTimeRange />
          <MediaDurationDisplay />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default VideoPlayer;
