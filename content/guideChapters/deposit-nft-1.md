---
chapterNumber: 5
emoji: 📥
title: Deposit an NFT
slug: deposit-nft
guideSlug: protocol
---
After creating a `universe`, the next step is to deposit NFTs.

Every deposited NFT is a component of your meta NFT. The meta NFT combines the metadata of all component NFTs.

## How is an NFT stored in a universe?

The following steps occur when a wallet deposits an NFT in a universe for the first time:

1. A receipt NFT is generated and sent to depositor's wallet
2. A meta NFT is generated and transferred to depositor's wallet
3. The NFT being deposited is transferred to the Meta Blocks vault

For subsequent deposits, step 2 is omitted since the meta NFT already exists.

A developer only needs to call one function to deposit. To learn more about the internal details of a deposit, check the chapter on [how deposits work](/guides/protocol/how-deposits-work).

## Depositing NFTs into a universe

Since the contract will generate a receipt and a meta NFT, the deposit function expects a URI for the metadata of the receipt and NFTs. You can create these metadata files yourself or use our hosted service to create the metadata. # TODO: Add a section on how to use our service. 

Assuming you have a system to generate these metadata URLs, you can call the deposit function as follows:

### Import the deposit function

```javascript
import { depositNft } from '@kyraa/metablocks';
```

### Make the deposit

```javascript
const args = {
  connection: connection,
  wallet: dummyWallet,
  isMetaNftMasterEdition: false,
  isReceiptMasterEdition: false, 
  receiptName: 'receiptName', 
  receiptUrl: 'http://metablocks-receipt.metablocks.world/278781.json', 
  metaNftName: 'metaNftName', 
  metaNftUrl: 'http://metadata.metablocks.world/13999.json',
  mintKey: userNftMint, 
  universeKey: universeKey, 
};

try {
  await depositNft(args);
} catch (e) {
  console.log(e)
}
```

Let's dissect the the the deposit method:

* `connection` and `wallet` are the Solana connection and connected wallet respectively
* `isReceiptMasterEdition` and `isMetaNftMasterEdition` flags are used to specify if the respective NFTs are master editions or not. By default, both these flags are set `false`
* `receiptName` and `receiptUrl` are the the names and metadata url or receipt NFT respectively. You can use our service to generate metadata URLs
* `metaNftName` and `metaNftUrl` are the names and metadata url of the meta NFT. The upgrades to the NFTs occur by updating the contents of this metadata URL. You can use our service for simple image upgrades or roll your own for complex upgrades
* `mintKey` is the token mint key of the NFT being deposited
* `universeKey` is the key of the universe in which the NFT is being deposited