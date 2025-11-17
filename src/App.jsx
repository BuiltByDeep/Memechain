import { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import AdvancedMemeEditor from './components/AdvancedMemeEditor';
import AdvancedTextControls from './components/AdvancedTextControls';
import MintButton from './components/MintButton';
import { usePolkadot } from './hooks/usePolkadot';
import { submitMemeToBlockchain } from './onchain/submitToPaseo';

function App() {
  // Image state
  const [image, setImage] = useState(null);
  const [canvas, setCanvas] = useState(null);
  
  // Advanced text layers state
  const [textLayers, setTextLayers] = useState([]);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [nextLayerId, setNextLayerId] = useState(1);
  
  // Minting state
  const [mintSuccess, setMintSuccess] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  // Text layer management functions
  const addTextLayer = () => {
    const newLayer = {
      id: nextLayerId,
      text: 'New Text',
      x: 400,
      y: 300,
      fontSize: 48,
      fontFamily: 'Impact',
      color: '#FFFFFF',
      bold: false,
      italic: false,
      align: 'center',
      strokeWidth: 3,
      strokeColor: '#000000',
      shadowBlur: 0,
      shadowOpacity: 0.8,
      rotation: 0
    };
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayerId(newLayer.id);
    setNextLayerId(nextLayerId + 1);
  };

  const deleteTextLayer = (id) => {
    setTextLayers(textLayers.filter(layer => layer.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  const duplicateTextLayer = (id) => {
    const layerToDuplicate = textLayers.find(l => l.id === id);
    if (layerToDuplicate) {
      const newLayer = {
        ...layerToDuplicate,
        id: nextLayerId,
        x: layerToDuplicate.x + 20,
        y: layerToDuplicate.y + 20
      };
      setTextLayers([...textLayers, newLayer]);
      setSelectedLayerId(newLayer.id);
      setNextLayerId(nextLayerId + 1);
    }
  };
  
  // Hooks
  const { account, accountObj, balance, error: walletError, isApiReady, connectWallet, refreshBalance } = usePolkadot();

  const handleSubmit = async (canvasElement) => {
    console.log('handleSubmit called with account:', account);
    
    // Check if wallet is connected before starting
    if (!accountObj) {
      alert('Please connect your Polkadot wallet first!');
      return;
    }
    
    if (!isApiReady) {
      alert('Blockchain connection not ready. Please wait a moment and try again.');
      return;
    }
    
    if (textLayers.length === 0 || textLayers.every(layer => !layer.text.trim())) {
      alert('Please add some text to your meme before submitting!');
      return;
    }
    
    // Balance check bypassed - blockchain will validate
    // We know from Subscan you have tokens, so let's just try
    console.log('Proceeding with submission. Balance display:', balance);
    
    setIsMinting(true);
    
    try {
      // Prepare meme data from text layers
      const memeData = {
        textLayers: textLayers.map(layer => ({
          text: layer.text,
          position: { x: layer.x, y: layer.y },
          style: {
            fontSize: layer.fontSize,
            fontFamily: layer.fontFamily,
            color: layer.color
          }
        }))
      };
      
      console.log('Submitting meme metadata to Paseo blockchain...');
      const result = await submitMemeToBlockchain(accountObj, memeData);
      
      setMintSuccess({
        txHash: result.txHash,
        blockHash: result.blockHash,
        blockNumber: result.blockNumber,
        timestamp: new Date().toISOString()
      });
      
      // Show success message
      alert(
        `🎉 Meme metadata stored on Paseo blockchain!\n\n` +
        `Transaction Hash: ${result.txHash}\n` +
        `Block Number: ${result.blockNumber}\n\n` +
        `Your meme is now permanently on-chain and verifiable!`
      );
      
    } catch (error) {
      console.error('Submission failed:', error);
      
      let errorMessage = error.message || 'Unknown error';
      
      // Provide helpful error messages
      if (errorMessage.includes('1010') || errorMessage.includes('balance too low')) {
        errorMessage = 
          'Insufficient balance to pay transaction fees.\n\n' +
          'Get free testnet tokens from:\n' +
          'https://faucet.polkadot.io/paseo\n\n' +
          'Your address: ' + account;
      } else if (errorMessage.includes('1014') || errorMessage.includes('Priority is too low')) {
        errorMessage = 'Transaction priority too low. Please try again.';
      } else if (errorMessage.includes('Cancelled')) {
        errorMessage = 'Transaction was cancelled by user.';
      }
      
      alert(`Blockchain submission failed:\n\n${errorMessage}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header 
        onConnect={connectWallet}
        account={account}
        balance={balance}
        onRefreshBalance={refreshBalance}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Connection errors are logged to console but not shown to users */}
        
        {mintSuccess && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6">
            <div className="font-semibold mb-2">✅ Meme Stored on Blockchain!</div>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Tx Hash:</span>
                <code className="bg-black/30 px-2 py-1 rounded text-xs">
                  {mintSuccess.txHash.slice(0, 10)}...{mintSuccess.txHash.slice(-8)}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mintSuccess.txHash);
                    alert('Transaction hash copied!');
                  }}
                  className="text-xs bg-primary/20 hover:bg-primary/30 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <div>
                <span className="text-gray-400">Block:</span> #{mintSuccess.blockNumber}
              </div>
              <div>
                <span className="text-gray-400">Time:</span> {new Date(mintSuccess.timestamp).toLocaleString()}
              </div>
              <a
                href={`https://assethub-paseo.subscan.io/extrinsic/${mintSuccess.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-pink-400 text-sm underline mt-2"
              >
                View on Subscan Explorer →
              </a>
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Editor */}
          <div className="space-y-6">
            {!image && <ImageUpload onImageUpload={setImage} hasImage={!!image} />}
            
            <AdvancedMemeEditor
              image={image}
              textLayers={textLayers}
              onTextLayersChange={setTextLayers}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onCanvasReady={setCanvas}
            />
            
            {image && (
              <button
                onClick={() => {
                  setImage(null);
                  setCanvas(null);
                  setTextLayers([]);
                  setSelectedLayerId(null);
                  setMintSuccess(null);
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔄 Reset & Upload New Image
              </button>
            )}
          </div>
          
          {/* Right Column - Controls */}
          <div className="space-y-6">
            <div className="bg-surface rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Text Layers</h2>
              <AdvancedTextControls
                textLayers={textLayers}
                selectedLayerId={selectedLayerId}
                onTextLayersChange={setTextLayers}
                onSelectLayer={setSelectedLayerId}
                onAddLayer={addTextLayer}
                onDeleteLayer={deleteTextLayer}
                onDuplicateLayer={duplicateTextLayer}
              />
            </div>
            
            <div className="bg-surface rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Export Your Meme</h2>
              <MintButton
                canvas={canvas}
                account={account}
                onMint={handleSubmit}
                disabled={!isApiReady || isMinting}
                isMinting={isMinting}
              />
              
              {/* Blockchain Connection Status - Moved here to be less intrusive */}
              {!isApiReady && (
                <div className="text-center text-sm text-yellow-400 mt-3 p-2 bg-yellow-900/20 rounded">
                  ⏳ Connecting to Paseo blockchain...
                </div>
              )}
              
              {isApiReady && !isMinting && (
                <div className="text-center text-xs text-green-400 mt-3 p-2 bg-green-900/20 rounded">
                  ✅ Connected to Paseo AssetHub
                </div>
              )}
              
              {isMinting && (
                <div className="text-center text-sm text-blue-400 mt-3 p-2 bg-blue-900/20 rounded">
                  Submitting to blockchain... Please sign the transaction in your wallet.
                </div>
              )}
            </div>
            
            {!account && (
              <div className="bg-secondary/20 border border-secondary rounded-lg p-6">
                <h3 className="font-semibold mb-2">🔗 Connect to Web3</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Connect your Polkadot wallet to store your meme metadata permanently on the Paseo blockchain. 
                  You'll need PAS tokens from the faucet.
                </p>
                <a
                  href="https://faucet.polkadot.io/paseo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-pink-400 text-sm underline"
                >
                  Get Free Testnet Tokens →
                </a>
                <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-700">
                  💡 Tip: If balance shows 0.0000 after connecting, click the 🔄 refresh button in the header.
                </p>
              </div>
            )}
            
            {account && (
              <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-green-400">✅ Ready to Submit</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Wallet connected: {account.slice(0, 10)}...{account.slice(-6)}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  Balance display: {balance || '?.????'} PAS
                </p>
                <p className="text-xs text-green-300">
                  You can submit your meme to the blockchain now! The transaction will verify your balance automatically.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Info Section */}
        <div className="mt-12 bg-surface rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">1. Create</h3>
              <p className="text-gray-400">
                Upload an image and add text to create your meme. Customize fonts, colors, and styling.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📥</div>
              <h3 className="font-semibold mb-2">2. Download</h3>
              <p className="text-gray-400">
                Download your meme as a PNG to share anywhere on the web.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">3. Store on Blockchain (Optional)</h3>
              <p className="text-gray-400">
                Connect your wallet and submit your meme metadata to the Paseo blockchain for permanent, verifiable proof of creation.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <p>MEMEChain - Built for Polkadot Hackathon 2025</p>
          <p className="mt-2">Powered by Paseo Blockchain • Create, Own, Prove 🎨</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
