import { useEffect, useRef } from 'react';

export default function MemeEditor({
  image,
  topText,
  bottomText,
  fontSize,
  textColor,
  fontFamily,
  textShadow,
  onCanvasReady
}) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        imageRef.current = img;
        
        // Set canvas size to match image
        const maxWidth = 800;
        const maxHeight = 600;
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        drawMeme();
      };
      
      img.src = image;
    }
  }, [image]);

  useEffect(() => {
    if (imageRef.current) {
      drawMeme();
    }
  }, [topText, bottomText, fontSize, textColor, fontFamily, textShadow]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    if (!img || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.font = `${fontSize}px ${fontFamily}, Impact, sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Add text shadow/outline
    if (textShadow) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.lineJoin = 'round';
    }
    
    // Draw top text
    if (topText) {
      const topY = fontSize / 2;
      if (textShadow) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, topY);
      }
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, topY);
    }
    
    // Draw bottom text
    if (bottomText) {
      const bottomY = canvas.height - fontSize * 1.5;
      if (textShadow) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
      }
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
    }
    
    // Notify parent that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  };

  return (
    <div className="flex justify-center items-center bg-dark rounded-lg p-4 min-h-[400px]">
      {image ? (
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-lg"
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
