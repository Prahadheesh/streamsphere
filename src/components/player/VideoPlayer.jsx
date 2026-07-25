import { useEffect, useRef, useState, useCallback } from "react";
import "./VideoPlayer.css";
import PlayerControls from "./PlayerControls";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function VideoPlayer({ media }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const hideTimer = useRef(null);

  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [volume, setVolume] = useState(1);

  const [muted, setMuted] = useState(false);

  const [playbackRate, setPlaybackRate] = useState(1);

  const [fullscreen, setFullscreen] = useState(false);

  const [theaterMode, setTheaterMode] = useState(false);

  const [controlsVisible, setControlsVisible] = useState(true);

  const [loading, setLoading] = useState(true);

  const storageKey = `watch-${media.id}`;

  const showControls = useCallback(() => {
    setControlsVisible(true);

    clearTimeout(hideTimer.current);

    if (playing) {
      hideTimer.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  }, [playing]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const seekForward = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = Math.min(
      video.currentTime + 10,
      video.duration || 0
    );
  }, []);

  const seekBackward = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = Math.max(video.currentTime - 10, 0);
  }, []);

  const handleVolume = useCallback((value) => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = value;

    setVolume(value);

    if (value === 0) {
      video.muted = true;
      setMuted(true);
    } else {
      video.muted = false;
      setMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;

    setMuted(video.muted);
  }, []);

  const handleSeek = useCallback((value) => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = value;
  }, []);

  const changeSpeed = useCallback((speed) => {
    const video = videoRef.current;

    if (!video) return;

    video.playbackRate = speed;

    setPlaybackRate(speed);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  const toggleTheaterMode = useCallback(() => {
    setTheaterMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const savedTime = localStorage.getItem(storageKey);

    if (savedTime) {
      video.currentTime = Number(savedTime);
    }

    const onLoaded = () => {
      setDuration(video.duration);
      setLoading(false);
    };

    const onPlay = () => {
      setPlaying(true);
      showControls();
    };

    const onPause = () => {
      setPlaying(false);
      setControlsVisible(true);
    };

    const onTime = () => {
      setCurrentTime(video.currentTime);

      localStorage.setItem(
        storageKey,
        String(video.currentTime)
      );
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTime);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [storageKey, showControls]);

    useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;

      if (!video) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "ArrowRight":
          e.preventDefault();
          seekForward();
          break;

        case "ArrowLeft":
          e.preventDefault();
          seekBackward();
          break;

        case "ArrowUp":
          e.preventDefault();

          handleVolume(
            Math.min(1, Number((video.volume + 0.1).toFixed(2)))
          );

          break;

        case "ArrowDown":
          e.preventDefault();

          handleVolume(
            Math.max(0, Number((video.volume - 0.1).toFixed(2)))
          );

          break;

        case "KeyF":
          toggleFullscreen();
          break;

        case "KeyM":
          toggleMute();
          break;

        case "KeyT":
          toggleTheaterMode();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    togglePlay,
    seekForward,
    seekBackward,
    handleVolume,
    toggleFullscreen,
    toggleMute,
    toggleTheaterMode,
  ]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.addEventListener(
      "mousemove",
      showControls
    );

    container.addEventListener(
      "mouseenter",
      showControls
    );

    return () => {
      container.removeEventListener(
        "mousemove",
        showControls
      );

      container.removeEventListener(
        "mouseenter",
        showControls
      );
    };
  }, [showControls]);

  useEffect(() => {
    return () => clearTimeout(hideTimer.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`video-player-wrapper ${
        theaterMode ? "theater-mode" : ""
      }`}
    >
      <div className="video-container">

        {loading && (
          <div className="player-loading">
            <div className="player-spinner"></div>
            <p>Loading video...</p>
          </div>
        )}

        <video
          ref={videoRef}
          className="stream-video"
          poster={media.poster}
          onClick={togglePlay}
        >
          <source
            src={
              media.video ||
              "https://www.w3schools.com/html/mov_bbb.mp4"
            }
            type="video/mp4"
          />

          {media.subtitle && (
            <track
              kind="subtitles"
              src={media.subtitle}
              srcLang="en"
              label="English"
              default
            />
          )}

          Your browser does not support HTML5 video.
        </video>

        <div
          className={`controls-overlay ${
            controlsVisible ? "show" : "hide"
          }`}
        >
          <PlayerControls
            playing={playing}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            fullscreen={fullscreen}
            formatTime={formatTime}
            onPlayPause={togglePlay}
            onSeek={handleSeek}
            onForward={seekForward}
            onBackward={seekBackward}
            onVolumeChange={handleVolume}
            onMute={toggleMute}
            onSpeedChange={changeSpeed}
            onFullscreen={toggleFullscreen}
            onTheaterMode={toggleTheaterMode}
          />
        </div>
      </div>
      <div className="player-info">
        <div className="media-title">
          <h2>{media.title}</h2>

          <div className="media-meta">
            {media.year && <span>{media.year}</span>}

            {media.type && <span>{media.type}</span>}

            {media.duration && (
              <span>{media.duration}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;


