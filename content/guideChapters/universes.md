---
chapterNumber: 2
emoji: 🐧
title: Bird's eye view
subTitle: An overview of the Meta Blocks components
slug: birds-eye-view
guideSlug: protocol
---
The NFT interface is a low-level abstraction to represent uniqueness on chain. But in order to create applications like games, we need a higher level abstraction. This chapter sets a shared vocabulary for the process of upgrading NFTs. The terms defined here are used throughout the documentation.

## Universe

Any project that implements upgradation of NFTs is called a Universe. This could be a game that starts with a base character (NFT) and all upgrades to the character (like skins, weapons etc) are delivered as NFTs. All these upgrades together belong to this game's universe. A universe is like a folder that stores all the items that are available in that project.

If an existing NFT project like [Solarmy](https://www.solarmy.io/), decides to make their NFTs upgradable using the Meta Blocks standard, then that will be a separate universe.

A universe's state is public. All items in a universe should be "compatible" with each other. For example, if there are three items in a gaming universe: a base character, a skin, and a weapon. Then the universe should have some rendering system, that can show these three NFTs together on the same character.

Meta Blocks stores a user's NFTs in an escrow contract. And returns a meta (or wrapped) version of the combination of NFTs. This meta NFT represents all the NFTs you have sent to the escrow. 

Each NFT a user sends to the contract is stored against the user's wallet and the universe's wallet. If you are familiar with the concept of "composite keys" in SQL, then the universe public key and the user public key together act as a composite key to the escrow that stores a user's NFTs.

## Component vs Meta NFT

A component NFT is a Metaplex standard compatible NFT that can be deposited in the Meta Blocks program. A meta NFT is a combination of all component NFTs deposited in the program. One meta NFT has many component NFTs.

## Depositing component NFTs

In order to upgrade your NFTs, you need to deposit a base NFT in the universe. The base initialises the on-chain program. The base is special because it's the first NFT you send to the escrow. When a wallet sends a base to a universe,  it gets a unique escrow account in the universe.

All subsequent upgrades are sent to the same escrow. This process is called "depositing NFTs". All the NFTs held in an escrow together make the meta NFT.

If you are a user of 5 universes on Meta Blocks, then you will have 5 escrow accounts on the contract. One for each universe. 

Universes can read the escrow contract and build utility on top of it. For example, the [3moji](https://3moji.app) universe generates various stickers of your avatar, depending on the NFTs you own.

There is no limit to the number of NFTs you can store in a universe. You can send any NFT token to any universe. However, an NFT might not show up in the application if it is not related to the universe. For example, if you send a 3moji NFT to a gaming universe, it might not work. It will work only if the the gaming universe has written an application that can consume the 3moji NFT.  

When you deposit an NFT to the universe, an off-chain service combines all the NFTs you have saved, to create a meta NFT. This meta NFT is owned by the Meta Blocks contract and cannot be transferred by the user.

You also receive a receipt NFT when you make a deposit. This receipt is non-transferrable. The receipt can be used to redeem the original NFT from the contract.

## Withdrawing component NFTs

When you deposit an NFT, you transfer the ownership of the NFT to the Meta Blocks program. In return, the program gives you a receipt NFT back. The program is written in a way that only the original depositor and request the NFT back and only to the address they NFT originally came from. This makes it impossible for bad actors to seize control of your NFTs.

You can get back the original NFT by calling the withdraw function. This will return the NFT stored on chain to your wallet. This will also upgrade the meta NFT to not have the NFT that was withdrawn.

Once an NFT is withdrawn, you can trade it on any NFT marketplace.

## Rendering upgrades to images

After depositing or withdrawing an NFT, the meta NFT changes its metadata. This updated metadata reflects all the component NFTs of a meta NFT.

But the preview image needs a rendering service for upgrades, because image manipulation cannot be done on chain.

To solve this problem, we use a centralised system. 

*NOTE: In future when there is a viable keeper network on Solana, we'll dissolve this centralised system and deploy the upgrade programs on the keeper network.*

When the first NFT is deposited in the universe, the program expects a meta NFT metadata url. This metadata is the Metaplex JSON for the meta NFT. This currently points to a centralised service hosted by Meta Blocks. When an upgrade is done on-chain, the centralised service updates this metadata, and re-renders the images.

Since the meta NFT already points to this centralised metadata, the upgrades are reflected as soon as the client fetches the meta NFT again.

User's can use our centralised service or create their own. Please contact us if you'd like to use our centralised service for metadata updates.