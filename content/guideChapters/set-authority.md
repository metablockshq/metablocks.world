---
chapterNumber: 10
emoji: 👩🏼‍🎨
title: Change authority for token mint
subTitle: Understand how to change authority for token mint
slug: set-authority
tags:
  - blockchain
guideSlug: anchor
---
## Outcome

We will understand on how to transfer authority to others. 

The are totally 4 types of authorities 
1. Mint Tokens - Authority to mint new tokens
2. Freeze Accounts - Authority to freeze any account associated with the Mint
3. Account Owner - Owner of a given token account
4. CloseAccount - Authority to close a token account

We will look at each of these authority type and understand how to perform these operations

The outcome of this chapter is found [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%2010%20-%20Set%20Authority)



## How to set authority for token mints ? 

It's is a 2-step process.
1) Create a `SetMintTokenAuthority` context
2) Create a set_mint_token_authority  instruction 


### Step-1 : Create a `SetMintTokenAuthority` context
Let us create a set mint token authority like below. We will transfer the mint token authority to `anotherAuthority`. And we pass that account as `Signer` in the context.

```rust
// Set Mint Token Authority context
#[derive(Accounts)]
pub struct SetMintTokenAuthority<'info> {
    #[account(
        mut,
         seeds = [
            b"spl-token-mint".as_ref(),
         ],
        bump = vault.spl_token_mint_bump,
    )]
    pub spl_token_mint: Account<'info, Mint>, // ---> 1

    #[account(
        seeds = [
            b"vault"
        ],
        bump = vault.bump, // --> 2
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub payer: Signer<'info>, // ---> 3

    pub another_authority: Signer<'info>, // ---> 4

    pub system_program: Program<'info, System>, // ---> 5
    pub token_program: Program<'info, Token>,   // ---> 6

    pub rent: Sysvar<'info, Rent>, // ---> 7
}

```

1) We pass `spl_token_mint` account. We are changing this mint's authority
2) We `vault` account as it contains `spl_token_mint_bump` value
3) `payer` account is the original authority of `spl_token_mint`
4) `another_authority` account to which we are passing the authority to
5) `system_program` to manage accounts
6) We invoke `set_authority` instruction of `token_program` through CPI.

Let us create an instruction to change the authority.

Import the following dependencies
```rust
use anchor_lang::prelude::*;
use anchor_spl::token::spl_token::instruction::AuthorityType;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount},
```

And add the following instruction.

```rust
    pub fn set_mint_authority(ctx: Context<SetMintTokenAuthority>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::SetAuthority {
                current_authority: ctx.accounts.payer.to_account_info(),
                account_or_mint: ctx.accounts.spl_token_mint.to_account_info(),
            },
        );
        token::set_authority(
            cpi_context,
            AuthorityType::MintTokens,
            Some(ctx.accounts.another_authority.key()),
        )?;
        Ok(())
    }

```

With this instruction above, it is easy to change the authority. We use `AuthorityType::MintTokens` to change the authority. Let us test this out.

In the `spl-token.ts` file add the following test case 

```typescript 
//set mint authority to another wallet test
  it("should set mint authority to anotherWallet", async () => {
    const [splTokenMint, _1] = await findSplTokenMintAddress();

    const [vaultMint, _2] = await findVaultAddress();

    const tx = await program.methods
      .setMintAuthority()
      .accounts({
        splTokenMint: splTokenMint,
        vault: vaultMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        anotherAuthority: anotherWallet.publicKey,
        payer: payer.publicKey,
      })
      .signers([payer, anotherWallet])
      .rpc();

    console.log("Your transaction signature", tx);
  });
``` 

And run the following command

```bash
anchor test
```

You should be able to see the following output.

[set_mint_tokens_authority_success]


Now we will look at how to change the `FreezeAccount` authority.

## How to set Freeze Authority for an account ? 

If we observe carefully, when we created `mint` instruction and created `spl_token_mint` we had set the freeze authority to `payer`. 

Now let us change that to `another authority`. 

Again, it is a 2-step process.

It's is a 2-step process.
1) Create a `SetFreezeAccountAuthority` context
2) Create a set_freeze_account_authority instruction 


### Step-1 : Create a `SetFreezeAccountAuthority` context

We create `SetFreezeAccountAuthorityContext` as below.

```rust

// Set Freeze Account Authority context
#[derive(Accounts)]
pub struct SetFreezeAccountAuthority<'info> {
    #[account(
        mut,
         seeds = [
            b"spl-token-mint".as_ref(),
         ],
        bump = vault.spl_token_mint_bump,
    )]
    pub spl_token_mint: Account<'info, Mint>, // ---> 1

    #[account(
        seeds = [
            b"vault"
        ],
        bump = vault.bump, // --> 2
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub payer: Signer<'info>, // ---> 3

    pub another_authority: Signer<'info>, // ---> 4

    pub system_program: Program<'info, System>, // ---> 5
    pub token_program: Program<'info, Token>,   // ---> 6
}
```

1) We pass `spl_token_mint` account. We are changing freeze authority for this mint
2) We `vault` account as it contains `spl_token_mint_bump` value
3) `payer` account is the original authority of `spl_token_mint`
4) `another_authority` account to which we are passing the authority to
5) `system_program` to manage accounts
6) We invoke `set_authority` instruction of `token_program` through CPI.

Let us create an instruction to change the authority.

```rust
    pub fn set_freeze_account_authority(ctx: Context<SetFreezeAccountAuthority>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::SetAuthority {
                current_authority: ctx.accounts.payer.to_account_info(),
                account_or_mint: ctx.accounts.spl_token_mint.to_account_info(),
            },
        );
        token::set_authority(
            cpi_context,
            AuthorityType::FreezeAccount,
            Some(ctx.accounts.another_authority.key()),
        )?;
        Ok(())
    }
```

Let's test this out using the following test case. Write the test case in `spl-token.ts` 

```typescript
  //set freeze account authority to another wallet test
  it("should set freeze account authority to anotherWallet", async () => {
    const [splTokenMint, _1] = await findSplTokenMintAddress();

    const [vaultMint, _2] = await findVaultAddress();

    const tx = await program.methods
      .setFreezeAccountAuthority()
      .accounts({
        splTokenMint: splTokenMint,
        vault: vaultMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        anotherAuthority: anotherWallet.publicKey,
        payer: payer.publicKey,
      })
      .signers([payer, anotherWallet])
      .rpc();

    console.log("Your transaction signature", tx);
  });

```

Run the following command 

```bash
anchor test
```

You should be able to see the following 

[set_freeze_authority_success]


Next, we will look at `AccountOwner` authority type.


### How to set `AccountOwner` authority to a token account?

This is used in the cases where we want to delegate token account  ownership to another authority.

In the following code example, we will transfer the `payer_mint_ata` to `another_mint_ata` account.


 




 


