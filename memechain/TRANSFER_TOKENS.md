# How to Transfer PAS Tokens from AssetHub to Relay Chain

## The Problem

You have 10,000 PAS tokens on **Paseo AssetHub** (parachain), but the app needs tokens on **Paseo Relay Chain** (main chain) to submit transactions.

## Solution: Transfer Tokens

### Using Polkadot.js Apps

1. **Go to Polkadot.js Apps:**
   - Visit: https://polkadot.js.org/apps/?rpc=wss://paseo-asset-hub-rpc.polkadot.io

2. **Navigate to Accounts:**
   - Click "Accounts" in the top menu
   - You should see your account with 10,000 PAS

3. **Send Tokens to Relay Chain:**
   - Click the "Send" button next to your account
   - In "send to address", enter your SAME address
   - Amount: 100 PAS (keep some for fees)
   - Destination chain: Select "Paseo Relay Chain"
   - Click "Make Transfer"
   - Sign the transaction

4. **Wait for Transfer:**
   - Wait 1-2 minutes for the cross-chain transfer
   - Check your balance on Relay Chain

5. **Verify on Relay Chain:**
   - Go to: https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com
   - Check your account balance
   - You should now have ~100 PAS on Relay Chain

### Alternative: Use SubWallet

1. Open SubWallet extension
2. Select your account
3. Click "Send"
4. Select destination: Paseo (Relay Chain)
5. Enter your same address
6. Amount: 100 PAS
7. Confirm and sign

## After Transfer

1. Refresh the MEMEChain app
2. Connect your wallet
3. Your balance should now show correctly
4. You can submit memes to the blockchain!

---

**Note:** You only need to do this once. After the transfer, you'll have tokens on both chains.
