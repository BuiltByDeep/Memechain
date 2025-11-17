# MEMEChain 🎨

**Create, Own, Prove - Your Memes, Your Legacy**

A Web3-powered meme generator that allows users to create custom memes with advanced editing features and permanently store their metadata on the Polkadot blockchain (Paseo Asset Hub).

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://memechainpolkadot.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Demo Video](#demo-video)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Blockchain Integration](#blockchain-integration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

### The Problem

Traditional meme generators don't provide:
- Proof of original creation
- Attribution to creators when memes go viral
- Verifiable timestamps of creation
- Immutable ownership records

### Our Solution

MEMEChain bridges Web2 simplicity with Web3 ownership by offering:
- **Intuitive meme creation** with advanced editing tools
- **Blockchain verification** via Polkadot's Paseo Asset Hub
- **Permanent metadata storage** using on-chain remarks
- **Verifiable proof of creation** with transaction hashes

### Objectives

1. **Democratize meme creation** with professional-grade tools
2. **Establish provenance** for digital content creators
3. **Showcase Polkadot's capabilities** for real-world applications
4. **Bridge Web2 and Web3** with seamless user experience

---

## ✨ Key Features

### Advanced Meme Editor

- **Multiple Text Layers**: Add unlimited text boxes with independent styling
- **Drag & Drop**: Position text anywhere on your image
- **Rich Text Styling**:
  - 8 font families (Impact, Arial Black, Comic Sans MS, etc.)
  - Custom colors and sizes (12-120px)
  - Bold and italic styles
  - Text alignment (left/center/right)
  - Outline/stroke with adjustable thickness and color
  - Shadow effects with blur and opacity controls
  - Rotation (-180° to 180°)
- **Layer Management**:
  - Add, delete, duplicate layers
  - Reorder layers (send forward/backward)
  - Visual selection with highlighted borders
- **Export Options**: Download as high-quality PNG

### Blockchain Integration

- **Wallet Connection**: Support for Polkadot.js, Talisman, and SubWallet
- **Paseo Asset Hub**: Testnet integration for safe experimentation
- **On-Chain Metadata**: Store meme data using `system.remark` extrinsic
- **Transaction Verification**: Direct links to Subscan explorer
- **Balance Display**: Real-time PAS token balance

### User Experience

- **No Blockchain Knowledge Required**: Works as a traditional meme generator
- **Optional Web3 Features**: Blockchain submission is opt-in
- **Real-Time Preview**: See changes instantly
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Easy on the eyes for long editing sessions

---

## 🎥 Demo Video

🔗 **Live Demo**: [https://memechainpolkadot.netlify.app](https://memechainpolkadot.netlify.app)

**Quick Demo Flow:**
1. Upload an image
2. Add and customize text layers
3. Download your meme (Web2 path)
4. OR connect wallet and submit to blockchain (Web3 path)
5. Verify transaction on Subscan

---

## 📸 Screenshots

### Meme Editor
![Meme Editor](screenshots/editor.png)
*Advanced text editing with multiple layers and styling options*

### Blockchain Submission
![Blockchain Submission](screenshots/blockchain.png)
*One-click submission to Paseo Asset Hub with transaction verification*

### Transaction Verification
![Subscan Explorer](screenshots/subscan.png)
*Verifiable proof of creation on Subscan block explorer*

---

## 🛠 Technologies Used

### Frontend
- **React 18.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 3.x** - Utility-first styling
- **HTML5 Canvas API** - Meme rendering and manipulation

### Blockchain
- **@polkadot/api** (v14.x) - Polkadot blockchain interaction
- **@polkadot/extension-dapp** - Wallet integration
- **Paseo Asset Hub** - Polkadot testnet for NFT and asset operations

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Polkadot wallet extension** (Polkadot.js, Talisman, or SubWallet)
- **PAS testnet tokens** (get from [Paseo Faucet](https://faucet.polkadot.io/paseo))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/memechain.git
cd memechain
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Deployment

Deploy to Vercel, Netlify, or any static hosting service:

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

---

## 📖 Usage Guide

### Creating a Meme (No Wallet Required)

1. **Upload an Image**
   - Click "Upload Image or Drop Here"
   - Select JPG, PNG, or GIF (max 10MB)

2. **Add Text Layers**
   - Click "+ Add Text" button
   - Text appears in the center of your image
   - Click on text in canvas or layer list to select it

3. **Customize Text**
   - Edit text in the textarea
   - Choose font, size, and color
   - Add bold, italic, or alignment
   - Adjust outline thickness and color
   - Add shadow effects
   - Rotate text with the slider

4. **Manage Layers**
   - Drag text to reposition
   - Duplicate layers with 📋 button
   - Delete layers with 🗑️ button
   - Reorder with ↑↓ buttons

5. **Download**
   - Click "📥 Download PNG"
   - Share your meme anywhere!

### Submitting to Blockchain (Wallet Required)

1. **Get Testnet Tokens**
   - Visit [Paseo Faucet](https://faucet.polkadot.io/paseo)
   - Select "Paseo Relay" network
   - Enter your wallet address
   - Request tokens

2. **Connect Wallet**
   - Click "Connect Wallet" in header
   - Approve connection in wallet popup
   - Your address and balance will appear

3. **Create Your Meme**
   - Follow steps above to create your meme

4. **Submit to Blockchain**
   - Click "🚀 Submit to Blockchain"
   - Review transaction in wallet
   - Sign the transaction
   - Wait for confirmation (10-30 seconds)

5. **Verify Transaction**
   - Copy transaction hash
   - Click "View on Subscan Explorer"
   - See your meme metadata on-chain!

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────┐
│              Frontend (React App)                │
│  ┌──────────────┐      ┌──────────────────┐    │
│  │ Meme Editor  │      │  Wallet Manager  │    │
│  │  Component   │      │    Component     │    │
│  └──────────────┘      └──────────────────┘    │
│         │                       │               │
│         ├───────────────────────┤               │
│         │                       │               │
│         ▼                       ▼               │
│  ┌──────────────┐      ┌──────────────────┐    │
│  │  Canvas API  │      │  Polkadot.js API │    │
│  └──────────────┘      └──────────────────┘    │
└─────────────────────────────────────────────────┘
                │                       │
                │                       │
                ▼                       ▼
        ┌──────────────┐      ┌──────────────────────┐
        │   Browser    │      │  Paseo Asset Hub     │
        │   Storage    │      │  - Metadata Storage  │
        └──────────────┘      │  - Transaction Logs  │
                              └──────────────────────┘
```

### Component Structure

```
src/
├── components/
│   ├── Header.jsx                 # App header with wallet connection
│   ├── ImageUpload.jsx            # Image upload component
│   ├── AdvancedMemeEditor.jsx     # Canvas-based meme editor
│   ├── AdvancedTextControls.jsx   # Text layer management
│   └── MintButton.jsx             # Download and blockchain submission
├── hooks/
│   └── usePolkadot.js             # Polkadot wallet and API hook
├── onchain/
│   └── submitToPaseo.js           # Blockchain submission logic
├── polkadotApi.js                 # Shared API instance
├── App.jsx                        # Main app component
└── main.jsx                       # Entry point
```

### Data Flow

1. **User creates meme** → Canvas renders in real-time
2. **User clicks submit** → Metadata prepared from text layers
3. **Transaction created** → `system.remark` with JSON metadata
4. **User signs** → Wallet extension handles signing
5. **Transaction submitted** → Sent to Paseo Asset Hub
6. **Confirmation received** → Transaction hash displayed
7. **User verifies** → Link to Subscan explorer

---

## ⛓ Blockchain Integration

### Network Details

- **Network**: Paseo Asset Hub (Testnet)
- **RPC Endpoints**: 
  - `wss://sys.ibp.network/asset-hub-paseo`
  - `wss://asset-hub-paseo.dotters.network`
  - `wss://pas-rpc.stakeworld.io/assethub`
- **Explorer**: [Subscan](https://assethub-paseo.subscan.io/)
- **Faucet**: [Paseo Faucet](https://faucet.polkadot.io/paseo)

### Metadata Structure

Stored on-chain using `system.remark`:

```json
{
  "textLayers": [
    {
      "text": "Your meme text",
      "position": { "x": 400, "y": 300 },
      "style": {
        "fontSize": 48,
        "fontFamily": "Impact",
        "color": "#FFFFFF"
      }
    }
  ]
}
```

### Transaction Details

- **Extrinsic**: `system.remark(bytes)`
- **Fee**: ~0.01 PAS
- **Finality**: 6-12 seconds
- **Verification**: Permanent on-chain record

### Why Paseo Asset Hub?

- **Testnet Environment**: Safe for experimentation
- **Asset-Focused**: Designed for NFTs and digital assets
- **Low Fees**: Minimal cost for testing
- **Polkadot Ecosystem**: Part of the broader Polkadot network

---

## 🗺 Roadmap

### Phase 1: Core Features ✅ (Completed)
- [x] Advanced meme editor with multiple text layers
- [x] Drag & drop text positioning
- [x] Rich text styling (fonts, colors, outlines, shadows)
- [x] Layer management (add, delete, duplicate, reorder)
- [x] Download as PNG
- [x] Polkadot wallet integration
- [x] Blockchain metadata submission
- [x] Transaction verification on Subscan

### Phase 2: Enhanced Editing (Next)
- [ ] Image manipulation (zoom, pan, crop)
- [ ] Preset aspect ratios (1:1, 16:9, 9:16)
- [ ] Flip and rotate image
- [ ] Background color for blank memes
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts

### Phase 3: Templates & Presets
- [ ] Popular meme template gallery
- [ ] Pre-configured text positions
- [ ] Template search and categories
- [ ] User-submitted templates
- [ ] Template marketplace

### Phase 4: Advanced Features
- [ ] IPFS integration for full image storage
- [ ] NFT minting (beyond metadata)
- [ ] Meme gallery (view all on-chain memes)
- [ ] Social sharing features
- [ ] Collaborative editing
- [ ] Meme competitions

### Phase 5: Mainnet & Monetization
- [ ] Deploy to Polkadot mainnet
- [ ] Creator royalties
- [ ] Meme marketplace
- [ ] Token economics
- [ ] DAO governance

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

Open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Suggesting Features

Open an issue with:
- Feature description
- Use case and benefits
- Mockups or examples (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Polkadot** for the amazing blockchain infrastructure
- **Paseo** for providing a robust testnet environment
- **Subscan** for the excellent block explorer
- **The meme community** for endless inspiration

---

## ⚠️ Known Issues

**Balance Display**: If you don't see your balance after connecting your wallet, click the 🔄 refresh button next to the balance in the header. The balance query sometimes glitches on first load.

---

## 🏆 Hackathon Submission

This project was built for the Polkadot Hackathon 2025.

**Category**: User-Centric Applications

**Team**: Anudeep

**Live Demo**: [https://memechainpolkadot.netlify.app](https://memechainpolkadot.netlify.app)

**Video**: [Demo Video Link](your-video-url)

---

**Built with ❤️ for the Polkadot ecosystem**

*MEMEChain - Where memes meet blockchain* 🎨⛓️
