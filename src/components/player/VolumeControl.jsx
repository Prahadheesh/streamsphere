function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onMute,
}) {
  return (
    <div className="volume-wrapper">

      <button
        className="player-btn"
        onClick={onMute}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted || volume === 0
          ? "🔇"
          : volume < 0.5
          ? "🔉"
          : "🔊"}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        className="volume-slider"
        onChange={(e) =>
          onVolumeChange(
            Number(e.target.value)
          )
        }
        aria-label="Volume"
      />

    </div>
  );
}

export default VolumeControl;