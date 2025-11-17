# MEMEChain - Architecture Documentation

## System Overview

MEMEChain is a client-side React application that integrates with Polkadot blockchain and IPFS for decentralized meme creation and ownership.

## Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        App.jsx                          │
│  (Main Application State & Orchestration)               │
│                                                         │
│  State:                                                 │
│  - image, canvas                                        │
│  - topText, bottomText, fontSize, textColor, etc.       │
│  - mintSuccess                                          │
│                                                         │
│  Hooks:                                                 │
│  - usePolkadot() → wallet, balance, mintNFT()          │
│  - useIPFS() → uploadToIPFS(), uploadMetadata()        │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Header     │   │  Left Column │   │ Right Column │
│              │   │              │   │              │
│ - Wallet     │   │ ImageUpload  │   │ TextControls │
│   Connect    │   │ MemeEditor   │   │ MintButton   │
│ - Balance    │   │ Reset Button │   │ Info Cards   │
└──────────────┘   └──────────────┘   └──────────────┘
```

## Component Hierarchy

```
App
├── Header
│   ├── Logo & Tagline
│   └── Wallet Connection
│       ├── Connect Button (if not connected)
│       └── Account Info (if connected)
│           ├── Address
│           └── Balance
│
├── Main Content (Grid Layout)
│   ├── Left Column
│   │   ├── ImageUpload (conditional)
│   │   ├── MemeEditor
│   │   │   └── Canvas Element
│   │   └── Reset Button (conditional)
│   │
│   └── Right Column
│       ├── TextControls Card
│       │   ├── Top Text Input
│       │   ├── Bottom Text Input
│       │   ├── Font Selector
│       │   ├── Color Picker
│       │   ├── Size Slider
│       │   └── Shadow Checkbox
│       │
│       ├── MintButton Card
│       │   ├── Download Button
│       │   └── Mint Button
│       │
│       └── Info Card (conditional)
│           └── Faucet Link
│
├── Info Section
│   └── How It Works (3 steps)
│
└── Footer
    └── Credits & Links
```

## Data Flow

### Meme Creation Flow

```
User Action          Component           State Update        Effect
───────────────────────────────────────────────────────────────────
Upload Image    →   ImageUpload    →   setImage()      →   Canvas renders
Add Text        →   TextControls   →   setTopText()    →   Canvas redraws
Change Font     →   TextControls   →   setFontSize()   →   Canvas redraws
Download        →   MintButton     →   canvas.toBlob() →   File downloads
```

### NFT Minting Flow

```
User Action          Hook/Function       External Service    Result
─────────────────────────────────────────────────────────────────────
Connect Wallet  →   usePolkadot()   →   Polkadot.js Ext  →  Account set
Click Mint      →   handleMint()    →   useIPFS()        →  Upload image
                                    →   Pinata API       →  Get IPFS hash
                                    →   useIPFS()        →  Upload metadata
                                    →   Pinata API       →  Get metadata hash
                                    →   usePolkadot()    →  Create transaction
                                    →   AssetHub         →  Mint NFT
                                    →   User signs       →  Transaction sent
                                    →   Block confirmed  →  Success!
```

## State Management

### Local Component State

Each component manages its own UI state:
- `Header`: No local state (receives props)
- `ImageUpload`: No local state (calls callback)
- `MemeEditor`: Canvas ref, image ref
- `TextControls`: No local state (controlled components)
- `MintButton`: loading, status

### App-Level State

Managed in `App.jsx`:
```javascript
// Image state
const [image, setImage] = useState(null);
const [canvas, setCanvas] = useState(null);

// Text customization state
const [topText, setTopText] = useState('');
const [bottomText, setBottomText] = useState('');
const [fontSize, setFontSize] = useState(48);
const [textColor, setTextColor] = useState('#FFFFFF');
const [fontFamily, setFontFamily] = useState('Impact');
const [textShadow, setTextShadow] = useState(true);

// Minting state
const [mintSuccess, setMintSuccess] = useState(null);
```

### Hook State

Managed in custom hooks:

**usePolkadot:**
```javascript
const [api, setApi] = useState(null);
const [account, setAccount] = useState(null);
const [balance, setBalance] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
```

**useIPFS:**
```javascript
const [uploading, setUploading] = useState(false);
const [error, setError] = useState(null);
```

## External Integrations

### Polkadot Integration

```
┌─────────────────────────────────────────────────┐
│           usePolkadot Hook                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  connectToChain()                               │
│    ↓                                            │
│  WsProvider('wss://westmint-rpc.polkadot.io')  │
│    ↓                                            │
│  ApiPromise.create()                            │
│    ↓                                            │
│  Connected to AssetHub                          │
│                                                 │
│  connectWallet()                                │
│    ↓                                            │
│  web3Enable('MEMEChain')                        │
│    ↓                                            │
│  web3Accounts()                                 │
│    ↓                                            │
│  api.query.system.account()                     │
│    ↓                                            │
│  Display balance                                │
│                                                 │
│  mintNFT()                                      │
│    ↓                                            │
│  web3FromAddress()                              │
│    ↓                                            │
│  api.tx.uniques.mint()                          │
│    ↓                                            │
│  signAndSend()                                  │
└─────────────────────────────────────────────────┘
```

### IPFS Integration

```
┌─────────────────────────────────────────────────┐
│             useIPFS Hook                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  uploadToIPFS(canvas)                           │
│    ↓                                            │
│  canvas.toBlob()                                │
│    ↓                                            │
│  FormData.append('file', blob)                  │
│    ↓                                            │
│  fetch('https://api.pinata.cloud/...')          │
│    ↓                                            │
│  Return IPFS hash                               │
│                                                 │
│  uploadMetadata(metadata)                       │
│    ↓                                            │
│  JSON.stringify(metadata)                       │
│    ↓                                            │
│  fetch('https://api.pinata.cloud/...')          │
│    ↓                                            │
│  Return metadata hash                           │
└─────────────────────────────────────────────────┘
```

## Canvas Rendering Pipeline

```
Image Upload
    ↓
Load Image → Create Image Object
    ↓
Calculate Dimensions → Maintain aspect ratio
    ↓
Set Canvas Size → canvas.width, canvas.height
    ↓
Draw Image → ctx.drawImage()
    ↓
Configure Text → font, color, alignment
    ↓
Draw Text Shadow → ctx.strokeText() (if enabled)
    ↓
Draw Text Fill → ctx.fillText()
    ↓
Canvas Ready → onCanvasReady(canvas)
```

## Error Handling Strategy

### Wallet Errors
```
No Extension → Show install modal
No Accounts → Show create account message
Connection Failed → Show retry button
Wrong Network → Show network switch instructions
Insufficient Balance → Show faucet link
```

### IPFS Errors
```
Upload Failed → Retry with exponential backoff
Timeout → Show timeout message + retry
API Key Invalid → Show configuration error
```

### Transaction Errors
```
User Rejected → Show cancellation message
Insufficient Funds → Show balance + faucet link
Network Error → Show retry button
Unknown Error → Log to console + generic message
```

## Performance Optimizations

### Canvas Rendering
- Only redraw when text properties change
- Use refs to avoid unnecessary re-renders
- Debounce text input updates (if needed)

### Image Handling
- Resize large images before canvas rendering
- Limit max dimensions (800x600)
- Compress before IPFS upload

### State Updates
- Batch related state updates
- Use functional updates for dependent state
- Memoize expensive calculations (if needed)

## Security Considerations

### Client-Side Only
- No private keys stored
- No server-side processing
- Wallet extension handles signing

### API Keys
- Environment variables for sensitive data
- Never commit .env to git
- Use different keys for dev/prod

### Input Validation
- Validate image file types
- Limit file sizes
- Sanitize text inputs
- Validate wallet addresses

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              GitHub Repository                   │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Push
                  ▼
┌─────────────────────────────────────────────────┐
│           Vercel / Netlify                      │
│                                                 │
│  1. Detect push                                 │
│  2. npm install                                 │
│  3. npm run build                               │
│  4. Deploy dist/ folder                         │
│  5. Assign URL                                  │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Serve
                  ▼
┌─────────────────────────────────────────────────┐
│              User's Browser                     │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │         MEMEChain App                   │   │
│  │                                         │   │
│  │  Connects to:                           │   │
│  │  - Polkadot AssetHub (WebSocket)        │   │
│  │  - Pinata IPFS (HTTPS)                  │   │
│  │  - Wallet Extension (Browser)           │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Technology Stack Summary

### Frontend
- **React 18.2** - UI framework
- **Vite 7.2** - Build tool & dev server
- **Tailwind CSS 3.x** - Styling
- **HTML5 Canvas** - Meme rendering

### Blockchain
- **@polkadot/api** - Blockchain interaction
- **@polkadot/extension-dapp** - Wallet connection
- **AssetHub Westend** - NFT minting

### Storage
- **Pinata** - IPFS pinning service
- **IPFS** - Decentralized storage

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

## File Structure

```
memechain/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx           (120 lines)
│   │   ├── ImageUpload.jsx      (60 lines)
│   │   ├── MemeEditor.jsx       (130 lines)
│   │   ├── TextControls.jsx     (100 lines)
│   │   └── MintButton.jsx       (80 lines)
│   ├── hooks/
│   │   ├── usePolkadot.js       (120 lines)
│   │   └── useIPFS.js           (80 lines)
│   ├── App.jsx                  (200 lines)
│   ├── main.jsx                 (10 lines)
│   └── index.css                (25 lines)
├── Documentation/
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── DEPLOYMENT.md
│   ├── TODO.md
│   ├── PROJECT_SUMMARY.md
│   └── ARCHITECTURE.md (this file)
├── Configuration/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── .env.example
│   └── .gitignore
└── index.html

Total: ~1,000 lines of code
```

## Future Architecture Considerations

### Scalability
- Add state management library (Redux/Zustand) if app grows
- Implement code splitting for faster loads
- Add service worker for offline support

### Features
- WebSocket for real-time updates
- Database for meme gallery
- Backend API for advanced features

### Performance
- Implement virtual scrolling for gallery
- Add image lazy loading
- Optimize bundle size

---

This architecture provides a solid foundation for a production-ready Web3 application while maintaining simplicity and maintainability.
