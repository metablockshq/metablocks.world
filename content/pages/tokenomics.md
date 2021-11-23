---
title: Tokenomics
slug: tokenomics
---
# Meta Blocks Tokenomics Draft

*This document is a work in progress and subject to frequent changes. You can check the commit history and suggest changes [here](https://github.com/metablockshq/metablocks.world/commits/master/content/pages/tokenomics.md).*

## Meta Blocks platform

Meta Blocks platform allow for seamless upgradation of NFTs. This is achieved by holding multiple NFTs in a smart contract (on-chain program) and a machine readable collection (JSON) of all the NFTs owned by a user for a particular universe. When a new Meta Block (NFT) is purchased in a particular universe, it is transferred to the on-chain program. The JSON on Arweave also updates to reflect the addition of the new Meta Block.

Similarly, when a Meta Block is sold, the original NFT is released and the relevant date is deleted from the JSON stored on Arweave. This allows for upgradation of NFTs without mutating the original NFTs. In essence, the Meta Blocks platform makes NFTs malleable, while still maintaining the non-fungibility aspect of the token.

The Meta Blocks platform consists of three major entities:

### 1. Meta Blocks App

A marketplace to trade Meta Blocks. Mobile and chrome applications to use stickers and generative capabilities of the platform.

### 2. Meta Blocks Art

An official artist account that creates universes of upgradable NFTs and consults other NFT projects to help with integrations.

### 3. Meta Blocks Protocol

An open-source protocol to manage the combination of NFTs. This protocol runs on the Solana blockchain with Arweave as the storage layer. In future, we might extend this to Ethereum, Tron, Cosmos and Polkadot eco-systems using the Ethereum wormhole.

Together, the three entities constitute the Meta Blocks platform.  The tokenomics model is designed to yield the control of the platform to the community over a span of 8 years. We see ourselves as the maintainers of a community owned service. This document outlines the operative model of Meta Blocks and is a work in progress. When complete, this document will serve as a manual to transfer the ownership of the Meta Blocks platform to the community.

## Participants

There are six major participants in the Meta Blocks platform operation:

### 1. Foundation

Creates and maintains Open Source Protocol and the closed source apps required for operation of the platform. Pays for web2 services, maintains a talent pool of full-time employees to manage the product, development, security and community operations. Maintains a legal entity and a multisig wallet to control the company treasury and on-chain programs. Creates documentation and tooling for other protocols and NFT projects to integrate the Meta Blocks Protocol.

### 2. Artists

Create compatible artwork that can be combined with existing Meta Blocks. Create multiple base-layer universes and compatible drops for existing or new universes on the Meta Blocks platform. Work in coordination with other NFT projects to implement the Meta Blocks standard and make their NFTs upgradeable. The Meta Blocks foundation also acts as an artist. 

### 3. Users

End consumers who buy, sell and use Meta Blocks as stickers, game characters and generative audio and visuals. A user can be a human user or a development team that integrate into the systems using our SDKs or on-chain programs.

### 4. Investors

Community leaders who provide with strategic inputs, industry connections and funding in exchange for a share of token supply. This share represents the Meta Blocks protocol, the Meta Blocks app and the revenues generated from the Meta Blocks official art account.

### 5. Advisors

Similar to investors, except the inputs to the platform are exclusively non-monetary. Responsible for providing high-level overview and industry alignment insights.

### 6. Partners

Partners includes special entities or individuals that provide with operational know-how in the form of direct help with marketing, artwork and product development. A partner relation could be a trade, a charity or a barter.

## Economic loops and value capture

The goal of Meta Blocks is to act as a universal identity layer. The platform allows you to carry your identity across universes with next to no effort. This is useful for a variety of participants. 

We are in the business of capturing the part of the brain related to self-expression. Meta Blocks aims to be the de-facto way to express oneself across the Meta Verses. This expression demands a supply of characters, traits and attributes which is fulfilled by artists, hence creating an economic loop.

There are two major subsets of the economic loops:

### 1. Artist loop

The artist loop signifies the marketplace aspect of the system. An artist publishes a base-layer (abundant/not scarce). Then drops limited edition collectibles to enhance the utility of the base layer. These drops are a paid and can be bought and sold either on our platform, or externally. 

![Artist Loop Diagram](/img/content/pages/tokenomics/artist-loop.png?large)

Regardless of where the trade occurred, Meta Blocks platform charges a 5% platform fee that is distributed among various stake holders (specified later in this document). 

The drops that are sold on third-party platforms externally need to be combined in the Meta Blocks program with other Meta Blocks that you own. It's in this combination stage that we charge the 5% platform fee. For drops that were sold on our platform, this combination process is implicit.

The artists get to keep 95% of the sales amount. The artist can also add an additional royalty on for subsequent sales. The platform fee can be voted upon by the $MBK token holders. The platform fee value for primary and secondary can be changed individually. Initially it is set to 5% for both.

### 2. Stakeholder loop

In order to create the platform, the investors supply with initial capital and know-how. This entails risk and the investors need to be remunerated in proportion of the risks they endure. Other stake holders like the advisors or marketing partners also partake in this risky endeavour and need to be remunerated accordingly. 

![Stakeholder Loop Diagram](/img/content/pages/tokenomics/investor-loop.png?large)

Each stakeholder is remunerated in Meta Blocks tokens. This tokens unlock on a schedule. The stakeholder can sell these tokens on secondary markets, or stake them in the Meta Blocks program to avail a share of the platform fee collected on sales of the drops. Staking provides benefits in the form of dividends, appreciation and buy-backs. More on this in the Token Supply section.

## Meta Blocks token supply ($MBK / ᵯ)

The total supply of the Meta Blocks token is limited to  $MBK 4,444,444 (4.44 million). The tokens will be pre-mined and locked in a contract. The tokens will unlock on a 4 to 8 year schedule and will be distributed to various stake holders as follows:

* 16% to Foundation multi-sig for managing the product and protocol - 4 year vest 1 year cliff
* 8% to contributors/developers of the protocol - 4 year vest 1 year cliff
* Upto 16% to Investors - 4 year vest 1 year cliff
* 10% to Advisors - 4 year vest 1 year cliff
* Upto 10% for public sale - No vesting
* 40% to as treasury for incentives to use the protocol and for token appreciation - Released over 8 year, no cliff

### Token Distribution

The tokens represent the value being generated on the platform. This value can be direct, ie an artist mints a universe of Meta Blocks and users buy and use them. Or it could be indirect, eg: an early investor takes on the risk in building the protocol and contributes building the platform that generates the value. Another indirect value generation aspect is in the form of evangelism and support that can come in the form of sales.

To honor individual actors that contribute in the generation of value on the Meta Blocks platform, the tokens from treasury will be distributed to artists and existing token holders.

### Token unlock schedule and curve

The token supply unlocks over 4 to 8 years. The unlock occurs quarterly after 1.5 years of the governance initialization. The tokens distributed in the form of rewards or in the public sale are not subject to vesting and will be available immediately.

All token buckets except for public sales, will unlock quarterly post the cliff period. The tokens will be held in the program until the rightful owner withdraws it to their personal wallet. Both the token owner and the Meta Blocks multisig will have the authority to call the transfer function that distributes the token.

TODO: Design the unlocking curve - Logarithmic - Delayed Gratification - The marshmallow experiment

### Token unlocking actions

The tokens represent the value generated by the Meta Blocks platform. The value itself is intangible and resides in the market's demand side. But the realisation of the value occurs when the platform is utilised, ie. when an artist mints a drop or when a user purchases a drop. Both this actions will be rewarded with $MBK tokens from the treasury because the directly enhance the value of the platform.

TODO: Design realistic scenarios and gamify token unlocking in order to promote the usage of the platform.

## Token holder's incentives

The token holder can trade their tokens on secondary markets, or stake it in a contract. Staking entitles the token owner to earn a part of the the platform fee in proportion to the percentage of the stake in the pool.

A token holder can also use their tokens to vote on the governance of the protocol. There are two governance parameters built into the contract. These parameters decide the platform fee for primary and secondary sales.

In future, there could be other parametric or subject decisions that can be influenced by burning $MBK tokens in a vote.

## Token Burns

Regular burns increase the value of the platform by reducing supply. There are three ways in which the $MBK tokens will be burnt:

### 1. Voting

Votes on a public proposal will lead to burns. This signifies that all changes will positively affect all token holders in the short term. This also signifies that the community is willing to spend resources to align long-term gains.

### 2. Profit sharing in the form of buy backs

The Meta Blocks platform includes the official Meta Blocks art account. This artist wing of the platform publishes drops and base-layers. It is also possible that the artist wing designs a completely new NFT collection and then integrate it natively with the Meta Blocks protocol.

In essence, the artist wing of the platform will be responsible for the majority of the revenue. This revenue will be shared in the form of buy-backs and burns. The buy-backs will be fairly organised on-chain.

Buy-backs will provide a competitive marketplace for investors seeking an exit, while profiting investors who wish to HODL.

## Meta Meta Blocks Token ($MMBK)

Until the tokenomics schedule is tested and encoded on-chain, the platform plans to issue $MMBK tokens in order to raise seed-funding. These tokens will represent the 16% supply reserved for institutional investors. Meta Meta token holders will receive a part of the profit for upto 4 years or until their initial investment is recovered, whichever comes first.

The $MMBK tokens will be available only for a private sale and will be exchanged for $MBK tokens when the governance launches on-chain.

## Voting system

The voting program has the potential to determine two aspects of the platform:

1. Program variables like primary and secondary sales fee percentage, dividend payout percentage and percentage of the profits to be used for buy-backs.
2. Intangible decisions, for example changes to protocol, change in direction of the product or reacting to market

The intangible decision could also include adding more tangible variables to the on-chain program.

### Calling for a vote

Any token holder can call for a vote by pledging to burn $MBK tokens (TODO: What's the minimum number of tokens required to call a vote?). Token holders vote by transferring tokens to the voting program. The votes are counted in accordance with the Quadratic Voting pattern (TODO: Quadratic increases exposure to governance attacks).

The caller can set the vote burn percentage (b%), ie. what percent of the tokens transferred as votes will be burnt. The burn ensures that the short-term and the long-term interest of the proposal is aligned with the interests of the community at large.

If the proposal doesn't receive a minimum of x% of token supply as votes, then the proposal is dismissed as irrelevant. If the minimum threshold of votes is crossed, the onus is on the platform to implement the proposed changes or protest.

### Governance attacks / 51% attacks

A large proportion of $MBK token owners can collude to pass an unfavourable proposal. To prevent cases like these, every proposal will have a 7 day cool-down period in which it can be vetoed. A veto can be raised by passing the same amount of tokens to burn as the caller of the vote. If a veto is raised, the proposal goes back to voting phase, with the catch the the required vote percent (x%) and burn percent (2b%) is doubled.

If the vote passes again, the veto pledge is burnt and the original voters only burn the original amount (b%) not 2b% of the votes. If the vote decision is overturned, the veto pledge is reimbursed and voters end up burning (2b%) of their votes.

TODO: Simulate ranges for b and x

## Key Burning

TODO: At what stage does Meta Blocks platform becomes truly community owned. What are the risks to this model. How can these risks be mitigate?