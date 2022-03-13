---
publishedOn: 2022-03-13T14:38:01.834Z
title: "How to Make Upgradeable NFTs "
subTitle: ""
featured: true
heroImg: /img/content/posts/how-to-make-upgradeable-nfts.png
slug: "how-to-make-upgradeable-nfts "
tags:
  - blockchain
relatedSlugs:
  - mint-nft-candy-machine-v2
  - lets-start-with-blocks
  - clay-bricks-vs-legos
author: sarthakkhurana
---
NFTs took over the world in 2021, but they’ve largely remained static since their inception in 2017. There’s a lack of basic infrastructure necessary to build composable and upgradeable NFTs, and that’s what Meta Blocks aims to change. 

According to a [report by Business Insider](https://markets.businessinsider.com/news/currencies/nft-market-41-billion-nearing-fine-art-market-size-2022-1#:~:text=NFTs%20Grew%20to%20%2441%20Billion,A%20magnifying%20glass.), NFTs grew to an expansive $41 billion market in 2021. Solana, despite being a little late to the party, still has an impressive market cap that’s just shy of $1b and a 7-day volume of $46m. Despite the impressive and beefy numbers, the majority of the NFT market cap is consolidated within art and hype projects. 

The grand vision of connected and interoperable metaverses, immersive P2E games, and fleshed-out digital interaction is impossible to achieve without upgradeable NFTs. Imagine a AAA game like League of Legends or Elden Ring where your character stays the same despite hours of grinding. 

## Existing ways to make upgradeable NFTs 

Stephen Fluin of Chainlink Labs said that “The next generation of NFTs, will be dynamic - flexible, adaptable, and capable of responding to external cues and data to level up their capabilities.”

Currently, there are two ways to upgrade an NFT:

1. **Attribute upgrades (modifying the meta data)**

Attribute based upgrade is the most prevalent way to make an NFT dynamic and upgradeable. When certain conditions are met, the smart contract associated with the NFT will change the underlying metadata of the NFT. 

[Genopets](https://www.genopets.me/), a game where your NFT evolves based on how much you walk, is a great example of attribute based upgrades. When you walk a certain amount of distance, the NFT evolves in terms of skills and visuals. 

2. **Serums** 

Serums are a more haphazard way, an afterthought, to upgrade NFTs. The way it works is that you have a “base NFT” and a “serum” (or a potion, concoction, etc). When combined together, the serum is burnt and a new NFT is generated, the base NFT is left untouched.

The Mutant Serum is the perfect example of such an upgrade system. 



**NOTE**: We’ve excluded breeding mechanisms (such as crypto kitties) since there are no inherent upgrades in the breeding mechanism. A new NFT is produced based on the traits of two existing NFTs. The parent NFTs are unchanged after the breeding process, hence it’s not an upgrade. 

While both attribute based upgrades and serums can be used to make dynamic and upgradeable NFTs, there are severe drawbacks to each of the mechanism. 

## Drawbacks of existing ways to make upgradeable NFTs 

* Destructive: Both attribute-based upgrades and serums are destructive and one-way processes. You can’t “go back” to the previous stage once upgraded. 
* Not Controllable: You do not have any control over how your upgraded NFT will turn out. While it’s a fixed and predictable route with attribute-based upgrades, it’s worse with serum upgrades as what you get is totally out of your hands. 
* Lack of composability: The rigidity of attribute and serum upgrades translates to a total lack of composability, which may be a total deal-breaker in a video game. For a game like the Genopets, the fixed and rigid path of upgradability works. But what if you wanted to build a game like League of Legends or Elden Ring wherein each skill, each weapon, and each armor is a part of your NFT? It’s impossible with the current NFT infrastructure! 

## How to make composable and upgradeable NFTs with Meta Blocks

Meta Blocks is an open-source protocol that lets you build composable and upgradeable NFTs without burning or changing the metadata. 

The Meta Blocks smart contract leverages an escrow contract where users can deposit NFTs, akin to an inventory in a video game. The user deposits a “base NFT” and an augmentation NFT in the smart contract. The augmentation NFT could be non-tangible NFT, such as a skill in a video game, or something like a helmet or an armor that’s tangible. 

Both the base NFT and the augmentation NFT are built on existing NFT standards (currently Metaplex for Solana and later ERC-721 for Ethereum). Hence, they do not need any specialized marketplace for minting or secondary trade. 

In return, you receive a non-transferable receipt for the deposited NFTs as well as a composed and upgraded Meta NFT, which is also non-transferable.  

The receipt NFTs act as proof of ownership and can be used to withdraw the original NFT from the smart contract. On the other hand, the upgraded Meta NFT can be read and used in P2E games and metaverses. A preview of the upgraded Meta NFT also serves the traditional purpose of PFP. 

If you wish to change, upgrade or degrade your NFT, all you have to do is retract the original NFT from the smart contract with the help of your receipt NFT and add a new one! Since all the NFTs are built on existing standards, they can be traded in the secondary market. 

**\
If you’d like to take a deeper dive at how the Meta Blocks contract works, take a look at [this article](https://metablocks.world/blog/clay-bricks-vs-legos). If you’re ready to start building composable and upgradeable NFTs, then refer the protocol guide of Meta Blocks.**