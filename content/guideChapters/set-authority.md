---
chapterNumber: 10
emoji: 👩🏼‍🎨
title: Change authority for accounts
subTitle: Understand how to change authority for accounts
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

## Prerequisite

For the demonstration purpose, we will retain only `create_mint`, `transfer_mint` instructions. 

So the remove the following from the previous chapter
1. `burn_token` instruction
2. `BurnToken` context

And remove test case related to it.

Or you could clone the [Chapter - 5 repo](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%205%20-%20Transfer%20New%20Mint) for getting started.

## How to set authority for token mints ?

It's is a 2-step process.

1. Create a `SetMintTokenAuthority` context
2. Create a set_mint_token_authority  instruction 

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

1. We pass `spl_token_mint` account. We are changing this mint's authority
2. We `vault` account as it contains `spl_token_mint_bump` value
3. `payer` account is the original authority of `spl_token_mint`
4. `another_authority` account to which we are passing the authority to
5. `system_program` to manage accounts
6. We invoke `set_authority` instruction of `token_program` through CPI.

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

Before proceeding to write test cases, do make sure that you have added `anotherWallet` as another wallet in the describe block.

```typescript
  const anotherWallet = anchor.web3.Keypair.generate(); // newly created another wallet
```

And add some sols to it in the `before` block of the test file

```typescript
 before("Add sols to wallet ", async () => {
    await addSols(provider, payer.publicKey); // add some sols before calling test cases
    await addSols(provider, anotherWallet.publicKey); // add sols to another wallet
  });

```

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

![](/img/content/guide-chapters/set_mint_tokens_authority_success.png "set_mint_tokens_authority_success")

Now we will look at how to change the `FreezeAccount` authority.

## How to set Freeze Authority for an account ?

If we observe carefully, when we created `mint` instruction and created `spl_token_mint` we had set the freeze authority to `payer`. 

Now let us change that to `another authority`. 

Again, it is a 2-step process.

It's is a 2-step process.

1. Create a `SetFreezeAccountAuthority` context
2. Create a set_freeze_account_authority instruction 

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

1. We pass `spl_token_mint` account. We are changing freeze authority for this mint
2. We `vault` account as it contains `spl_token_mint_bump` value
3. `payer` account is the original authority of `spl_token_mint`
4. `another_authority` account to which we are passing the authority to
5. `system_program` to manage accounts
6. We invoke `set_authority` instruction of `token_program` through CPI.

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

![](/img/content/guide-chapters/set_freeze_authority_success.png "set_freeze_authority_success")

Next, we will look at `AccountOwner` authority type.

### How to set `AccountOwner` authority to a token account?

This is used in the cases where we want to delegate token account  ownership to another authority.

In the following code example, we will transfer the `payer_mint_ata` authority to `another_authority` account.

We will follow the 2-step process again.

1. Create a `SetAccountOwnerAuthority` context.
2. Create a `set_account_owner` instruction.

### Step-1 : Create a `SetAccountOwnerAuthority` context.

Let create the context as below. 

```rust
// Set Account Owner Authority context
#[derive(Accounts)]
pub struct SetAccountOwnerAuthority<'info> {
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

    #[account(
        mut,
        associated_token::mint = spl_token_mint,
        associated_token::authority = payer
    )]
    pub payer_mint_ata: Account<'info, TokenAccount>, // ---> 4

    pub another_authority: Signer<'info>, // ---> 5

    pub system_program: Program<'info, System>, // ---> 6
    pub token_program: Program<'info, Token>,   // ---> 7
}
```

1. We pass `spl_token_mint` account. This is used by `payer_mint_ata` account
2. We `vault` account as it contains `spl_token_mint_bump` value
3. `payer` account is the original authority of `payer_mint_ata`
4. `payer_mint_ata` account authority is passed to `another_authority`
5. `another_authority` account to which we are passing the authority to
6. `system_program` to manage accounts
7. We invoke `set_authority` instruction of `token_program` through CPI.

Let us create an instruction to achieve this.

```rust
    pub fn set_account_owner_authority(ctx: Context<SetAccountOwnerAuthority>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::SetAuthority {
                current_authority: ctx.accounts.payer.to_account_info(),
                account_or_mint: ctx.accounts.payer_mint_ata.to_account_info(),
            },
        );
        token::set_authority(
            cpi_context,
            AuthorityType::AccountOwner, // authority type is AccountOwner
            Some(ctx.accounts.another_authority.key()),
        )?;
        Ok(())
    }
```

As you can above, we have set the `AuthorityType` to `AccountOwner`.

Write a test in `spl-token.ts` to test the instruction.

```typescript
 //set account owner to another wallet test
  it("should set account owner of payer_mint_ata to another wallet ", async () => {
    try {
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [payerMintAta, _3] = await findAssociatedTokenAccount(
        payer.publicKey,
        splTokenMint
      );
      const tx = await program.methods
        .setAccountOwnerAuthority()
        .accounts({
          splTokenMint: splTokenMint,
          vault: vaultMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          payerMintAta: payerMintAta,
          payer: payer.publicKey,
          anotherAuthority: anotherWallet.publicKey,
        })
        .signers([payer, anotherWallet])
        .rpc();

      console.log("Your transaction signature", tx);
    } catch (err) {
      console.log(err);
    }
  });
```

Run the following command to test 

```bash
anchor test
```

You should be able to see the following output.

![](/img/content/guide-chapters/account_owner_success.png "set_account_owner_success")

Next we will look at `CloseAccount` Authority type.

## How to set a CloseAccount Authority for a token account ?

We can set a Close Account authority for a token account. For the below example, we will set the `another_mint_ata` close authority to `payer` as authority. 

We use this authority to close and transfer remaining `lamports` to the authority account.

Let us follow the 2-step process to achieve our goal

1. Create a `CloseAccountAuthority` context
2. Create an instruction `close_account_authority` 

### Step-1 : Create a `CloseAccountAuthority` context.

To create a `CloseAccountAuthority` context, we will create a `struct` in the `lib.rs` file as below.

```rust
// Set Close Account Authority context
#[derive(Accounts)]
pub struct SetCloseAccountAuthority<'info> {
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

    #[account(
        init,
        associated_token::mint = spl_token_mint,
        associated_token::authority = another_authority,
        payer = payer
       
    )]
    pub another_mint_ata: Account<'info, TokenAccount>, // ---> 4

    pub another_authority: Signer<'info>, // ---> 5

    pub system_program: Program<'info, System>, // ---> 6
    pub token_program: Program<'info, Token>,   // ---> 7

    pub associated_token_program : Program<'info, AssociatedToken>, // ---> 8,

    pub rent: Sysvar<'info, Rent>, // ---> 9
}
```

1. We pass `spl_token_mint` account. 
2. We `vault` account as it contains `spl_token_mint_bump` value
3. `payer` account pays `another_mint_ata` account creation.
4. `another_mint_ata` account from which we want to transfer close authority to payer
5. `another_authority` account. We use this to create `another_mint_ata` account.
6. `system_program` to manage accounts
7. We invoke `set_authority` instruction of `token_program` through CPI.
8. `associated_token_account` is for creating `another_mint_ata` account
9. `rent` used by `system_program` to create a new account. 

Let us create an instruction to set close authority on `another_mint_ata`.

```rust
    pub fn set_close_account_authority(ctx: Context<SetCloseAccountAuthority>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::SetAuthority {
                current_authority: ctx.accounts.another_authority.to_account_info(),
                account_or_mint: ctx.accounts.another_mint_ata.to_account_info(),
            },
        );
        token::set_authority(
            cpi_context,
            AuthorityType::CloseAccount,
            Some(ctx.accounts.payer.key()),
        )?;
        Ok(())
    }
```

In the above instruction we are setting `CloseAccount` authority to `payer`.

We write the test case for this to test in `spl-token.ts` file.

```typescript
it("should set close account authority of another_mint_ata to payer wallet", async () => {
    try {
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [another_mint_ata, _3] = await findAssociatedTokenAccount(
        anotherWallet.publicKey,
        splTokenMint
      );
      const tx = await program.methods
        .setCloseAccountAuthority()
        .accounts({
          splTokenMint: splTokenMint,
          vault: vaultMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          anotherMintAta: another_mint_ata,
          payer: payer.publicKey,
          anotherAuthority: anotherWallet.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([payer, anotherWallet])
        .rpc();

      console.log("Your transaction signature", tx);
    } catch (err) {
      console.log(err);
    }
  });
```

Let us run the test case by running the following command

```bash
anchor test
```

You should be able to see the following after running the command.

![](/img/content/guide-chapters/set_close_account_success.png "set_close_account_success")

That's it for `SetAuthority` functionality. In the next chapter we will look at `approve` instruction for delegating tokens to another account.