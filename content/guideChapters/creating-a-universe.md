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

You can also create a universe on the fly using the Kyraa SDK. Start by importing the dependancies:

```typescript
import { createUniverse } from '@kyraa/metablocks';
```

To create an universe, all you need is below argument to be passed to the `createUniverse` method

```typescript
const args = {
  name: 'sample name',
  description: ' sample description',
  websiteUrl: 'http://your-sample.website.url',
  connection: connection,
  wallet: dummyWallet,
};

const tx = await createUniverse(args);
```

The `connection` and the `wallet` objects can be collected from React hooks exposed by `kyraa/solana`. Check the Kyraa SDK chapter for more details.

On successfully sign and broadcast, this transaction creates a Universe for the signing wallet. The images that can be added in the UI are not on-chain, hence not a part of this transaction. 
