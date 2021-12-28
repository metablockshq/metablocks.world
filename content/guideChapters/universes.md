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

A universe's state is public. All items in a universe should be "compatible" with each other. For example, assume that there are three items in a gaming universe: a base character, a skin, and a weapon. Then the universe should have some rendering system, that can show these three NFTs together on the same character. More on composability later in the docs.

Meta Blocks stores a user's NFTs in an escrow contract. And returns a meta (or wrapped) version of the combination of NFTs. This meta NFT represents all the NFTs you have sent to the escrow. 

Each NFT a user sends to the contract is stored against the user's wallet and the universe's wallet. If you are familiar with the concept of "composite keys" in SQL, then the universe public key and the user public key together act as a composite key to the escrow that stores a user's NFTs.

## Depositing NFTs

In order to upgrade your NFTs, you need to deposit a base NFT in the universe. The base initialises the on-chain program. The base is special because it's the first NFT you send to the escrow. When you send a base to a universe, you get your own escrow account in the universe.

All subsequent upgrades are sent to the same escrow. This process is called "depositing NFTs". All the NFTs held in an escrow together make the meta NFT.

If you are a user of 5 universes on Meta Blocks, then you will have 5 escrow accounts on the contract. One for each universe. 

Universes can read the escrow contract and build utility on top of it. For example, the [3moji](https://3moji.app) universe generates various stickers of your avatar, depending on the NFTs you own.

There is no limit to the number of NFTs you can store in a universe. You can send any NFT token to any universe. However, an NFT might not show up in the application if it is not related to the universe. For example, if you send a 3moji NFT to a gaming universe, it might not work. It will work only if the the gamin universe has written an application that can consume the 3moji NFT.  

When you deposit an NFT to the universe, an off-chain service combines all the NFTs you have saved, to create a meta NFT. This meta NFT is owned by the Meta Blocks contract. NOTE: Meta NFTs are a work in progress.

## Withdrawing NFTs

When you deposit an upgrade NFT, you transfer the ownership of the NFT to the Meta Blocks program. The program is written in a way that only the original depositor and request the NFT back and only to the address they NFT originally came from. This makes it impossible for bad actors to seize control of your NFTs.

You can get back the upgrade NFT by calling the withdraw function. This will return the NFT stored on chain to your wallet. This will also upgrade the meta NFT to not have the NFT that was withdrawn.  

Once an NFT is withdrawn, you can trade it on any NFT marketplace.

## Indexing service

To provide utility from the NFTs you own, an application (universe) needs to read your current state. This will eventually be on-chain using the Meta NFTs (check Meta NFT generation section below). For now, this is done by relying on a central indexer that reads the state of the universe. 

The indexing service is open source. You can run it on your infrastructure, or use our hosted version.

The indexing service has the following end-points:

* GET /universes : List all universes registered in the Meta Blocks contract
* GET /universes/:uni-wallet-address: Get the details of universe with whose public key is \`:uni-wallet-address\`
* GET /universes/:uni-wallet-address/escrows: Get a list of all escrow accounts in a universe. The \`id\` of the escrow account is the public key of the wallet the escrow belongs to.
* GET /universe/:uni-wallet-address/escrows/:user-wallet-address: Get all NFTs for user `:user-wallet-address` in the universe with id `:uni-wallet-address`

TODO: Define this API is defined in more detail, with parameters and responses in a separate chapter.


## NFT exchange service

* For pfp projects to get a 3moji compatible drop

\-- FUTURE --

## Meta NFT generation

All the NFTs in a universe combined, denote your avatar in that universe. For the sake of application, this combination can be read using the Indexing service. But the indexer runs off-chain. In order to not rely on centralised services, the Meta Blocks platform will create a meta NFT and send it to your wallet.

The meta NFT is controlled by the Meta Blocks program (TODO: confirm if this is correct). Each time you deposit or withdraw and NFT to a universe, the meta NFT is modified to reflect the state of the universe.

You might loose your NFTs stored in the escrow if you transfer this meta NFT to someone. (TODO: Confirm the implications).

This meta NFT lets you visualise the combination of assets stored in the universe, right in your wallet. It also acts as an on-chain index, and removes the dependancy on the Indexing service, to read a user's state in a universe.

## Lending service

* Can be handled at the psuedo level