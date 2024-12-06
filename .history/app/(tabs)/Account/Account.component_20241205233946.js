const TestSelect = () => {
  const fontSizeOptions = [14, 16, 18, 20];
  const defaultTextSize = 16;
  const extendedFontSizeOptions = ["Reset to Default", ...fontSizeOptions];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(1));

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Select
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      value={
        selectedIndex.row === 0
          ? "Reset to Default"
          : `${fontSizeOptions[selectedIndex.row - 1]}px`
      }
    >
      {extendedFontSizeOptions.map((size, index) => (
        <SelectItem
          key={index}
          title={typeof size === "string" ? size : `${size}px`}
        />
      ))}
    </Select>
  );
};
