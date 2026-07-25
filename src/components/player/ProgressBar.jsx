function ProgressBar({
  currentTime,
  duration,
  onSeek,
}) {
  return (
    <div className="progress-container">

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        step="0.1"
        className="progress-slider"
        onChange={(e) =>
          onSeek(Number(e.target.value))
        }
        aria-label="Video Progress"
      />

    </div>
  );
}

export default ProgressBar;