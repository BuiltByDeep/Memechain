# MEMEChain - Usage Guide

## Quick Start (No Blockchain Required)

### Creating Your First Meme

1. **Upload an Image**
   - Click "Upload Image or Drop Here"
   - Select a JPG, PNG, or GIF file (max 10MB)
   - Your image will appear in the preview

2. **Add Text**
   - Type your text in "Top Text" field
   - Type your text in "Bottom Text" field
   - Text appears in real-time on your meme

3. **Customize (Optional)**
   - Choose font: Impact, Arial Black, or Anton
   - Pick a color with the color picker
   - Adjust font size with the slider
   - Toggle text shadow for better readability

4. **Download**
   - Click "📥 Download PNG"
   - Your meme saves to your downloads folder
   - Share it anywhere!

## Blockchain Features (Requires Wallet)

### Why Store on Blockchain?

- **Proof of Creation**: Permanent timestamp of when you created the meme
- **Immutable**: Can't be deleted or altered
- **Verifiable**: Anyone can check the blockchain to verify
- **Decentralized**: No central server can take it down

### Setup Your Wallet

1. **Install Polkadot.js Extension**
   - Chrome: https://chrome.google.com/webstore (search "Polkadot.js")
   - Firefox: https://addons.mozilla.org (search "Polkadot.js")

2. **Create an Account**
   - Open the extension
   - Click "+" to create new account
   - Save your seed phrase securely!
   - Give your account a name

3. **Get Testnet Tokens**
   - Visit: https://faucet.polkadot.io/paseo
   - Select "Paseo" network
   - Paste your wallet address
   - Click "Get Tokens"
   - Wait 30 seconds for tokens to arrive

### Submit Your Meme to Blockchain

1. **Connect Wallet**
   - Click "Connect Wallet" button in the header
   - Approve the connection in the popup
   - Your address will appear in the header

2. **Create Your Meme**
   - Upload image and add text as described above

3. **Submit to Blockchain**
   - Click "🚀 Submit to Blockchain"
   - Review the transaction in your wallet popup
   - Click "Sign the transaction"
   - Wait 10-30 seconds for confirmation

4. **View Confirmation**
   - Transaction hash appears on screen
   - Block number shows where it's stored
   - Click "View on Block Explorer" to verify

### What Gets Stored?

The blockchain stores this metadata:
```json
{
  "type": "MEME",
  "version": "1.0",
  "topText": "Your top text",
  "bottomText": "Your bottom text",
  "timestamp": 1234567890,
  "creator": "Your wallet address",
  "appVersion": "1.0.0"
}
```

**Note**: The actual image is NOT stored on-chain (too expensive). Only the text metadata is stored, which proves you created this meme at this specific time.

## Verifying Your Meme on Blockchain

### Using Block Explorer

1. After submission, click "View on Block Explorer"
2. You'll see your transaction details
3. Look for the "system.Remarked" event
4. Your metadata is in the remark data

### Manual Verification

1. Go to: https://polkadot.js.org/apps/?rpc=wss://paseo-asset-hub-rpc.polkadot.io
2. Navigate to: Network > Explorer
3. Search for your transaction hash
4. Click on the transaction
5. Find the "system.Remarked" event
6. See your meme metadata!

## Troubleshooting

### "No Polkadot extension found"
- Install the Polkadot.js extension
- Refresh the page
- Try again

### "No accounts found"
- Create an account in your extension
- Make sure the extension is unlocked
- Refresh the page

### "Insufficient balance"
- Get tokens from the faucet: https://faucet.polkadot.io/paseo
- Wait 30 seconds for tokens to arrive
- Check your balance in the extension

### "Transaction failed"
- Make sure you have enough tokens (need ~0.01 PAS)
- Check if the network is online
- Try again in a few moments

### "Blockchain connection not ready"
- Wait a few seconds for the connection to establish
- Look for the green "Connected to Paseo" banner
- Refresh the page if it doesn't connect

### Canvas not rendering
- Try a smaller image (< 5MB)
- Use JPG or PNG format
- Refresh the page

## Tips & Best Practices

### Creating Great Memes

1. **Use High-Contrast Images**
   - White text shows best on dark backgrounds
   - Use text shadow for light backgrounds

2. **Keep Text Short**
   - Top text: 1-3 words works best
   - Bottom text: 1-5 words
   - Longer text gets smaller

3. **Classic Meme Format**
   - Impact font is the traditional meme font
   - All caps for maximum impact
   - White text with black outline

### Blockchain Submissions

1. **Test First**
   - Create and download a few memes first
   - Make sure you're happy with it
   - Then submit to blockchain

2. **Save Your Transaction Hash**
   - Copy the hash after submission
   - Save it somewhere safe
   - You can always look it up later

3. **Verify Immediately**
   - Click "View on Block Explorer" right away
   - Make sure your transaction succeeded
   - Screenshot the confirmation

## Advanced Features

### Multiple Accounts

If you have multiple Polkadot accounts:
1. The app uses the first account by default
2. To switch accounts, change it in your extension
3. Refresh the page
4. Connect wallet again

### Sharing Your Blockchain Proof

To prove your meme is on-chain:
1. Share your transaction hash
2. Share the block explorer link
3. Anyone can verify it independently

### Future Enhancements

Coming soon:
- IPFS integration for full image storage
- NFT minting option
- Gallery of all submitted memes
- Social sharing features

## FAQ

**Q: Does it cost money?**
A: No! We use testnet tokens which are free from the faucet.

**Q: Is my meme stored forever?**
A: Yes! Once on the blockchain, it's permanent and immutable.

**Q: Can I delete my meme?**
A: No, blockchain data is permanent. Think before you submit!

**Q: Do I need crypto knowledge?**
A: No! Just follow the steps above. It's designed to be simple.

**Q: What's the difference between download and blockchain?**
A: Download gives you the image file. Blockchain gives you proof of creation.

**Q: Can others see my memes?**
A: Yes, blockchain data is public. Anyone can view transactions.

**Q: Why Paseo testnet?**
A: It's a test network, so it's free and safe to experiment with.

**Q: Will this work on mainnet?**
A: Yes, but you'd need real tokens. For now, we use testnet.

## Support

Need help?
- Check the troubleshooting section above
- Ask in Polkadot Discord: https://dot.li/discord
- Open an issue on GitHub

---

Happy meme creating! 🎨✨
