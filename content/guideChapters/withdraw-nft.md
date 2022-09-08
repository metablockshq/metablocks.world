---
chapterNumber: 6
emoji: 🚨
title: Withdraw an NFT
slug: withdraw-nft
guideSlug: protocol
---
Each `depositNFT` transfers a receipt NFT to the depositor's wallet. This receipt NFT can be used to withdraw the originals. 


## How does withdrawal work ? 

When the user tries to withdraw the NFT, the user's wallet address is checked against the stored public address in `wrapped_user_nft`

A count is decreased in the Meta-NFT when a withdraw is successful. If the user withdraws all the component NFTs from the, the meta NFT is burnt.

## Withdraw NFTs using a receipt
A withdrawal is more simple than a deposit as it doesn't need you to generate receipt and meta NFT metadata. To withdraw an NFT, first import the required dependancies:

```typescript
import { withdrawNftWithReceipt } from '@kyraa/metablocks';
```

Next, we need the:
- public key of the receipt mint
- public key of the universe
- a connection and a wallet object

The receipt mint can be read by reading all the NFTs from the wallet, and filtering NFTs that have a `meta_blocks` property at the top level. 

> TODO: Connect this to the API for reading NFTs and post an example here

The public key of the universe can be stored as app configuration. This key never changes. Once you have all the information, you can make the withdraw call as follows:


```typescript
const args = {
  connection: connection,
  wallet: dummyWallet,
  receiptMint: pdaKeys.receiptMint, // public key of the receipt mint NFT
  universeKey: universeKey, // public key of the universe where user deposited NFT
};

await withdrawNftWithReceipt(args);
```

## Withdraw NFTs using the mint key of the component NFT
If you have access to component NFT's mint key, you can use an alternate withdraw function to withdraw an NFT. This method still requires the presence of the receipt NFT in the user's wallet. And will function exactly like the `withdrawNftWithReceipt` method.

```typescript
import { withdrawNft } from '@kyraa/metablocks'; 

const args: WithdrawNftApiArgs = {
  connection: connection,
  wallet: dummyWallet,
  mintKey: userNftMint, // original mint public key of the user
  universeKey: universeKey, // public key of the universe where the User deposited the NFT
};

await withdrawNft(args);
```

