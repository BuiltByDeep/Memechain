# MEMEChain - Quick Commands Reference

## Development Commands

### Start Development Server
```bash
cd memechain
npm run dev
```
Opens at `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build
```
Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Test production build locally

### Lint Code
```bash
npm run lint
```
Check for code quality issues

## Installation Commands

### Initial Setup
```bash
# Clone repository
git clone <your-repo-url>
cd memechain

# Install dependencies
npm install

# Start development
npm run dev
```

### Add Dependencies
```bash
# Already installed:
npm install @polkadot/api @polkadot/extension-dapp
npm install -D tailwindcss postcss autoprefixer
```

## Git Commands

### Initial Commit
```bash
git init
git add .
git commit -m "Initial commit - MEMEChain meme generator"
```

### Push to GitHub
```bash
git remote add origin <your-github-url>
git branch -M main
git push -u origin main
```

### Update Repository
```bash
git add .
git commit -m "Your commit message"
git push
```

## Deployment Commands

### Deploy to Vercel (CLI)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify (CLI)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Testing Commands

### Test Wallet Connection
```bash
# Open browser console and run:
window.injectedWeb3
# Should show available wallet extensions
```

### Check Build Size
```bash
npm run build
du -sh dist/
```

### Test Production Build Locally
```bash
npm run build
npm run preview
# Open http://localhost:4173
```

## Maintenance Commands

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update <package-name>
```

### Clean Install
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear Vite cache
rm -rf node_modules/.vite
```

## Environment Setup

### Create Environment File
```bash
cp .env.example .env
# Edit .env with your values
```

### Environment Variables
```bash
# Add to .env file:
VITE_PINATA_JWT=your_pinata_jwt_token
VITE_POLKADOT_RPC=wss://westmint-rpc.polkadot.io
VITE_COLLECTION_ID=1001
```

## Debugging Commands

### Check Node Version
```bash
node --version
# Should be 18.x or higher
```

### Check npm Version
```bash
npm --version
```

### View Package Info
```bash
npm list @polkadot/api
npm list react
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

## Polkadot Commands

### Get Testnet Tokens
```bash
# Visit in browser:
open https://faucet.polkadot.io/
```

### Check AssetHub Explorer
```bash
# Visit in browser:
open https://polkadot.js.org/apps/?rpc=wss://westmint-rpc.polkadot.io
```

## Useful Shortcuts

### Development
- `Ctrl + C` - Stop dev server
- `Ctrl + R` - Reload browser
- `Cmd/Ctrl + Shift + I` - Open DevTools

### Vite Dev Server
- `r + Enter` - Restart server
- `u + Enter` - Show server URL
- `o + Enter` - Open in browser
- `q + Enter` - Quit server
- `h + Enter` - Show help

## Quick Fixes

### Port Already in Use
```bash
# Vite will automatically use next port
# Or kill process on port 5173:
lsof -ti:5173 | xargs kill -9
```

### Module Not Found
```bash
npm install
# or
rm -rf node_modules && npm install
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite dist
npm run build
```

### Wallet Not Connecting
```bash
# Check if extension is installed
# Refresh page
# Check browser console for errors
```

## Performance Testing

### Measure Build Time
```bash
time npm run build
```

### Measure Bundle Size
```bash
npm run build
ls -lh dist/assets/
```

### Test Load Speed
```bash
# Use browser DevTools Network tab
# Or use Lighthouse
```

## Documentation Commands

### Generate Component List
```bash
find src/components -name "*.jsx" -type f
```

### Count Lines of Code
```bash
find src -name "*.jsx" -o -name "*.js" | xargs wc -l
```

### List All Dependencies
```bash
npm list --depth=0
```

## Backup Commands

### Backup Project
```bash
tar -czf memechain-backup-$(date +%Y%m%d).tar.gz memechain/
```

### Restore from Backup
```bash
tar -xzf memechain-backup-YYYYMMDD.tar.gz
```

## CI/CD Commands (GitHub Actions)

### Create Workflow File
```bash
mkdir -p .github/workflows
# Add deploy.yml file
```

### Example GitHub Actions Workflow
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Monitoring Commands

### Watch Build Output
```bash
npm run build -- --watch
```

### Monitor File Changes
```bash
watch -n 1 'ls -lh dist/'
```

### Check Memory Usage
```bash
node --max-old-space-size=4096 node_modules/.bin/vite build
```

## Quick Reference

### Most Used Commands
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run preview      # Preview production build
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

### Emergency Commands
```bash
# If everything breaks:
rm -rf node_modules package-lock.json
npm install
npm run dev

# If git breaks:
git reset --hard HEAD
git clean -fd

# If deployment breaks:
vercel --prod --force
# or
netlify deploy --prod --force
```

---

**Pro Tip:** Bookmark this file for quick reference during development! 📚
