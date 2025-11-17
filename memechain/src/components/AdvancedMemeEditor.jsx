import { useEffect, useRef, useState } from 'react';

export default function AdvancedMemeEditor({
  image,
  textLayers,
  onTextLayersChange,
  selectedLayerId,
  onSelectLayer,
  onCanvasReady,
  canvasSize = { width: 800, height: 600 }
}) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        imageRef.current = img;
        drawCanvas();
      };
      
      img.src = image;
    }
  }, [image]);

  useEffect(() => {
    if (imageRef.current) {
      drawCanvas();
    }
  }, [textLayers, selectedLayerId]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Draw all text layers
    textLayers.forEach(layer => {
      drawTextLayer(ctx, layer, layer.id === selectedLayerId);
    });
    
    // Notify parent that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  };

  const drawTextLayer = (ctx, layer, isSelected) => {
    ctx.save();
    
    // Apply transformations
    ctx.translate(layer.x, layer.y);
    ctx.rotate((layer.rotation * Math.PI) / 180);
    
    // Set text properties
    const fontStyle = `${layer.bold ? 'bold ' : ''}${layer.italic ? 'italic ' : ''}${layer.fontSize}px ${layer.fontFamily}`;
    ctx.font = fontStyle;
    ctx.fillStyle = layer.color;
    ctx.textAlign = layer.align;
    ctx.textBaseline = 'middle';
    
    // Draw stroke/outline
    if (layer.strokeWidth > 0) {
      ctx.strokeStyle = layer.strokeColor;
      ctx.lineWidth = layer.strokeWidth;
      ctx.lineJoin = 'round';
      ctx.strokeText(layer.text, 0, 0);
    }
    
    // Draw shadow
    if (layer.shadowBlur > 0) {
      ctx.shadowColor = `rgba(0, 0, 0, ${layer.shadowOpacity})`;
      ctx.shadowBlur = layer.shadowBlur;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }
    
    // Draw text
    ctx.fillText(layer.text, 0, 0);
    
    // Draw selection box if selected
    if (isSelected) {
      const metrics = ctx.measureText(layer.text);
      const width = metrics.width;
      const height = layer.fontSize;
      
      ctx.strokeStyle = '#E6007A';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(-width/2, -height/2, width, height);
      ctx.setLineDash([]);
    }
    
    ctx.restore();
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const isPointInText = (x, y, layer) => {
    const ctx = canvasRef.current.getContext('2d');
    const fontStyle = `${layer.bold ? 'bold ' : ''}${layer.italic ? 'italic ' : ''}${layer.fontSize}px ${layer.fontFamily}`;
    ctx.font = fontStyle;
    const metrics = ctx.measureText(layer.text);
    const width = metrics.width;
    const height = layer.fontSize * 1.2; // Add some padding
    
    // Simple bounding box check
    const left = layer.x - width / 2;
    const right = layer.x + width / 2;
    const top = layer.y - height / 2;
    const bottom = layer.y + height / 2;
    
    return x >= left && x <= right && y >= top && y <= bottom;
  };

  const handleCanvasClick = (e) => {
    const { x, y } = getCanvasCoordinates(e);
    
    // Check if clicked on any text layer (from top to bottom)
    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      if (isPointInText(x, y, layer)) {
        onSelectLayer(layer.id);
        return;
      }
    }
    
    // Clicked on empty space
    onSelectLayer(null);
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCanvasCoordinates(e);
    
    // Check if clicking on any text layer
    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      if (isPointInText(x, y, layer)) {
        onSelectLayer(layer.id);
        setIsDragging(true);
        setDragOffset({
          x: x - layer.x,
          y: y - layer.y
        });
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedLayerId) return;
    
    const { x, y } = getCanvasCoordinates(e);
    
    const newLayers = textLayers.map(layer => {
      if (layer.id === selectedLayerId) {
        return {
          ...layer,
          x: x - dragOffset.x,
          y: y - dragOffset.y
        };
      }
      return layer;
    });
    
    onTextLayersChange(newLayers);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex justify-center items-center bg-dark rounded-lg p-4 min-h-[400px]">
      {image ? (
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="max-w-full h-auto rounded-lg shadow-lg cursor-move"
          style={{ touchAction: 'none' }}
        />
      ) : (
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <div>Upload an image to start creating your meme</div>
        </div>
      )}
    </div>
  );
}
