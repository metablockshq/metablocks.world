---
chapterNumber: 4
emoji: 🪐
title: Creating a Universe
slug: creating-a-universe
guideSlug: protocol
---
If you are building an upgradable NFT system on top of the Meta Blocks protocol, you will need a universe. You can think of the Universe as a container for your users to store their NFTs. 

Universes allow you to use the protocol without caring about on-chain deployments. All you need is a wallet. You can create only one universe per wallet.

## Universe data

In order to create a universe, you need a name, a website and a description. These three fields are saved on chain.

## Universe creation GUI

The easiest way to create a universe, is to head over to <https://universes.metablocks.world/create-universe>. This app allows you to sign a transaction to create the universe. The Universes app also allows you to store thumbnail images for marketing purposes. The images will be useful when Meta Blocks launches its store.

![](/img/content/guide-chapters/screenshot-2022-01-03-at-6.35.17-am.png)

## Universe Creation via program call

It's highly unlikely that you'd need to create a Universe pragmatically. This section exists to better understand the functioning of the Universe. 

To create a universe, an RPC call is made to the on-chain program. This is how it looks like on the client side:

```javascript
const tx = await program.rpc.createUniverse(
  bump,
  name,
  description,
  websiteUrl, {
    accounts: {
      universe: universeKey,
      payer: wallet.publicKey,
      universeAuthority: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId
    },
    signers: []
  }
)
```

* `name`, `description` and `websiteUrl` are provided by the user in the UI
* `wallet` is the connected wallet (Phantom, Sollet etc) of the person trying to create the Universe
* `universeKey`: TODO- add explanation
* `bump`: TODO- add explanation
* An empty `singer`'s list signify that only the connected wallet needs to sign the transaction

On successfully sign and broadcast, this transaction creates a Universe for the signing wallet. The images that can be added in the UI are not on-chain, hence not a part of this transaction. 

## Universe Index

Meta Blocks maintains a private index of all the Universes created on the protocol. This index is used to list the Universes at <https://universes.metablocks.world>. TODO: Open source indexing service.