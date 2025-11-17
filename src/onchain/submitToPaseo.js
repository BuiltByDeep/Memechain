// src/onchain/submitToPaseo.js
import { web3FromSource } from "@polkadot/extension-dapp";
import { getApi } from "../polkadotApi";

/**
 * Submit meme metadata to Paseo blockchain using system.remark
 * This stores the metadata permanently on-chain without needing an NFT collection
 */
export async function submitMemeToBlockchain(account, memeData) {
  const api = await getApi();
  await api.isReady;

  // Get signer from the extension
  const injector = await web3FromSource(account.meta.source);
  api.setSigner(injector.signer);

  // Prepare metadata
  const metadata = {
    type: "MEME",
    version: "1.0",
    topText: memeData.topText || "",
    bottomText: memeData.bottomText || "",
    timestamp: Date.now(),
    creator: account.address,
    appVersion: "1.0.0"
  };

  // Create remark with metadata
  const remarkData = `MEME:${JSON.stringify(metadata)}`;
  const tx = api.tx.system.remark(remarkData);

  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await tx.signAndSend(
        account.address,
        { signer: injector.signer },
        ({ status, txHash, events, dispatchError }) => {
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
            const blockHash = status.asInBlock.toString();
            
            // Get block number
            api.rpc.chain.getBlock(blockHash).then(block => {
              const blockNumber = block.block.header.number.toNumber();
              
              resolve({
                txHash: txHash.toHex(),
                blockHash,
                blockNumber,
                metadata
              });
              
              unsub();
            });
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
