---
publishedOn: 2022-02-08T02:49:32.168Z
title: What's up, Block? - January 6 to February 8, 2022
subTitle: Updates for partners and friends on building the Meta Blocks Protocol
featured: false
heroImg: /img/content/posts/updates.jpg
slug: whats-up-block-january-5-february-10-2022
tags:
  - product-update
relatedSlugs:
  - whats-up-block-november-20-to-26-2021
  - the-metaverse-belongs-to-you
  - whats-up-block-november-20-to-december-10-2021
  - lets-start-with-blocks
  - mint-nft-candy-machine-v2
author: shivekkhurana
---
“What’s up, block?” is our update aggregation for partners and friends.

It has been almost a month since we wrote this, our product is taking shape but one of our tech decisions set us back by 2 weeks 😌. We deployed the smart contract to devnet on 6th of January, 2022. While writing docs for the contract, we realised that it had a flaw. This problem deserves a section of its own.

## Bad:

When a user deposited an NFT, the contract assumed that the client (web app) will maintain the address of the deposited NFT. This address is required to withdraw the NFT. If you don't know the address, you would not know which NFT to withdraw. This assumption caused a poor DX because storing the address could be tricky. And worse, if you loose the address, getting the NFT back from the contract will be problematic.

Our lead blockchain developer Srinivas analysed this issue, and together with his research and ideas from a protocol called [Cardinal](https://www.cardinal.so/), we built a receipt NFT system. Now, when a user deposits and NFT, the contract returns a receipt of the deposit. This receipt is an NFT that shows up in the user's wallet, and can be used to redeem the original NFT. 

This new version is deployed to devnet and we are back on track. Apart from this major hurdle, we have other progress to share.

## Good:

* Got a verbal commitment for integration with Meta Blocks from a US based startup. The Meta Blocks protocol will act as the backend for their upgradable avatars system.
* Got a verbal commitment from 2 artists to release their artwork on 3moji.
* Docs for integrating with 3moji are 80% complete. This will enable any artist to create drops in the 3moji universe.

## Not Good:

* We are facing fiat liquidity issues. This slows down hiring as most designers, consultants and developers don't accept crypto. We are in final stages of setting up a business account with an exchange. Hope this gets sorted soon.

Our next steps after fiat liquidity is solved will be to:

1. Start systemic marketing of the 3moji universe
2. Continue to approach partners for both Meta Blocks and 3moji

If you have any suggestions on projects that might be a good fit for 3moji or Meta Blocks, please let us know. We'll reach out to them.

🔮☮️🤙