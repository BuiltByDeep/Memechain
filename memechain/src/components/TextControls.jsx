export default function TextControls({ 
  topText, 
  bottomText, 
  onTopTextChange, 
  onBottomTextChange,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
  fontFamily,
  onFontFamilyChange,
  textShadow,
  onTextShadowChange
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Top Text</label>
        <input
          type="text"
          value={topText}
          onChange={(e) => onTopTextChange(e.target.value)}
          placeholder="Enter top text"
          className="w-full px-4 py-2 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bottom Text</label>
        <input
          type="text"
          value={bottomText}
          onChange={(e) => onBottomTextChange(e.target.value)}
          placeholder="Enter bottom text"
          className="w-full px-4 py-2 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={fontFamily}
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className="w-full px-4 py-2 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
          >
            <option value="Impact">Impact</option>
            <option value="Arial Black">Arial Black</option>
            <option value="Anton">Anton</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="w-full h-10 bg-dark border border-gray-600 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="20"
          max="80"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="text-shadow"
          checked={textShadow}
          onChange={(e) => onTextShadowChange(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="text-shadow" className="text-sm font-medium cursor-pointer">
          Text Shadow/Outline
        </label>
      </div>
    </div>
  );
}
