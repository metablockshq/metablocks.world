---
publishedOn: 2022-08-17T12:39:06.938Z
title: How transfer of tokens/NFTs occur between accounts in Solana?[programmatically]
subTitle: Understand how NFTs are transferred between accounts in solana
featured: true
heroImg: /img/content/posts/solana-feature1.jpeg
slug: how-transfer-of-tokens-occur-on-solana
tags:
  - nft
  - metaplex
  - candy-machine
  - developer
relatedSlugs:
  - lets-start-with-blocks
  - next-generation-of-nfts
  - clay-bricks-vs-legos
  - the-metaverse-belongs-to-you
  - why-upgrade-nfts
author: srinivasvalekar
---

Understand how spl-tokens tokens transfer work in Solana using **Anchor framework**.

## Prerequisites

This guide requires you to have following installed

* Rust CLI - Following this [link](https://www.rust-lang.org/tools/install) for installing in your machine
* You should have installed `Solana` in your machine - Please follow this [link](https://docs.solana.com/cli/install-solana-cli-tools)
* Last but not the least - you should have installed **Anchor Framework**  - Please follow this [link](https://book.anchor-lang.com/getting_started/installation.html#anchor)
* Typescript on the client side. (**Anchor Framework** generates a client code as well)
  


## Outcome

By the end of this guide, you should be able to understand how NFTs transfer work in **anchor framework**. Please refer this [github link](https://github.com/metablockshq/metablocks-program-library/blob/main/nft-vault/programs/nft-vault/src/lib.rs) to dive directly into the code.


## Understanding about SPL-Tokens

The spl-tokens need **associated token accounts** for storing them. You can derive an associated token account using a public address. This public address is usually a wallet address.  

Let us discuss how to transfer NFTs below. 


### Create a Mint 
You could think of `mint` as a metadata about NFT that is being transferred to an account. A mint could be initialised in a context. In `Anchor Framework` the struct could be passed a context. 

`anchor_spl` needs to be imported into the project. This could be added in `cargo.toml` file.

```toml
anchor-spl = "^0.25.0"
```


In the rust program you can do the following to initialise a **mint account** with the **PDA** generated **mint address**.

```rust

use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

....

#[derive(Accounts)]
pub struct InitMint<'info> {
    #[account(
        init_if_needed,
         seeds = [
            b"NftMint".as_ref(),
         ],
        bump,
        payer = payer, // payer is the one who is invoking this context
        mint::authority = payer,
        mint::decimals = 0, // An NFT does not contain any decimals
        mint::freeze_authority = payer // here freeze authority is the payer
    )]
    pub nft_mint: Box<Account<'info, Mint>>,

}

```

Anchor framework provides with spl-token implementation of its own. Use it to mint an account.


### Transfer the Minted NFT token

Now that we have a minted NFT, it is time to understand about **Associated Token Account (ATA)**

* ATA is normally generated **off-chain**. 
* ATA is **PDA**. Generate an ATA using `find program address` function
* For instance on the client side, you can generate a ATA as follows 

The given code is an example ATA generation using **PDA** method in **typescript** on the client side.

```typescript

import {PublicKey} from "@solana/web3.js"
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const AssociatedTokenAccount = async (
  payerKey: PublicKey,
  mintKey: PublicKey
) => {

  return await PublicKey.findProgramAddress(
    [
      payerKey.toBuffer(), // could be any public key
      TOKEN_PROGRAM_ID.toBuffer(),
      mintKey.toBuffer(),
    ],
   ASSOCIATED_TOKEN_PROGRAM_ID  
  );
};

```

Generate ATA using 
* Any **public key**
* A **mint key** 
* Token program ID and Associated Token Program ID. These two are standard programs that are deployed on Solana.

Now in the rust code, use `mint_to` or `transfer` instruction to transfer any mint to an ATA. (We will discuss about the differences between these two in the next guide)

The `mint_to` instruction from token program ([link](https://spl.solana.com/token)) could be used to transfer the minted token to an associated token account. 

In the below code, this code could be achieved via a **CPI** call in an instruction.   

```rust
use anchor_spl::token::{self};

...

let cpi_context = CpiContext::new(
    self.token_program.to_account_info(),
    token::MintTo {
        mint: self.nft_mint.to_account_info(),
        to: self.payer_ata.to_account_info(),
        authority: self.meta_nft.to_account_info(),
    },
);
token::mint_to(cpi_context, 1)

....

```

With this, the NFT mint is minted into the payer associated token account. 


## Next Steps

In the next section, we will discuss about difference between `mint_to` and `transfer` instructions. 

If you are building a richer application, or want NFTs that can upgrade overtime, checkout the [Meta Blocks protocol](https://metablocks.world/guides/protocol).