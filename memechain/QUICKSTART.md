# MEMEChain - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install & Run
```bash
cd memechain
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Create Your First Meme

**Without Wallet (Web2 Mode):**
1. Upload an image (drag & drop or click)
2. Add top and bottom text
3. Customize font, color, and size
4. Click "Download PNG"

**With Wallet (Web3 Mode):**
1. Click "Connect Wallet" (install [Polkadot.js extension](https://polkadot.js.org/extension/) first)
2. Get testnet tokens from [faucet](https://faucet.polkadot.io/)
3. Create your meme
4. Click "Mint as NFT"
5. Sign the transaction

### 3. Test the Full Flow

**Demo Mode (Current):**
- The app simulates IPFS uploads and NFT minting
- No real blockchain transactions yet
- Perfect for testing the UI/UX

**Production Mode (Next Steps):**
1. Get Pinata API key from [pinata.cloud](https://www.pinata.cloud/)
2. Add to `.env`: `VITE_PINATA_JWT=your_jwt_token`
3. Implement actual NFT minting in `usePolkadot.js`
4. Deploy to Vercel/Netlify

## 📦 What's Included

✅ Full meme editor with canvas
✅ Text customization (fonts, colors, shadows)
✅ Image upload and download
✅ Polkadot wallet integration
✅ Responsive design
✅ Tailwind CSS styling
✅ Demo IPFS and NFT minting

## 🔧 Next Steps for Production

1. **IPFS Integration:**
   - Sign up for Pinata
   - Add JWT token to `.env`
   - Uncomment IPFS upload code in `useIPFS.js`

2. **NFT Minting:**
   - Create or use existing NFT collection on AssetHub
   - Update collection ID in `.env`
   - Implement actual minting in `usePolkadot.js`

3. **Testing:**
   - Test with real testnet tokens
   - Verify NFTs on blockchain explorer
   - Test error scenarios

4. **Deploy:**
   ```bash
   npm run build
   # Deploy dist/ folder to Vercel/Netlify
   ```

## 🎯 Key Features to Demo

1. **Meme Creation:** Show how easy it is to create memes
2. **Customization:** Demonstrate font, color, size options
3. **Download:** Export as PNG for traditional sharing
4. **Web3 Integration:** Connect wallet and show minting flow
5. **Responsive Design:** Test on mobile and desktop

## 🐛 Common Issues

**Port already in use:**
- Vite will automatically use next available port
- Check terminal output for actual port number

**Wallet not connecting:**
- Install Polkadot.js extension
- Create an account in the extension
- Refresh the page

**No testnet tokens:**
- Visit https://faucet.polkadot.io/
- Select "Westend" network
- Request tokens for your address

## 📚 Resources

- [Polkadot.js Extension](https://polkadot.js.org/extension/)
- [AssetHub Documentation](https://wiki.polkadot.network/docs/learn-asset-hub)
- [Pinata IPFS](https://www.pinata.cloud/)
- [Polkadot Faucet](https://faucet.polkadot.io/)

---

Happy meme creating! 🎨
