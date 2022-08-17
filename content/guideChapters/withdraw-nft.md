---
chapterNumber: 6
emoji: 🚨
title: Withdraw an NFT
slug: withdraw-nft
guideSlug: protocol
---

To withdraw NFT from `vault`, user should hold \`Receipt-NFT\` prior. As the \`Receipt-NFT\` is generated per component-NFT deposition, user can withdraw as many component-NFTs as the user is holding the `Receipt-NFTs`


## How does withdrawal work ? 

As we already seen how deposit works, the same happens in the reverse way. When the user tries to withdraw the NFT, the user's wallet address is checked against the stored public in `wrapped_user_nft`

A count is decreased in the Meta-NFT when a withdraw is successful. If the user withdraws all the component-NFTs from the `vault`, the Meta-NFT is burnt. 
The lamports is returned to treasury as revenue to the users.

Withdrawing could be achieved using `@kyraa` package if you want to implement in your code.

```typescript
import { depositNft } from '@kyraa/metablocks';
```

NFTs could also be withdraw from MetaBlocks Program using `receiptMint` Publickey

```typescript
const args: WithdrawNftWithReceiptApiArgs = {
  connection: connection,
  receiptMint: pdaKeys.receiptMint, // public key of the receipt mint NFT
  wallet: dummyWallet,
  universeKey: universeKey, // public key of the universe where user deposited NFT
};

await withdrawNftWithReceipt(args);
```

