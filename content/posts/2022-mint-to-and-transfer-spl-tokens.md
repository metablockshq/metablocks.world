---
publishedOn: 2022-08-18T03:22:43.934Z
title: How transferring of tokens work in Solana smart contract  - Part 2
featured: false
heroImg: /img/content/posts/solanashape2-full.png
slug: mint-to-and-transfer-spl-tokens
tags:
  - blockchain
  - meta-blocks
  - metaplex
  - dev-tools
  - nft
relatedSlugs:
  - mint-nft-candy-machine-v2
author: srinivasvalekar
---
In the previous [guide](), we have looked at how to `mint` and transfer it to an Associated token account of a wallet. 

We looked at `mint_to` operation of anchor's \`anchor_spl\` library. Now, let us go two different operations that \`anchor_spl\` library provides us to move an spl-token between accounts.

## Prerequisites
* Make sure that you have installed rust - Follow this [link]() for more info.
* Install anchor framework using this [link]()


## Outcome
By the end of this guide, you should be able to understand when to `mint_to` operation and when to use `transfer` operation. Here is the [github_repo]() of the sample anchor codebase

For demonstration, let us first create a new token mint. 

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

We require **associated token account (ATA)** to transfer a created mint. (Please follow the previous to understand more about associated token accounts )

```rust
use anchor_spl::token::{self};

...

let cpi_context = CpiContext::new(
    self.token_program.to_account_info(),
    token::MintTo {
        mint: self.mint.to_account_info(),
        to: self.payer_ata.to_account_info(),
        authority: self.payer.to_account_info(),
    },
);
token::mint_to(cpi_context, 1)

...

```  

As we can see above, we perform a **CPI** call to the [token program](https://spl.solana.com/token) operation. 

### Transfer operation

Suppose if an user wants to stake a token into an escrow, then we use `transfer` operation. 
 
**CPI call**

```rust
use anchor_spl::token::{self};

...

let cpi_context = CpiContext::new(
    self.token_program.to_account_info(),
    token::Transfer {
        mint: self.mint.to_account_info(),
        to: self.payer_ata.to_account_info(),
        authority: self.payer.to_account_info(),
    },
);
token::mint_to(cpi_context, 1)

...

``` 

## Next Steps

Next we will discuss about other operations like `burn` and `freeze`.

If you are building a richer application, or want NFTs that can upgrade overtime, checkout the [Meta Blocks protocol](https://metablocks.world/guides/protocol).



