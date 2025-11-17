# Creating Your NFT Collection on Paseo AssetHub

Before you can mint memes as NFTs, you need to create an NFT collection on Paseo AssetHub.

## Prerequisites

1. Polkadot.js extension installed
2. Account with PAS tokens (get from https://faucet.polkadot.io/paseo)

## Steps to Create Collection

### Option 1: Using Polkadot.js Apps (Recommended)

1. **Go to Polkadot.js Apps for Paseo AssetHub:**
   - Visit: https://polkadot.js.org/apps/?rpc=wss://paseo-asset-hub-rpc.polkadot.io

2. **Navigate to Developer > Extrinsics**

3. **Create the Collection:**
   - Select your account
   - Choose extrinsic: `nfts` > `create`
   - Parameters:
     - `admin`: Your account address (same as selected account)
     - `config`: 
       - `settings`: Leave default or customize
       - `maxSupply`: Leave empty (unlimited) or set a number
       - `mintSettings`:
         - `mintType`: `Issuer` (only you can mint)
         - `price`: Leave empty (free minting)
         - `startBlock`: Leave empty
         - `endBlock`: Leave empty
         - `defaultItemSettings`: Leave default

4. **Submit Transaction:**
   - Click "Submit Transaction"
   - Sign in your wallet
   - Wait for confirmation

5. **Find Your Collection ID:**
   - After transaction is confirmed, go to **Network > Explorer**
   - Click on your recent transaction
   - Look for the event `nfts.Created`
   - Note the `collection` number - this is your **Collection ID**

6. **Update Your Code:**
   - Open `src/onchain/mintOnPaseo.js`
   - Replace `const COLLECTION_ID = 123;` with your actual collection ID
   - Example: `const COLLECTION_ID = 456;`

### Option 2: Using Code (Advanced)

If you prefer to create the collection programmatically:

```javascript
import { getApi } from './src/polkadotApi';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';

async function createCollection() {
  // Enable extension
  await web3Enable('MEMEChain');
  const accounts = await web3Accounts();
  const account = accounts[0];
  
  // Get API
  const api = await getApi();
  await api.isReady;
  
  // Get signer
  const injector = await web3FromSource(account.meta.source);
  api.setSigner(injector.signer);
  
  // Create collection
  const tx = api.tx.nfts.create(
    account.address, // admin
    {
      settings: 0,
      maxSupply: null,
      mintSettings: {
        mintType: { Issuer: null },
        price: null,
        startBlock: null,
        endBlock: null,
        defaultItemSettings: 0
      }
    }
  );
  
  return new Promise((resolve, reject) => {
    tx.signAndSend(account.address, ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({ event }) => {
          if (api.events.nfts.Created.is(event)) {
            const [collectionId] = event.data;
            console.log('Collection created with ID:', collectionId.toString());
            resolve(collectionId.toString());
          }
        });
      }
    }).catch(reject);
  });
}

// Run this once
createCollection().then(id => {
  console.log('Your Collection ID:', id);
  console.log('Update COLLECTION_ID in src/onchain/mintOnPaseo.js');
});
```

## Verification

After creating your collection:

1. Go to: https://polkadot.js.org/apps/?rpc=wss://paseo-asset-hub-rpc.polkadot.io
2. Navigate to **Developer > Chain State**
3. Select: `nfts` > `collection(u32)`
4. Enter your collection ID
5. Click the "+" button
6. You should see your collection details

## Common Issues

**"BadOrigin" error:**
- Make sure you're using the same account that will be the admin

**"InsufficientBalance" error:**
- Get more PAS tokens from the faucet
- Creating a collection requires a deposit (~1 PAS)

**Collection not found:**
- Wait a few blocks for the transaction to finalize
- Check the transaction in the explorer

## Next Steps

Once you have your Collection ID:

1. Update `COLLECTION_ID` in `src/onchain/mintOnPaseo.js`
2. Restart your dev server: `npm run dev`
3. Connect your wallet in the app
4. Create a meme and click "Mint as NFT"
5. Sign the transaction
6. Your meme will be minted as an NFT!

## Viewing Your NFTs

To view your minted NFTs:

1. Go to: https://polkadot.js.org/apps/?rpc=wss://paseo-asset-hub-rpc.polkadot.io
2. Navigate to **Developer > Chain State**
3. Select: `nfts` > `item(u32, u32)`
4. Enter your collection ID and item ID
5. Click "+" to see the NFT details

---

**Need Help?**
- Polkadot Discord: https://dot.li/discord
- StackExchange: https://substrate.stackexchange.com/
