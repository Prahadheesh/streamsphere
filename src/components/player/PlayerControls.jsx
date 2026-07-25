import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import SubtitleMenu from "./SubtitleMenu";

function PlayerControls({
  playing,
  currentTime,
  duration,
  volume,
  muted,
  playbackRate,
  fullscreen,
  formatTime,

  onPlayPause,
  onSeek,

  onForward,
  onBackward,

  onVolumeChange,
  onMute,

  onSpeedChange,

  onFullscreen,
  onTheaterMode,
}) {

  const speeds = [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2,
  ];

  return (
    <div className="player-controls">

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
      />

      <div className="controls-top">

        <div className="controls-left">

          <button
            className="player-btn"
            onClick={onBackward}
            title="Back 10 Seconds"
          >
            ⏪
          </button>

          <button
            className="player-btn play-button"
            onClick={onPlayPause}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <button
            className="player-btn"
            onClick={onForward}
            title="Forward 10 Seconds"
          >
            ⏩
          </button>

          <div className="time-display">

            {formatTime(currentTime)}
            {" / "}
            {formatTime(duration)}

          </div>

        </div>

        <div className="controls-center">

          <VolumeControl
            volume={volume}
            muted={muted}
            onVolumeChange={onVolumeChange}
            onMute={onMute}
          />
                  <div className="speed-control">

            <select
              className="speed-selector"
              value={playbackRate}
              onChange={(e) =>
                onSpeedChange(Number(e.target.value))
              }
              title="Playback Speed"
            >
              {speeds.map((speed) => (
                <option
                  key={speed}
                  value={speed}
                >
                  {speed}x
                </option>
              ))}
            </select>

          </div>

          <SubtitleMenu />

        </div>

        <div className="controls-right">

          <button
            className="player-btn"
            onClick={onTheaterMode}
            title="Theater Mode"
          >
            🎭
          </button>

          <button
            className="player-btn"
            onClick={onFullscreen}
            title={
              fullscreen
                ? "Exit Fullscreen"
                : "Fullscreen"
            }
          >
            {fullscreen ? "🡼" : "⛶"}
          </button>

        </div>

      </div>
    </div>
    
      );
}

export default PlayerControls;