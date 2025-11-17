// src/onchain/mintOnPaseo.js
import { web3FromSource } from "@polkadot/extension-dapp";
import { getApi } from "../polkadotApi";

// TODO: Replace with your real collection ID after creating it on Paseo AssetHub
const COLLECTION_ID = 123;

function generateItemId() {
  // Simple unique-ish u32 for hackathon use
  return Date.now() % 2 ** 31;
}

export async function mintMemeNft(account, metadataText) {
  const api = await getApi();

  // Get signer from the extension and attach it
  const injector = await web3FromSource(account.meta.source);
  api.setSigner(injector.signer);

  const itemId = generateItemId();

  // 1) Mint NFT to the caller
  const mintCall = api.tx.nfts.mint(
    COLLECTION_ID,
    itemId,
    account.address,
    null // witness: let chain calculate deposit
  );

  // 2) Set some small metadata (top/bottom text etc.)
  const metadataBytes = api.createType("Bytes", metadataText);
  const metadataCall = api.tx.nfts.setMetadata(
    COLLECTION_ID,
    itemId,
    metadataBytes
  );

  // Batch both calls so they succeed or fail together
  const tx = api.tx.utility.batchAll([mintCall, metadataCall]);

  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await tx.signAndSend(
        account.address,
        ({ status, events, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(
                dispatchError.asModule
              );
              const { section, name } = decoded;
              reject(new Error(`${section}.${name}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
            unsub();
            return;
          }

          if (status.isInBlock) {
            const txHash = status.asInBlock.toString();
            const success = events.find(({ event }) =>
              api.events.system.ExtrinsicSuccess.is(event)
            );
            if (success) {
              resolve({ txHash, itemId });
            } else {
              reject(new Error("Extrinsic failed"));
            }
            unsub();
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

export { COLLECTION_ID };
