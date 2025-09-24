import React from "react";

interface VideoThumbnailProps {
  title: string;
  videoId: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ title, videoId }) => (
  <a
    href={`https://www.youtube.com/watch?v=${videoId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
  >
    <div className="relative">
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="rounded-lg w-full aspect-video object-cover transition"
      />
      <span className="absolute inset-0 rounded-lg bg-black/40 shadow-lg"></span>
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.92)" />
          <polygon points="22,18 22,38 40,28" fill="#111" />
        </svg>
      </span>
    </div>
    <div className="mt-2 font-semibold text-center">{title}</div>
  </a>
);

export default VideoThumbnail;
