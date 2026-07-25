function SubtitleMenu({
  subtitles = ["Off", "English"],
  selected = "English",
  onChange = () => {},
}) {
  return (
    <select
      className="subtitle-selector"
      value={selected}
      onChange={(e) =>
        onChange(e.target.value)
      }
      title="Subtitles"
    >
      {subtitles.map((subtitle) => (
        <option
          key={subtitle}
          value={subtitle}
        >
          {subtitle}
        </option>
      ))}
    </select>
  );
}

export default SubtitleMenu;