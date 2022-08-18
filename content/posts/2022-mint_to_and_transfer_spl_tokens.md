---
publishedOn: 2022-08-18T00:43:44.071Z
title: How transferring of tokens work in Solana smaart contract  - Part 2
subTitle: "Get to know how MintTo and Transfer spl-token operations work in
  solana using anchor framework "
featured: false
heroImg: /img/content/posts/solanashape2-full.png
slug: mint_to_and_transfer_spl_tokens
tags:
  - blockchain
  - nft
  - meta-blocks
  - metaverse
relatedSlugs:
  - mint-nft-candy-machine-v2
  - next-generation-of-nfts
  - how-to-make-upgradeable-nfts
author: srinivasvalekar
---
In the previous [guide](), we have looked at how to `mint` and transfer it to an Associated token account of a wallet. 

We looked at `mint_to` operation of anchor's \`anchor_spl\` library. Now, let us go through different two different operations that \`anchor_spl\` library provides us.

## Prerequisites
* Make sure that you have installed rust - Follow this [link]() for more info.
* Install anchor framework using this [link]()


## Outcome
By the end of this guide, you should be able to understand when to `mint_to` operation and when to use `transfer` operation. Here is the [github_repo]() of the sample anchor codebase

### Mint_to operation
We use `mint_to` function when we create a new token mint. For instance, let us create a new `mint` and transfer it to an associated token account using `mint_to` operation.

**Create a mint**
```rust 


```


