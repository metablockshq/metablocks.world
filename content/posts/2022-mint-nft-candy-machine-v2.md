---
publishedOn: 2022-01-24T12:39:06.938Z
title: How to mint an NFT using Candy Machine V2 [scripts included]
subTitle: Scripts and code to make you a pro NFT maker in the Solana eco-system
featured: false
heroImg: /img/content/posts/legos-vs-clay-bricks-hero.jpg
slug: mint-nft-candy-machine-v2
tags:
  - nft
  - metaplex
relatedSlugs:
  - lets-start-with-blocks
  - next-generation-of-nfts
  - clay-bricks-vs-legos
  - the-metaverse-belongs-to-you
  - why-upgrade-nfts
author: shivekkhurana
---
In this tutorial, we will mint NFTs on Solana using the Candy Machine v0.0.2. 

## Prerequisites

Minting an NFT is the process of creating a token, freezing its maximum supply to 1 and attaching Metaplex NFT standard JSON to it, so a wallet can render it. This process requires you to have:

* some understanding of bash scripts, and a terminal
* some knowledge of Git and Node
* Solana CLI tools [[installation guide](https://docs.solana.com/cli/install-solana-cli-tools)]

### End results

By the end of this tutorial, you will have 5 NFTs on the Solana devnet and a website to run a sale. We will also add a script to mint NFTs to your wallet via the CLI.

### Step 1: Prep your images

We are going to build an upgradable NFT project on top of the Meta Blocks protocol. We have created these 5 images that can be joined together. This collection will be called "Tara".

![](/img/content/posts/tara-nfts-cover.png)

You use this guide, even if don't plan to be upgradable via Meta Blocks protocol. The process for minting a Meta Blocks compatible collection is the same as minting a normal NFT collection.

You can download these images in zip format here:

## Step 2: Setup Metaplex locally

Metaplex offers a suite of tools and smart contracts (programs) that will ease the process of creating NFTs. We will use the official CLI to mint our collection. 

### Step 2.1: Pull CLI from Github

Open the terminal app on your computer. \`cd\` into a directory where you want to store the Metaplex related code. In my case this will be \`~/Desktop\`. Then clone the repository:

```bash

cd ~/Desktop

git clone git@github.com:metaplex-foundation/metaplex.git

```

You should see the following files in the newly created \`metaplex\` folder:

![](/img/content/posts/screenshot-2022-01-24-at-6.51.15-pm.png)

*Screenshot of the files inside the Metaplex folder*

### Step 2.2: Build Metaplex CLI code

We have the code but it's not usable yet. We need to fetch its dependancies and compile it. The Metaplex package comes with multiple packages, but we only care about `cli`.  To do this, goto the `js/packages/cli` folder inside `metaplex`, and execute the following commands:

```bash

cd packages/cli # we only need to work with CLI

yarn # installs all dependencies

yarn build # compile typescript code to node

```

This will create a folder named `build` in the `cli` folder. If you run `node ./build/candy-machine-v2-cli.js`, you should see the following output:

![](/img/content/posts/screenshot-2022-01-24-at-7.00.13-pm.png)

*Successfully built Candy Machine CLI output*

## Step 3: Prep Metaplex NFT config

Each asset (image/video etc) that you want to publish as an NFT needs an accompanying Metaplex config. This config is built to comply with Metaplex's [Token Metadata Standard](https://docs.metaplex.com/token-metadata/v1.1.0/specification). In less technical terms, Metaplex designed a standard that to store NFTs on Solana, an everyone in the ecosystem adopted the standard. 

From the point of view of the creator, you can think of this config as a way to specify the attributes, commissions and aspects of your NFT.