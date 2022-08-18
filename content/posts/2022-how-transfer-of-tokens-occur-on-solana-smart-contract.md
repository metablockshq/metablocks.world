---
publishedOn: 2022-08-18T03:13:57.930Z
title: How to transfer tokens between accounts in Solana smart contract ?
subTitle: Understand how spl-tokens are transferred between accounts in solana
  using anchor framework
featured: false
heroImg: /img/content/posts/solanalogo.png
slug: how-transfer-of-tokens-occur-on-solana-smart-contract
tags:
  - blockchain
  - nft
  - metaplex
  - meta-blocks
relatedSlugs:
  - mint-nft-candy-machine-v2
  - lets-start-with-blocks
author: srinivasvalekar
---

Let us walk through on how to transfer tokens in Solana using **Anchor framework**.

## Outcome

By the end of this guide, you should be able to understand how tokens could be transferred in **anchor framework**. Please refer this [github link](https://github.com/metablockshq/metablocks-program-library/blob/main/nft-vault/programs/nft-vault/src/lib.rs) to dive directly into the code.

## What is an SPL-token?

Solana blockchain tokens are called as SPL-tokens. SPL-Tokens are created using [token-program](https://spl.solana.com/token). 

To create an SPL-Token, two steps must be followed, 

* Create a mint (If the mint is not existing)
* Transfer a mint (to an associated token account(ATA))

Let us create SPL-Token in Anchor framework.

## Prerequisites

This guide requires you to have following installed

* Rust CLI - Following this [link](https://www.rust-lang.org/tools/install) for installing in your machine
* You should have installed `Solana` in your machine - Please follow this [link](https://docs.solana.com/cli/install-solana-cli-tools)
* Last but not the least - you should have installed **Anchor Framework**  - Please follow this [link](https://book.anchor-lang.com/getting_started/installation.html#anchor)
* Typescript on the client side. (**Anchor Framework** generates a client code as well)

## Create an anchor Project

### 1. Run 

```bash
anchor init spl-token
```

This will initialise a project like this below.

[image 1]

Open in your favourite editor and start doing the changes. 

### 2. Run the below command
```bash
anchor test
``` 
This will install all dependencies of the project.


### 3. Change Program ID
Usually it is a good idea to change the ProgramID of the program. Get the public address of the `spl-token` program by running the following command

```bash 
solana-keygen pubkey target/deploy/spl_token-keypair.json
```

This will give you the output as below

[image 2]
  

Replace `29iiLtNregFkwH4n4K95GrKYcGUGC3F6D5thPE2jWQQs` in `declare_id` of `lib.rs` file

[image_3]

Also replace the address in `Anchor.toml` file of the project 

[image_4]


Now let us create a `Mint` in the program.

## How to create a mint?

You could think of `mint` as a metadata about a token that is being transferred to an account. A mint could be initialised in a context. In anchor framework the struct is passed as a context. 


First let's import `anchor_spl` into the project so that we can create a mint. Add below in your `cargo.toml` file. And run `anchor test` or `anchor build` to check if everything is working fine. 

```toml
anchor-spl = "^0.25.0"
```

[image_5]


Generally in Solana, any accounts that involve in the modification of state, are passed from the client side. This is done for parallel execution of programs. Refer [this](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) article from Anatoly Yakovenko  

It becomes easier in to access these `accounts` using anchor framework. Pass these accounts as context parameter to an instruction.

### How to create a context ? 

A `struct` can be defined as a context in an anchor program. Let us look at how this could be achieved. 


Fist import the dependencies

```rust 
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};
``` 

Then, define a context(`struct`) for accessing these instructions. The `CreateMint` struct is decorated with `#[derive(Accounts)]` which helps in deserialisation of accounts described in this `struct`

```rust
#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(
        init,
         seeds = [
            b"spl-token-mint".as_ref(),
         ],
        bump,
        payer = payer,
        mint::authority = payer,
        mint::decimals = 0,
        mint::freeze_authority = payer
    )]
    pub spl_token_mint: Account<'info, Mint>, // ---> 1

    #[account(mut)]
    pub payer: Signer<'info>, // ---> 2

    pub system_program: Program<'info, System>, // ---> 3
    pub token_program: Program<'info, Token>,   // ---> 4
    // this is required for spl token mint
    pub rent: Sysvar<'info, Rent>, // ---> 5

    #[account(
        init, 
        space = 8 + Vault::LEN,
        seeds = [
            b"vault"
        ],
        bump,
        payer = payer 
    )]
    pub vault : Account<'info, Vault>, // ---> 6
}

// Store the state 
#[account]
pub struct Vault { //  ---> 7
    bump : u8, //1
    spl_token_mint_bump:u8, // 1
    authority : Pubkey, //32
    spl_token_mint : Pubkey //32
}

impl Vault {
    pub const LEN: usize =1 + 1 + 32 + 32;
}

```

In the above code, 6 accounts are passed.

1. An `spl_token_mint` account is created. In Solana, it is recommended to derive the account addresses using Program Derived Addresses (PDA). They are a deterministically generated address based on the program ID. Please refer [this](https://www.brianfriel.xyz/understanding-program-derived-addresses/) to know more about PDAs.

We setting other metadata fields like `mint::authority` and `mint::freeze_authority` to `payer`. We are setting `mint::decimals` to `0` for easy demonstration purpose. You could set the value to any number as you like-to.

2. `payer` is the one who is paying for calling `create_mint` instruction(discussed in next section). The account is a `signer` account and is set to `mut`.

3. We must pass `system_program` as well while invoking any instruction in solana program. This helps creating accounts. Refer [this](https://docs.solana.com/developing/runtime-facilities/programs#system-program) to know more.   

4. `token_program` account is passed for interacting with `token-program`.

5. `rent` account is passed as well as this will be used by `token-program` during mint account creation.

6. `vault` account is a PDA generated account. It is used for storing the state of the program. `Vault` struct is passed into the account generic where actual state is stored. We will have to pass in the space as well. To calculate the space for storing please refer [this](https://book.anchor-lang.com/anchor_references/space.html).

7. The `Vault` struct stores the state of the program. We will store bumps and authority of who initialised this program. Later, you can use this to secure your program by restricting the access to the instructions. Stored `bumps` are used later for deriving `PDA` addresses in other instructions.


### How to create an instruction? 

Above created `context` is passed as an argument to an instruction. An instruction is a function where we could achieve a set of described procedure. This is usually a state change in the Solana blockchain. Any executed instruction is [Turing](https://en.wikipedia.org/wiki/Turing_completeness#:~:text=In%20colloquial%20usage%2C%20the%20terms,purpose%20computer%20or%20computer%20language) complete.


Let us create an instruction which accepts the `context` as a parameter.

```rust
 pub fn create_mint(ctx: Context<CreateMint>) -> Result<()> {
      let vault = &mut ctx.accounts.vault;
      vault.authority = ctx.accounts.payer.key();
      vault.spl_token_mint_bump = *ctx.bumps.get("spl_token_mint").unwrap();
      vault.bump = *ctx.bumps.get("vault").unwrap();
      vault.spl_token_mint = ctx.accounts.spl_token_mint.key();

      Ok(())
 }

``` 

In the instruction above, we are storing the `bumps` and other state values into the `Vault` state.


### How to call the `create_mint` instruction from the client side? 

We will write `tests` for calling the the `create_mint` instruction. 

[image_6]

This is same as calling an instruction from the client side. 

In the `context` struct we are creating two PDA accounts(`spl_token_mint` and `vault`). Hence on the client side, we need to find PDAs for these two accounts and then pass these as arguments while calling the `create_mint` instruction.


Import the necessary libraries in the `spl-token.ts` test file.

```typescript
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SplToken } from "../target/types/spl_token";
import { PublicKey } from "@solana/web3.js";
import idl from "../target/idl/spl_token.json";
```

Then we will find two PDA addresses like below

```typescript

// pda for spl-token-mint account
export const findSplTokenMintAddress = async () => {
  return await PublicKey.findProgramAddress(
    [Buffer.from("spl-token-mint")],
    new PublicKey(idl.metadata.address)
  );
};

// pda for vault account
export const findVaultAddress = async () => {
  return await PublicKey.findProgramAddress(
    [Buffer.from("vault")],
    new PublicKey(idl.metadata.address)
  );
};

```

Add some `sols` before calling the instruction. Hence, let's call the below method before calling any instructions in the `spl-token.ts` test file. 

```typescript
export const addSols = async (
  provider: Provider,
  wallet: anchor.web3.PublicKey,
  amount = 1 * anchor.web3.LAMPORTS_PER_SOL
) => {
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(wallet, amount),
    "confirmed"
  );
};

```


And we will call the `create_mint` from the test file like below. 

```test
describe("spl-token", () => {
  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const payer = anchor.web3.Keypair.generate();

  before("Add sols to wallet ", async () => {
    await addSols(provider, payer.publicKey); // add some sols before calling test cases
  });

  const program = anchor.workspace.SplToken as Program<SplToken>;

  it("Spl token is initialized!", async () => {
    const [splTokenMint, _1] = await findSplTokenMintAddress();

    const [vaultMint, _2] = await findVaultAddress();

    const tx = await program.methods
      .createMint()
      .accounts({
        splTokenMint: splTokenMint,
        vault: vaultMint,
        payer: payer.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([payer])
      .rpc();

    const vaultData = await program.account.vault.fetch(vaultMint);

    assert(
      vaultData.splTokenMint.toString() === splTokenMint.toString(),
      "The spl token mint should be same"
    );

    console.log("Your transaction signature", tx);
  });
});

```
 

To test, run the command 
```bash
anchor test
bash
```

[image_7]

You should be able to see the output as below. By this, we have successfully created a `mint` and tested it out.


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

Anchor framework provides with `spl` token implementation of its own. This could be used to `mint` an account.

### Transfer the Minted token

Now that we have a minted an spl-token, it is time to understand about **Associated Token Account (ATA)**

* ATA is normally generated **off-chain**. 
* ATA is **PDA**. ATA is generated by finding a suitable PDA
* On the client side, one could generate a ATA as follows 

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

ATA is generated using 

* Any **public key**
* A **mint key** 
* Token program ID and Associated Token Program ID. These two are standard programs that are deployed on Solana.

You should pass **ATA** to an instruction to transfer a **mint**. In the program, use either `mint_to` instruction to transfer a newly created **mint**. (We will discuss about the differences between these two in the next guide)

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
```

With this, the spl-token mint is minted into the payer associated token account. 

## Next Steps

Next, we will discuss about difference between `mint_to` and `transfer` instruction from `spl_token` library 

If you are building a richer application, or want NFTs that can upgrade overtime, checkout the [Meta Blocks protocol](https://metablocks.world/guides/protocol).