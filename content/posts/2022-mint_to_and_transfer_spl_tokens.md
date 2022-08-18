---
publishedOn: 2022-08-18T00:43:44.071Z
title: How transferring of tokens work in Solana smart contract  - Part 2
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

We looked at `mint_to` operation of anchor's \`anchor_spl\` library. Now, let us go two different operations that \`anchor_spl\` library provides us to move an spl-token between accounts.

## Prerequisites
* Make sure that you have installed rust - Follow this [link]() for more info.
* Install anchor framework using this [link]()


## Outcome
By the end of this guide, you should be able to understand when to `mint_to` operation and when to use `transfer` operation. Here is the [github_repo]() of the sample anchor codebase

Before performing any spl_token related operations let us first create a new token mint for the demonstration purpose. 

**Create a new mint**
```rust

use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

...

#[derive(Accounts)]
pub struct InitMint<'info> {
    #[account(
        init_if_needed,
         seeds = [
            b"Mint".as_ref(),
         ],
        bump,
        payer = payer, // payer is the one who is invoking this context
        mint::authority = payer,
        mint::decimals = 0, // zero decimals for the new mint
        mint::freeze_authority = payer // here freeze authority is the payer
    )]
    pub mint: Box<Account<'info, Mint>>,

...

}

```

### Mint_to operation
We use `mint_to` function when we create a new token mint for the first time. This operation is usually done by the admins or an escrow program. 

 




