import { useState } from 'react';

export default function MintButton({ 
  canvas, 
  account, 
  onMint, 
  disabled,
  isMinting = false
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleDownload = () => {
    if (!canvas) return;
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `meme-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleMint = async () => {
    console.log('MintButton handleMint - canvas:', !!canvas, 'account:', account);
    
    if (!canvas) {
      alert('No meme to mint! Please create a meme first.');
      return;
    }
    
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    
    setLoading(true);
    setStatus('Preparing meme...');
    
    try {
      await onMint(canvas);
      setStatus('');
    } catch (error) {
      setStatus('Minting failed. Please try again.');
      console.error('Minting error in MintButton:', error);
      alert('Minting failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          disabled={!canvas}
          className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          📥 Download PNG
        </button>
        
        <button
          onClick={handleMint}
          disabled={!canvas || !account || loading || disabled || isMinting}
          className="flex-1 bg-primary hover:bg-pink-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {(loading || isMinting) ? '⏳ Submitting...' : '🚀 Submit to Blockchain'}
        </button>
      </div>
      
      {status && (
        <div className="text-center text-sm text-gray-400">
          {status}
        </div>
      )}
      
      {!account && (
        <div className="text-center text-sm text-yellow-400">
          Connect your wallet to submit to blockchain
        </div>
      )}
    </div>
  );
}
