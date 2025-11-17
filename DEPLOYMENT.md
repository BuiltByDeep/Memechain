# MEMEChain - Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Steps

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - MEMEChain"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables (if using production IPFS):
     - `VITE_PINATA_JWT`: Your Pinata JWT token
     - `VITE_POLKADOT_RPC`: `wss://westmint-rpc.polkadot.io`
     - `VITE_COLLECTION_ID`: Your collection ID
   - Click "Deploy"

3. **Access Your App:**
   - Vercel will provide a URL like `memechain.vercel.app`
   - Share this URL for testing and demos

## Deploying to Netlify

### Steps

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repo for automatic deployments

3. **Configure Environment Variables:**
   - Go to Site Settings > Environment Variables
   - Add the same variables as Vercel

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## Production Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Add Pinata API key for real IPFS uploads
- [ ] Implement actual NFT minting (not demo mode)
- [ ] Test with real testnet tokens
- [ ] Verify NFTs appear on blockchain explorer
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Add error tracking (Sentry, etc.)
- [ ] Set up analytics (optional)
- [ ] Update README with live demo link

## Environment Variables

Required for production:

```env
VITE_PINATA_JWT=your_pinata_jwt_token_here
VITE_POLKADOT_RPC=wss://westmint-rpc.polkadot.io
VITE_COLLECTION_ID=1001
```

## Monitoring

After deployment:

1. **Check Logs:**
   - Vercel: Project > Deployments > View Function Logs
   - Netlify: Deploys > Deploy Log

2. **Test Features:**
   - Image upload
   - Meme creation
   - Download functionality
   - Wallet connection
   - NFT minting

3. **Monitor Performance:**
   - Use Vercel Analytics or Netlify Analytics
   - Check Core Web Vitals
   - Monitor API usage (Pinata dashboard)

## Troubleshooting

**Build Fails:**
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors

**Environment Variables Not Working:**
- Ensure they start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

**Wallet Connection Issues:**
- Ensure HTTPS is enabled (required for wallet extensions)
- Check browser console for errors
- Verify Polkadot RPC endpoint is accessible

## Updating the App

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel/Netlify will auto-deploy (if connected)
5. Or manually trigger deployment

## Rollback

If something goes wrong:

**Vercel:**
- Go to Deployments
- Find previous working deployment
- Click "Promote to Production"

**Netlify:**
- Go to Deploys
- Find previous deploy
- Click "Publish deploy"

---

Good luck with your deployment! 🚀
