"use client";
import * as React from "react";
import Image from "next/image";

export function HeroMP4({ src, poster }: { src?: string; poster: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = React.useState(false);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {
      // Autoplay blocked — poster will remain visible.
    });
  }, []);

  // No video source provided — render poster image only.
  if (!src) {
    return (
      <div className="absolute inset-0 -z-10">
        <Image src={poster} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      </div>
    );
  }

  // Video failed to load — fallback to poster.
  if (videoFailed) {
    return (
      <div className="absolute inset-0 -z-10">
        <Image src={poster} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        aria-hidden
        onError={() => setVideoFailed(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
    </div>
  );
}
