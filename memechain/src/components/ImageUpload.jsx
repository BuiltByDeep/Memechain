export default function ImageUpload({ onImageUpload, hasImage }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        {!hasImage ? (
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <div className="text-lg font-semibold">Upload Image or Drop Here</div>
            <div className="text-sm text-gray-400">JPG, PNG, GIF up to 10MB</div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">Click to change image</div>
        )}
      </label>
    </div>
  );
}
