export default function AdvancedTextControls({
  textLayers,
  selectedLayerId,
  onTextLayersChange,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onDuplicateLayer
}) {
  const selectedLayer = textLayers.find(l => l.id === selectedLayerId);

  const updateSelectedLayer = (updates) => {
    const newLayers = textLayers.map(layer => {
      if (layer.id === selectedLayerId) {
        return { ...layer, ...updates };
      }
      return layer;
    });
    onTextLayersChange(newLayers);
  };

  const moveLayer = (direction) => {
    const index = textLayers.findIndex(l => l.id === selectedLayerId);
    if (index === -1) return;
    
    const newLayers = [...textLayers];
    if (direction === 'up' && index < textLayers.length - 1) {
      [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
    } else if (direction === 'down' && index > 0) {
      [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
    }
    onTextLayersChange(newLayers);
  };

  return (
    <div className="space-y-4">
      {/* Layer Management */}
      <div className="flex gap-2">
        <button
          onClick={onAddLayer}
          className="flex-1 bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Add Text
        </button>
        {selectedLayer && (
          <>
            <button
              onClick={() => onDuplicateLayer(selectedLayerId)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
              title="Duplicate"
            >
              📋
            </button>
            <button
              onClick={() => onDeleteLayer(selectedLayerId)}
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>

      {/* Text Layers List */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-400">Text Layers ({textLayers.length})</div>
        {textLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={`p-2 rounded cursor-pointer ${
              layer.id === selectedLayerId
                ? 'bg-primary/20 border border-primary'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => onSelectLayer(layer.id)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm truncate flex-1">
                {layer.text || `Text Layer ${index + 1}`}
              </span>
              {layer.id === selectedLayerId && (
                <div className="flex gap-1">
                  <button
                    onClick={() => moveLayer('up')}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                    title="Move forward"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveLayer('down')}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                    title="Move backward"
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Layer Controls */}
      {selectedLayer && (
        <div className="space-y-4 border-t border-gray-700 pt-4">
          <div className="text-sm font-semibold text-gray-400">Edit Selected Text</div>
          
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Text</label>
            <textarea
              value={selectedLayer.text}
              onChange={(e) => updateSelectedLayer({ text: e.target.value })}
              placeholder="Enter text"
              rows={2}
              className="w-full px-4 py-2 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white resize-none"
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium mb-2">Font</label>
            <select
              value={selectedLayer.fontFamily}
              onChange={(e) => updateSelectedLayer({ fontFamily: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
            >
              <option value="Impact">Impact</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Arial">Arial</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          {/* Font Size & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Size: {selectedLayer.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={selectedLayer.fontSize}
                onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="color"
                value={selectedLayer.color}
                onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                className="w-full h-10 bg-dark border border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Text Style */}
          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateSelectedLayer({ bold: !selectedLayer.bold })}
                className={`flex-1 px-4 py-2 rounded-lg font-bold ${
                  selectedLayer.bold
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                B
              </button>
              <button
                onClick={() => updateSelectedLayer({ italic: !selectedLayer.italic })}
                className={`flex-1 px-4 py-2 rounded-lg italic ${
                  selectedLayer.italic
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                I
              </button>
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <label className="block text-sm font-medium mb-2">Alignment</label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map(align => (
                <button
                  key={align}
                  onClick={() => updateSelectedLayer({ align })}
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    selectedLayer.align === align
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {align === 'left' && '⬅️'}
                  {align === 'center' && '↔️'}
                  {align === 'right' && '➡️'}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke/Outline */}
          <div>
            <label className="block text-sm font-medium mb-2">Outline</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Width: {selectedLayer.strokeWidth}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={selectedLayer.strokeWidth}
                  onChange={(e) => updateSelectedLayer({ strokeWidth: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Color</label>
                <input
                  type="color"
                  value={selectedLayer.strokeColor}
                  onChange={(e) => updateSelectedLayer({ strokeColor: e.target.value })}
                  className="w-full h-8 bg-dark border border-gray-600 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-sm font-medium mb-2">Shadow</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Blur: {selectedLayer.shadowBlur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={selectedLayer.shadowBlur}
                  onChange={(e) => updateSelectedLayer({ shadowBlur: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Opacity: {Math.round(selectedLayer.shadowOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedLayer.shadowOpacity}
                  onChange={(e) => updateSelectedLayer({ shadowOpacity: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rotation: {selectedLayer.rotation}°
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              value={selectedLayer.rotation}
              onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}

      {!selectedLayer && textLayers.length > 0 && (
        <div className="text-center text-sm text-gray-400 py-4">
          Click on a text layer to edit it
        </div>
      )}
    </div>
  );
}
