---
chapterNumber: 1
emoji: 💡
title: Thinking in Meta Blocks
subTitle: How the Meta Blocks platform is different from traditional NFT
slug: thinking-in-meta-blocks
guideSlug: protocol
---
NFTs are unique tokens that can be used to represent digital ownership. The ownership works by anchoring the token to some metadata stored in the real world. For example, most profile picture projects like [Crypto Punks](https://www.larvalabs.com/cryptopunks) or [SMB](https://solanamonkey.business/), anchor their project to metadata on a decentralised storage network like Arweave or IPFS.

This is good enough to store things that never change: like a lease, a marriage contract or a static image. But what happens when you want to change the NFTs?

## Why do we need to upgrade NFTs?

One important use-case of digital ownership emerges in the field of digital games. Players start with a character, and then play (or pay) to advance their characters. The advancement could be a special skill, a weapon, a skin or access to special levels. These advancements are valuable because it represents the time spent mastering a particular game. These upgrades are true non-fungible assets. But it's hard to map these true non-fungible assets to NFTs because, the current NFT standards are not designed for evolution.

The similar reasoning can also be applied to metaverses, ie. digital online spaces that allow interaction. In the case of metaverses, the upgrades might include evolution of your avatar or surroundings over time.

## NFT 2.0: Bricks make home

At its core, the Meta Blocks protocol is an escrow contract. It lets a user store a collection of traditional NFTs, that together represent a character or a more complex digital entity.

> The big idea is that instead of a character being one single NFT, a character is a collection of NFTs.

This allows for evolution of a character in digital spaces while maintaining the non-fungibility of individual components. Since the components are traditional NFTs, they could be traded on existing markets seamlessly. 

## Upgrades in a world without Meta Blocks

Traditional NFTs can be upgraded by changing the metadata of the token. This approach is vulnerable to the following problems:

* **It modifies the original NFT:** If you change the metadata of your token, the original is lost. 
* **Loss of predictable value:** If a token was sold for 18 SOL, and then upgrades its metadata to match a token of lower value, what would be the price of this new token? 
* **Inability to scale:** If you want to design a character, do you append each upgrade to the base NFT?
* **Inability to trade pieces:** You unlock a skin in a game and update your character's metadata. Then 2 months later, you unlock a better skin, do you upgrade again? What happens to the old skin? Can it be traded ?

> Attribute or Metadata updates are a one way street and potentially harmful. What happens if a smart contract bug accidentally wipes the metadata on your NFT? 

The attribute upgrades are also not tradable on the existing infrastructure. By considering components to be NFTs that never change, it becomes easier to "compose" characters.

In the next chapter we'll understand the upgrade model and introduce some protocol specific terminology.