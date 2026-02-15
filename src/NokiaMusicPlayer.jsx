import React, { useEffect, useRef, useState, useCallback } from "react";

const musicVideos = [
  "dQw4w9WgXcQ",
  "kJQP7kiw5Fk",
  "RgKAFK5djSk",
  "kXYiU_JCYtU",
  "dvgZkm1xWPE",
  "3tmd-ClpJxA",
  "JGwWNGJdvx8",
  "CevxZvSJLk8",
  "fLexgOxsZu0",
  "60ItHLz5WEA",
  "OPf0YbXqDm0",
  "09R8_2nJtjg",
  "lp-EO5I60KA",
  "YqeW9_5kURI",
  "hLQl3WQQoQ0",
];

export default function NokiaMusicPlayer() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const [glitchText, setGlitchText] = useState("(n.r)andom");
  const [time, setTime] = useState("");

  const getRandomVideo = useCallback(
    () => musicVideos[Math.floor(Math.random() * musicVideos.length)],
    []
  );

  const playRandomVideo = useCallback(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      const randomVideo = getRandomVideo();
      playerRef.current.loadVideoById(randomVideo);
      playerRef.current.mute();
      playerRef.current.playVideo();
    }
  }, [getRandomVideo]);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: getRandomVideo(),
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          mute: 1, // start muted
        },
        events: {
          onReady: (event) => {
            event.target.mute(); // ensure muted
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              playRandomVideo();
            }
          },
        },
      });
    };
  }, [getRandomVideo, playRandomVideo]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = "(n.r)andom".split("");
      chars[Math.floor(Math.random() * chars.length)] = String.fromCharCode(
        33 + Math.floor(Math.random() * 94)
      );
      setGlitchText(chars.join(""));
    }, 120);

    const timeInterval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }, 1000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#A1D490",
        color: "#0B3D0B",
        fontFamily: "Courier New, monospace",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "14px",
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        {glitchText}
      </div>

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1px",
            alignItems: "flex-end",
            height: "10px",
          }}
        >
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: "3px",
                height: `${level * 3}px`,
                backgroundColor: "#0B3D0B",
              }}
            />
          ))}
        </div>

        <div
          style={{
            width: "18px",
            height: "10px",
            border: "2px solid #0B3D0B",
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "100%",
              backgroundColor: "#0B3D0B",
            }}
          />
          <div
            style={{
              width: "2px",
              height: "6px",
              backgroundColor: "#0B3D0B",
              position: "absolute",
              right: "-4px",
              top: "2px",
            }}
          />
        </div>

        <div>{time}</div>
      </div>

      <div
        ref={containerRef}
        style={{
          width: "90vw",
          maxWidth: "640px",
          aspectRatio: "16 / 9",
          border: "4px solid #0B3D0B",
          boxShadow: "inset 0 0 6px #0B3D0B",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={playRandomVideo}
        style={{
          padding: "10px 20px",
          backgroundColor: "#7BB678",
          color: "#0B3D0B",
          border: "3px solid #0B3D0B",
          fontFamily: "Courier New, monospace",
          cursor: "pointer",
          fontSize: "14px",
          boxShadow: "inset 0 0 4px #0B3D0B",
        }}
      >
        Random
      </button>
    </div>
  );
}
