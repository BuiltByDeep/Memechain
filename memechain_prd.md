# MEMEChain - Product Requirements Document

## Executive Summary

**Project Name:** MEMEChain  
**Tagline:** Create, Own, Prove - Your Memes, Your Legacy  
**Category:** User-centric App (Polkadot Hackathon)  
**Development Timeline:** 24 hours  
**Target Network:** Polkadot AssetHub Testnet

MEMEChain is a Web3-powered meme generator that allows users to create custom memes and optionally mint them as NFTs on the Polkadot blockchain. This creates verifiable ownership and uniqueness for meme creators, bringing real-world utility to Web3 technology.

---

## 1. Problem Statement

**Current State:**
- Traditional meme generators don't provide proof of original creation
- Memes go viral without attribution to original creators
- No way to verify "first meme" or original creator
- Creators cannot prove ownership or claim credit

**MEMEChain Solution:**
- Blockchain-verified meme creation timestamps
- Immutable proof of ownership via NFTs
- IPFS storage for permanent meme preservation
- User controls their creative assets

---

## 2. Product Vision

### 2.1 Core Value Proposition
"Create memes like any other tool, but with the superpower to prove you made it first - forever recorded on the blockchain."

### 2.2 Target Users
- **Primary:** Meme creators who want credit for viral content
- **Secondary:** NFT enthusiasts exploring practical Web3 use cases
- **Tertiary:** Polkadot hackathon judges evaluating real-world Web3 applications

### 2.3 Success Metrics
- Working meme editor with 5+ customization options
- Successful NFT minting on AssetHub testnet
- End-to-end demo: Create → Edit → Mint → Verify
- Clean, intuitive UI requiring minimal instructions

---

## 3. User Stories

### Epic 1: Meme Creation (Traditional Web2 Experience)
**US-1.1:** As a user, I want to upload an image so I can use it as my meme template  
**US-1.2:** As a user, I want to add text at the top and bottom so I can create classic meme format  
**US-1.3:** As a user, I want to customize font, size, and color so my text stands out  
**US-1.4:** As a user, I want to add text shadows/outlines so text is readable on any background  
**US-1.5:** As a user, I want to download my meme as PNG so I can share it anywhere  

### Epic 2: Web3 Integration (The Innovation)
**US-2.1:** As a user, I want to connect my Polkadot wallet so I can mint NFTs  
**US-2.2:** As a user, I want to see testnet token balance so I know I can afford minting  
**US-2.3:** As a user, I want to mint my meme as NFT with one click so ownership is recorded  
**US-2.4:** As a user, I want to see transaction confirmation so I know my NFT was created  
**US-2.5:** As a user, I want to view my meme on blockchain explorer so I can verify ownership  

### Epic 3: User Experience
**US-3.1:** As a user, I want clear instructions so I understand both Web2 and Web3 options  
**US-3.2:** As a user, I want to use the app without wallet connection for basic meme creation  
**US-3.3:** As a user, I want helpful error messages so I can fix issues myself  
**US-3.4:** As a user, I want a responsive design so I can use it on mobile or desktop  

---

## 4. Functional Requirements

### 4.1 Meme Editor Core Features

| Feature | Priority | Implementation |
|---------|----------|----------------|
| Image Upload | P0 (Must Have) | File input → Canvas rendering |
| Top/Bottom Text | P0 (Must Have) | Canvas text overlay with positioning |
| Font Selection | P1 (Should Have) | 3-5 meme-friendly fonts |
| Text Color | P0 (Must Have) | Color picker input |
| Font Size | P1 (Should Have) | Slider control (20-80px) |
| Text Shadow | P0 (Must Have) | CSS text-shadow on canvas |
| Text Outline/Stroke | P0 (Must Have) | Canvas strokeText for readability |
| Text Positioning | P2 (Nice to Have) | Drag to reposition (if time permits) |
| Download Meme | P0 (Must Have) | Canvas.toBlob → Download |
| Reset/Clear | P1 (Should Have) | Clear canvas and inputs |

### 4.2 Blockchain Integration Features

| Feature | Priority | Implementation |
|---------|----------|----------------|
| Wallet Connection | P0 (Must Have) | Polkadot.js extension detection |
| Network Selection | P0 (Must Have) | Auto-connect to AssetHub testnet |
| Balance Display | P1 (Should Have) | Query user's testnet token balance |
| IPFS Upload | P0 (Must Have) | Pinata API integration |
| NFT Minting | P0 (Must Have) | AssetHub NFT pallet calls |
| Transaction Status | P0 (Must Have) | Loading states + confirmation |
| Explorer Link | P1 (Should Have) | Link to Polkadot.js explorer |
| Metadata Storage | P0 (Must Have) | Store meme title, creator, timestamp |

### 4.3 Technical Specifications

**Frontend:**
- Framework: React 18+
- Styling: Tailwind CSS
- Canvas Library: Native HTML5 Canvas API
- State Management: React useState/useContext

**Blockchain:**
- Network: Polkadot AssetHub Westend Testnet
- Wallet: Polkadot.js extension (Talisman, SubWallet compatible)
- API: @polkadot/api, @polkadot/extension-dapp
- NFT Standard: AssetHub Uniques pallet

**Storage:**
- Image Storage: IPFS via Pinata (Free tier: 100GB)
- Metadata: JSON on IPFS
- On-chain: IPFS CID + metadata reference

**Deployment:**
- Hosting: Vercel or Netlify (Free tier)
- Domain: Provided subdomain or custom if available

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Canvas rendering: < 100ms for text updates
- Image upload: Support up to 10MB files
- IPFS upload: Complete within 5 seconds
- NFT minting: Transaction submission within 3 seconds
- Page load: < 2 seconds on 3G connection

### 5.2 Security
- Client-side only wallet interaction (no private key handling)
- IPFS uploads use API keys (environment variables)
- No server-side storage of user data
- Testnet only (no real asset risk)

### 5.3 Usability
- Mobile-responsive design (breakpoints: 768px, 1024px)
- Accessible color contrast (WCAG AA minimum)
- Clear error messages with actionable guidance
- Maximum 3 clicks to mint NFT from editor

### 5.4 Compatibility
- Browser: Chrome, Firefox, Brave (latest 2 versions)
- Wallet: Polkadot.js extension, Talisman, SubWallet
- OS: Windows, macOS, Linux, iOS, Android

---

## 6. User Flow Diagrams

### 6.1 Main User Journey

```
START
  ↓
[Landing Page]
  ↓
[Upload Image] ← User selects image file
  ↓
[Meme Editor Canvas]
  ├→ Add Top Text
  ├→ Add Bottom Text
  ├→ Customize (Font, Color, Size, Shadow)
  ↓
[Preview Meme]
  ↓
User Decision Point
  ├→ [Download PNG] → END (Web2 path)
  │
  └→ [Mint as NFT] → [Connect Wallet]
       ↓
     Wallet Connected?
       ├→ No → [Install Extension Guide] → Retry
       │
       └→ Yes → [Check Balance]
            ↓
          Sufficient Balance?
            ├→ No → [Faucet Link] → Retry
            │
            └→ Yes → [Upload to IPFS]
                 ↓
               [Create NFT Transaction]
                 ↓
               [Sign with Wallet]
                 ↓
               [Transaction Confirmed]
                 ↓
               [Show Explorer Link + NFT ID]
                 ↓
               END (Web3 path)
```

### 6.2 Error Handling Flow

```
Error Occurs
  ↓
Identify Error Type
  ├→ No Wallet Extension → Show "Install Polkadot.js" modal
  ├→ Wrong Network → Show "Switch to AssetHub" instruction
  ├→ Insufficient Balance → Show faucet link
  ├→ IPFS Upload Failed → Retry button + error message
  ├→ Transaction Rejected → "User cancelled" message
  └→ Unknown Error → Show error + "Try Again" button
```

---

## 7. Technical Architecture

### 7.1 System Architecture

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
┌──────────────────┐    ┌──────────────────────┐
│  IPFS (Pinata)   │    │  Polkadot AssetHub   │
│  - Image Storage │    │  - NFT Minting       │
│  - Metadata      │    │  - Ownership Records │
└──────────────────┘    └──────────────────────┘
```

### 7.2 Data Models

**Meme Metadata (Stored on IPFS)**
```json
{
  "name": "Epic Doge Meme #42",
  "description": "A legendary meme created on MEMEChain",
  "image": "ipfs://QmX...",
  "attributes": [
    {
      "trait_type": "Creator",
      "value": "0x1234...5678"
    },
    {
      "trait_type": "Created",
      "value": "2025-11-16T10:30:00Z"
    },
    {
      "trait_type": "Top Text",
      "value": "SUCH WOW"
    },
    {
      "trait_type": "Bottom Text",
      "value": "VERY BLOCKCHAIN"
    }
  ]
}
```

**NFT On-Chain Data**
```javascript
{
  collectionId: 1001, // MEMEChain collection
  itemId: 42,         // Unique meme ID
  owner: "5GrwvaEF...", // Polkadot address
  metadata: "ipfs://QmY...", // Points to metadata JSON
  issuer: "5GrwvaEF...", // Creator address
}
```

### 7.3 Component Structure

```
src/
├── components/
│   ├── MemeEditor.jsx         # Main editor canvas
│   ├── TextControls.jsx       # Font, color, size controls
│   ├── WalletConnect.jsx      # Polkadot wallet integration
│   ├── MintButton.jsx         # NFT minting logic
│   ├── ImageUpload.jsx        # File upload handler
│   └── Header.jsx             # App header with branding
├── hooks/
│   ├── usePolkadot.js         # Wallet connection hook
│   ├── useIPFS.js             # IPFS upload hook
│   └── useMemeCanvas.js       # Canvas manipulation hook
├── utils/
│   ├── canvasHelpers.js       # Text rendering utilities
│   ├── ipfsUpload.js          # Pinata API calls
│   └── nftMinting.js          # AssetHub NFT creation
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

---

## 8. API Integrations

### 8.1 Polkadot.js API

**Connection Setup:**
```javascript
import { ApiPromise, WsProvider } from '@polkadot/api';

const ASSETHUB_TESTNET = 'wss://westmint-rpc.polkadot.io';
const api = await ApiPromise.create({ 
  provider: new WsProvider(ASSETHUB_TESTNET) 
});
```

**NFT Minting Call:**
```javascript
const mint = api.tx.uniques.mint(
  collectionId,    // Collection ID
  itemId,          // Unique item ID
  owner            // Owner address
);

await mint.signAndSend(account, ({ status }) => {
  if (status.isInBlock) {
    console.log('Minted in block:', status.asInBlock.toHex());
  }
});
```

### 8.2 Pinata IPFS API

**Upload Image:**
```javascript
const formData = new FormData();
formData.append('file', imageBlob);

const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${PINATA_JWT}`
  },
  body: formData
});

const { IpfsHash } = await response.json();
// Returns: QmX1234...
```

**Upload Metadata:**
```javascript
const metadata = {
  name: 'Epic Meme',
  image: `ipfs://${imageHash}`,
  attributes: [...]
};

const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${PINATA_JWT}`
  },
  body: JSON.stringify(metadata)
});
```

---

## 9. UI/UX Specifications

### 9.1 Color Palette

```css
Primary: #E6007A (Polkadot Pink)
Secondary: #552BBF (Polkadot Purple)
Background: #1A1A1A (Dark)
Surface: #2D2D2D (Card background)
Text Primary: #FFFFFF
Text Secondary: #A0A0A0
Success: #00D084
Error: #FF4444
Warning: #FFA726
```

### 9.2 Typography

- **Headings:** Inter Bold (32px, 24px, 18px)
- **Body:** Inter Regular (16px, 14px)
- **Meme Text Fonts:**
  - Impact (Classic meme style)
  - Anton (Bold and modern)
  - Bebas Neue (Clean and edgy)

### 9.3 Key Screens

**Screen 1: Landing/Editor**
```
┌────────────────────────────────────────────┐
│  MEMEChain 🎨                    [Connect] │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  │      [Upload Image or Drop Here]    │ │
│  │                                      │ │
│  │           Canvas Preview Area        │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Top Text: [___________________]           │
│  Bottom Text: [___________________]        │
│                                            │
│  Font: [Impact ▾]  Size: [━━━●━━] 48px   │
│  Color: [●] #FFFFFF  Shadow: [✓]          │
│                                            │
│  [Download PNG]        [Mint as NFT →]    │
└────────────────────────────────────────────┘
```

**Screen 2: Wallet Connected**
```
┌────────────────────────────────────────────┐
│  MEMEChain 🎨         [5Grw...EF5] 10 WND │
├────────────────────────────────────────────┤
│  [✓] Wallet Connected to AssetHub Testnet │
│                                            │
│  [Canvas with meme preview]                │
│                                            │
│  Ready to mint your meme!                  │
│  Network Fee: ~0.01 WND                    │
│                                            │
│  [Download PNG]    [Mint NFT for 0.01 WND]│
└────────────────────────────────────────────┘
```

**Screen 3: Minting Success**
```
┌────────────────────────────────────────────┐
│  🎉 Meme Minted Successfully!              │
├────────────────────────────────────────────┤
│                                            │
│  Your meme is now on the blockchain!       │
│                                            │
│  Collection: #1001                         │
│  Item ID: #42                              │
│  IPFS: QmX1234...                          │
│                                            │
│  [View on Explorer]  [Create Another]     │
└────────────────────────────────────────────┘
```

---

## 10. Development Roadmap (24-Hour Sprint)

### Phase 1: Foundation (Hours 0-6)

**Hour 0-1: Project Setup**
- [ ] Initialize React + Vite project
- [ ] Install dependencies (Polkadot.js, Tailwind)
- [ ] Set up environment variables
- [ ] Create basic component structure

**Hour 1-3: Meme Editor Core**
- [ ] Implement image upload with preview
- [ ] Set up HTML5 Canvas
- [ ] Add top/bottom text input fields
- [ ] Render text on canvas with Impact font

**Hour 3-5: Text Styling**
- [ ] Font selector (3 fonts minimum)
- [ ] Color picker for text
- [ ] Font size slider
- [ ] Text shadow/outline implementation

**Hour 5-6: Download Feature**
- [ ] Canvas to PNG conversion
- [ ] Download button implementation
- [ ] Test various image formats

### Phase 2: Blockchain Integration (Hours 6-14)

**Hour 6-8: Wallet Connection**
- [ ] Detect Polkadot.js extension
- [ ] Connect to AssetHub testnet
- [ ] Display connected address
- [ ] Fetch and show balance

**Hour 8-10: IPFS Integration**
- [ ] Set up Pinata account and API keys
- [ ] Implement image upload to IPFS
- [ ] Create metadata JSON structure
- [ ] Upload metadata to IPFS

**Hour 10-12: NFT Minting**
- [ ] Research AssetHub Uniques pallet
- [ ] Implement collection creation (if needed)
- [ ] Write NFT minting transaction
- [ ] Test with testnet tokens

**Hour 12-14: Transaction Handling**
- [ ] Add loading states for minting
- [ ] Handle transaction success/failure
- [ ] Display transaction hash
- [ ] Link to blockchain explorer

### Phase 3: Polish & Testing (Hours 14-20)

**Hour 14-16: UI/UX Refinement**
- [ ] Responsive design (mobile + desktop)
- [ ] Add animations and loading spinners
- [ ] Improve error messages
- [ ] Add helpful tooltips

**Hour 16-18: Error Handling**
- [ ] No wallet extension modal
- [ ] Wrong network detection
- [ ] Insufficient balance warning
- [ ] IPFS upload retry logic

**Hour 18-20: Testing**
- [ ] Test full flow: Upload → Edit → Download
- [ ] Test full flow: Upload → Edit → Mint → Verify
- [ ] Test on different browsers
- [ ] Test error scenarios

### Phase 4: Deployment & Documentation (Hours 20-24)

**Hour 20-21: Deployment**
- [ ] Deploy to Vercel/Netlify
- [ ] Configure environment variables
- [ ] Test production build

**Hour 21-23: Documentation**
- [ ] Write README with setup instructions
- [ ] Create user guide (how to get testnet tokens)
- [ ] Document architecture and tech decisions
- [ ] Prepare demo script

**Hour 23-24: Demo Preparation**
- [ ] Create demo video (2-3 minutes)
- [ ] Prepare screenshots for submission
- [ ] Test entire flow one final time
- [ ] Submit to hackathon

---

## 11. Testing Strategy

### 11.1 Manual Testing Checklist

**Meme Editor:**
- [ ] Upload JPG, PNG, GIF images
- [ ] Add text to top and bottom
- [ ] Change font family
- [ ] Adjust font size (min/max)
- [ ] Change text color
- [ ] Toggle text shadow
- [ ] Download meme as PNG
- [ ] Clear and start over

**Wallet Integration:**
- [ ] Connect with Polkadot.js extension
- [ ] Connect with Talisman wallet
- [ ] Disconnect and reconnect
- [ ] Display correct balance
- [ ] Handle wallet rejection

**NFT Minting:**
- [ ] Upload meme to IPFS
- [ ] Create NFT transaction
- [ ] Sign transaction
- [ ] Confirm on-chain
- [ ] View on explorer

**Edge Cases:**
- [ ] No wallet extension installed
- [ ] Wrong network selected
- [ ] Zero testnet token balance
- [ ] IPFS upload timeout
- [ ] Transaction failure

### 11.2 User Acceptance Criteria

**Must Pass:**
1. User can create a meme without wallet connection
2. User can download meme as PNG
3. User can connect Polkadot wallet
4. User can mint meme as NFT on testnet
5. NFT appears on blockchain explorer

**Should Pass:**
6. Mobile responsive design works
7. Error messages are clear and helpful
8. App loads in < 3 seconds
9. Minting completes in < 30 seconds

---

## 12. Known Limitations & Future Enhancements

### 12.1 Current Limitations (v1.0)
- Testnet only (no mainnet support)
- Limited to 3-5 fonts
- Text positioning is top/bottom only (no drag-and-drop)
- No image filters or advanced editing
- Collection must be pre-created by admin
- No gallery to view all minted memes

### 12.2 Future Enhancements (Post-Hackathon)

**Version 1.1:**
- [ ] Draggable text positioning
- [ ] Multiple text layers
- [ ] Pre-made meme templates
- [ ] Image filters (grayscale, sepia, etc.)
- [ ] Sticker/emoji overlays

**Version 2.0:**
- [ ] Mainnet deployment (Polkadot AssetHub)
- [ ] Public meme gallery
- [ ] Social sharing features
- [ ] Meme leaderboard (most minted templates)
- [ ] Creator royalties on secondary sales

**Version 3.0:**
- [ ] Cross-chain minting (mint to multiple parachains)
- [ ] AI-powered meme suggestions
- [ ] Collaborative meme editing
- [ ] MEMEChain token for governance
- [ ] Meme marketplace

---

## 13. Success Criteria

### 13.1 Minimum Viable Product (MVP)
✅ User can upload image  
✅ User can add top/bottom text with styling  
✅ User can download meme  
✅ User can connect Polkadot wallet  
✅ User can mint meme as NFT on testnet  
✅ NFT is verifiable on blockchain explorer  

### 13.2 Hackathon Submission Requirements
✅ Working demo deployed online  
✅ GitHub repository with code  
✅ README with setup instructions  
✅ Demo video (2-5 minutes)  
✅ Uses Polkadot technology stack  
✅ Demonstrates real-world Web3 utility  

### 13.3 Judging Criteria Alignment

**Radically Open:**
- Open-source code on GitHub
- Public testnet deployment
- Clear documentation for contributors

**Radically Useful:**
- Solves real problem (meme attribution)
- Intuitive UX (Web2 users can understand)
- Works end-to-end without blockchain knowledge required

---

## 14. Risk Assessment & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| IPFS upload failure | High | Medium | Retry logic + alternative provider (Web3.Storage) |
| AssetHub testnet downtime | High | Low | Monitor network status, have backup recording |
| Wallet extension bugs | Medium | Medium | Support multiple wallets (Polkadot.js, Talisman) |
| Time overrun on features | Medium | High | Prioritize P0 features first, cut P2 if needed |
| Insufficient testnet tokens | Low | Low | Use faucet early, request extras in Discord |
| Browser compatibility issues | Medium | Medium | Test on Chrome/Firefox early, stick to standard APIs |

---

## 15. Resources & References

### 15.1 Essential Links

**Polkadot Documentation:**
- Hackathon Guide: https://github.com/polkadot-developers/hackathon-guide
- Polkadot.js API Docs: https://polkadot.js.org/docs/
- AssetHub Guide: https://wiki.polkadot.network/docs/learn-asset-hub

**Development Tools:**
- Testnet Faucet: https://faucet.polkadot.io/
- Block Explorer: https://polkadot.js.org/apps/?rpc=wss://westmint-rpc.polkadot.io
- Pinata IPFS: https://www.pinata.cloud/

**Community Support:**
- Polkadot Discord: https://dot.li/discord
- StackExchange: https://substrate.stackexchange.com/

### 15.2 Code Examples
- Polkadot NFT Tutorial: https://docs.substrate.io/tutorials/collectibles-workshop/
- Canvas Meme Editor: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

## 16. Team & Responsibilities

**Solo Developer (24-Hour Sprint):**

| Time Block | Focus Area |
|------------|------------|
| Hours 0-6 | Frontend meme editor development |
| Hours 6-14 | Blockchain integration & IPFS |
| Hours 14-20 | Testing, polish, error handling |
| Hours 20-24 | Deployment, documentation, demo |

**Break Schedule:**
- Hour 6: 15-min break
- Hour 12: 30-min meal break
- Hour 18: 15-min break
- Maintain energy with short walks and hydration

---

## 17. Appendix

### 17.1 Glossary

**AssetHub:** Polkadot's system parachain for creating and managing assets and NFTs  
**Canvas API:** HTML5 API for drawing graphics via JavaScript  
**IPFS:** InterPlanetary File System - decentralized storage protocol  
**NFT:** Non-Fungible Token - unique digital asset on blockchain  
**Pallet:** Modular component in Substrate blockchain framework  
**Parachain:** Independent blockchain connected to Polkadot relay chain  
**Uniques Pallet:** Substrate module for creating NFTs  
**Westend:** Polkadot's testnet for development and testing  

### 17.2 Environment Variables

```env
# .env file
VITE_PINATA_JWT=your_pinata_jwt_token
VITE_POLKADOT_RPC=wss://westmint-rpc.polkadot.io
VITE_COLLECTION_ID=1001
```

### 17.3 Useful Commands

```bash
# Development
npm install
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Get testnet tokens
# Visit: https://faucet.polkadot.io/

# Check AssetHub balance
# Visit: https://polkadot.js.org/apps/?rpc=wss://westmint-rpc.polkadot.io
```

---

## Document Control

**Version:** 1.0  
**Last Updated:** November 16, 2025  
**Author:** MEMEChain Development Team  
**Status:** Approved for Implementation  
**Next Review:** Post-Hackathon Retrospective

---

**Let's build MEMEChain - Where memes meet blockchain! 🚀**