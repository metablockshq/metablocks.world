---
publishedOn: 2021-11-23T01:25:09.531Z
title: Clay bricks versus Legos
subTitle: NFTs are rigid because there is no standard for upgrading them
canonicalUrl: ""
featured: false
heroImg: /img/content/posts/legos-vs-clay-bricks-hero.jpg
slug: clay-bricks-vs-legos
tags:
  - nft
relatedSlugs:
  - lets-start-with-blocks
author: shivekkhurana
---
*Lego blocks and clay bricks image courtesy of [Freepik](www.freepik.com)*

# The rigidity of non fungible tokens

The year 2021 saw the first bull run of digital collectibles. Digital ownership is a revolutionary concept, but we believe that we are not using it to its potential. Profile pictures are cool for sure, but what if you want to change the color of your ape's t-shirt?

Current non-fungible tokens are also non-malleable. They are like clay brick structures. Once minted, they cannot be changed easily and predictably. This restricts their usage is perfect use-cases like games and metaverse identity. Imagine a game like Fortnite where your character evolves over time. If new weapons and skins were to be NFTs, you could truly own them and trade them on secondary marketplaces. But this is not the case. And one of the reason for that is NFTs don't evolve.

This is similar to what happened when web2 came into being, and publishers started publishing magazines on the internet. Only later we realised that online apps could be an interactive two-way stream.

# Attribute based upgrades

Attribute based upgrades are clumsy and unpredictably. Like clay brick structures can be modified to some extent, but the original structure gets compromised.

There are smart contracts that can be used to update the metadata or attributes of an NFT. One good example is [Genopets](https://www.genopets.me/) where your pet evolves over time by modifying attributes. 

## Serum airdrop

Another example of an upgrade is Bored Ape Serum NFTs. This serum could be burnt to get a new ape NFT but now you have two rigid NFTs. An upgrade for sure, but not quite.

# Attribute upgrades burn or modify underlying token

Attribute upgrade is a problem because each time you upgrade, your original NFT is lost. This is also restricted because all possible upgrades need to be defined at mint-time. This leads to a close-world game experience. This also means that once upgraded, you cannot go back to the original version.

## Loss of predictable value

Another problem is determining the value of upgraded NFT. If you upgraded your NFT that was valued at 8 ETH with an attribute that is not popular, will the 8 ETH value appreciate or depreciate? After you have upgraded your NFT multiple times, it becomes practically impossible to determine the value of your NFT.

# Meta Blocks upgrade standard

NFTs are the perfect complement to metaverse and games. In fact, they are our chance to own the metaverse! But the current level of abstraction is low.

The Meta Blocks upgrade standard is an open-source smart contract that can be used to upgrade NFTs without modifying or burning them. 

If NFTs are clay brick structures, then Meta Blocks are legos that compose.

https://twitter.com/brianjcho/status/1460648264919699459

This works by leveraging an escrow contract. All NFTs are sent to this escrow contract and the contract in turn returns a JSON object which lists all the NFTs held by a user. This JSON object is on-chain and can be read by applications in a permissionless way.

There are four main components in this standard: universes, base layers, augmentation and retraction.

## Universes

Think of a universe as a game or a metaverse, where you NFT character exists and can be upgraded. On paper, a universe is a wallet address registered on chain.

![Meta Blocks universes stored on-chain](/img/content/posts/screenshot-2021-11-23-at-9.04.26-am.png?medium)

If you are building a Fortnite like game on-chain, then:

* your company's multisig wallet is the universe address
* avatars, weapons, in-game rewards and the skins are NFTs
* NFTs can be combined by any player inside your universe
* the combined NFT structure exists publicly on-chain

The concept of a universe enables different projects to use the same contract. This fosters innovation and serves as a tool for public good.

## Base layers

Base layer is the starting point or the base of your NFT upgrades. Meta Blocks combines NFT data in the escrow. But for an actual upgrade to happen, the visual representation needs to change too. If you buy a new weapon NFT for your game character, the game developer needs to build the render of your character and the weapon in order for you to see it on-screen.

![Base layers in Meta Blocks contract](/img/content/posts/screenshot-2021-11-23-at-9.04.09-am.png?medium)

The base layer is the model (3d/2d/whatever) to which upgrades will be applied to. It is optional and can be empty in cases where there is no base and everything is swappable. 

You (as a wallet address) buy a base layer, and store in in the Meta Blocks escrow against a universe.

## Augmentation

Once you have a base layer, it's time for you to upgrade. In the Meta Blocks universe, upgrades happen when you buy limited edition drops. The drops augment your avatar with the item you bought. For example, if you bought blue jeans and a yellow top, your avatar will be rendered wearing them.

![Meta Blocks NFT augmentation](/img/content/posts/screenshot-2021-11-23-at-9.13.58-am.png?medium)

Augmentation locks the upgrade (NFT for skin, weapon etc) in the contract and updates the state of your base in a specific universe.

## Retraction

If augmentation is buying new stuff, then retraction is selling what you already own. This is done by removing the NFT from escrow, and updating the JSON state of the universe.

![Meta Blocks Protocol Retraction flow](/img/content/posts/screenshot-2021-11-23-at-5.43.00-pm.png?medium)

Once the NFT is out of the escrow, it shows up as a normal token in your wallet.
In future, we might also have a combined representation of all NFTs stored on the escrow.

## No special marketplace

NFTs once out of the escrow contract can be bought and sold on any NFT marketplace. 

# Why augment on-chain?

If  your character and all upgrades were in the form of NFTs in your wallet, why do we need a contract on-chain?

Why can't the game read your wallet and check all the upgrades you own and render them?

## On-chain verifiability

If individual applications decide NFTs that are valid in their universe, the possibility of public verification is lost. 

What if the game stops supporting a skin that you paid 1.3 ETH for. How would you prove the legitimacy of your artifact? If the augmentation happens on-chain, the verification stays permissionless.

## Re-inventing the wheel

Every website on the internet can write their own standard for transmitting data, but instead, they rely on HTTP. This allows them to focus on building the site and not worrying that packets will be lost in transit.

Having a standard fosters the pace of innovation, because tooling composes and compounds overtime. 

# Use cases of Meta Blocks

Having an upgradeable NFT standard enables use-cases across games and metaverses. 

## Avatars

The Meta Blocks platform is building an avatar system similar to [Bitmoji](https://www.bitmoji.com/). This avatar can be carried across metaverses and games with our SDKs.

![Meta Blocks avatars and live streaming](/img/content/posts/mb-use-cases.jpg?large)

### Stickers

Using the NFT avatars we can render stickers similar to [Bitmoji](https://www.bitmoji.com/). These stickers will work in the web2 universe and have the potential to attract the web2 audience to web3. Unlike web2 stickers, the Meta Blocks stickers are real, tradable assets.

### Live avatars

This avatar will eventually be used for streaming and podcasting. The real world will be the metaverse.

## Sol Army and other game projects

*Note: Meta Blocks is not affiliated to Sol Army in any way. This is only an opinion.*

[Sol Army](https://www.solarmy.io/) is a collection of soldier NFTs with upgradeable attributes like weapons, clothing, strength etc. 

A project like Sol Army can use the Meta Blocks upgrade standard to update their soldiers. In this case, since all parts are swappable, they can start with an empty base layer and drop other attributes as NFTs. As the user buys this drop, their soldiers will start evolving.

## Degen Apes and other PFP projects

*Note: Meta Blocks is not affiliated to Degen Ape Academy in any way. This is only an opinion.*

NFT collections with existing communities can partner with Meta Blocks, and bring their NFTs as drops in the Meta Blocks avatar universe. This will allow a user of an ape (or punk or penguin) to wear their ape as a mask or a jump suit in the Meta Blocks universe. And enable them to express themselves in the web2 space in the form of stickers.

## Conclusion

Meta Blocks is the missing piece in making NFTs sustainable. The Meta Blocks protocol abstracts the combination of NFTs and exposes it as a simple open-source contract.

It does so while maintaining all the properties of traditional NFTs and using all platforms that exist to support them. 

If you are a game or NFT project and want to use Meta Blocks you backend, please contact us. We are happy to chat!

## To stay updated on Meta Blocks 

* Follow us on [Twitter ](https://twitter.com/MetaBlocksHQ)
* Join our [waitlist](https://metablocks.world/waitlist)
* Hop on our [Discord server ](https://discord.com/invite/YUJq9kW3RV)to join the conversation