---
chapterNumber: 7
emoji: 👩🏼‍🎨
title: Freeze Token Account
subTitle: Understand how to freeze a token account
slug: freeze-token-account
tags:
  - blockchain
guideSlug: anchor
---
## Outline

Sometimes it would be necessary to freeze a token account. In this chapter, we will look at freezing a token account. 

The final outcome of this chapter is found [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%207%20-%20Freeze%20Token%20Accounts)

## Prerequisite

For the demonstration purpose, we will retain only `create_mint` and `transfer_mint` instructions. 

So remove `transfer_token_to_another` instruction, `TransferTokenToAnother` context and test case related to it in `spl-token.ts` 

Or you can clone the [Chapter - 5 repo](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%205%20-%20Transfer%20New%20Mint) for getting started immediately

## How to freeze a token account ?

A `freeze` operation is done on a token account. This is so to prevent the `transfer` of tokens. 

Only `spl_token_mint` authority can perform this action. Hence only `payer` can perform this action.

This also involves the same process. 

1. Create a `FreezeToken` context  
2. Then write an instruction for freezing the token.

### How to create a `FreezeTokenAccount` context ?

Let's create a `FreezeTokenAccount` context using the `struct`

```rust
// Freeze token account
#[derive(Accounts)]
pub struct FreezeTokenAccount<'info> {
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
    pub vault : Account<'info, Vault>, 

    #[account(mut)]
    pub payer : Signer<'info>, // ---> 3


    #[account(
        mut,
        associated_token::mint = spl_token_mint,
        associated_token::authority = payer
    )]
    pub payer_mint_ata: Box<Account<'info, TokenAccount>>,  // --> 4

    pub system_program: Program<'info, System>, // ---> 5
    pub token_program: Program<'info, Token>,   // ---> 6
    
    pub rent: Sysvar<'info, Rent>, // ---> 7

    pub associated_token_program : Program<'info, AssociatedToken>,  // ---> 8
}
```

1. We pass the `spl_token_mint` account without any `mut` or `init` decoration.
2. We pass the vault. Again, this can be used for security purpose.
3. We pass `payer` as the `signer` this time. 
4. We pass `payer_mint_ata` where we want to `freeze` the account.
5. `system_program` account for executing the instruction.
6. `token_program` account used for performing `freeze` operation
7. `rent` might have to passed as we are using `associated_token_program`
8. `associated_token_program` account is passed for creating ATA.

We will now create an instruction `freeze_token_account` to freeze the token ATA account.

Let's update the import in `lib.rs` file.

```rust
use anchor_spl::{token::{self, Mint, Token, TokenAccount, FreezeAccount}, associated_token::AssociatedToken};
```

Then we add the instruction.

```rust
    pub fn freeze_token_account(ctx : Context<FreezeTokenAccount>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            FreezeAccount {
                account : ctx.accounts.payer_mint_ata.to_account_info(),
                mint : ctx.accounts.spl_token_mint.to_account_info(),
                authority : ctx.accounts.payer.to_account_info()
            },
        );
        token::freeze_account(cpi_context)?;
        Ok(())
    }
```

As we can see above, we are doing a `CPI` call to token program to freeze the `payer_mint_ata` account. 

The signature of `freeze_account` function is that is requires us to pass `FreezeAccount` struct as context. 

Since we are calling `token::freeze_account` function from another program, we need to create a `CPI context` by using `CpiContext::new` function.

To test this out, let us add a test case in the spl-token.ts` test file.

```typescript
  it("should freeze token account of payer wallet ", async () => {
    try {
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [payerMintAta, _3] = await findAssociatedTokenAccount(
        payer.publicKey,
        splTokenMint
      );

      const tx = await program.methods
        .freezeTokenAccount()
        .accounts({
          splTokenMint: splTokenMint,
          vault: vaultMint,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          payerMintAta: payerMintAta,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          payer: payer.publicKey,
        })
        .signers([payer])
        .rpc();

      console.log("Your transaction signature", tx);
    } catch (err) {
      console.log(err);
    }
  });
```

Now run the command 

```bash
anchor test
```

You should be able to pass the test as seen below.

![](/img/content/guide-chapters/freeze_account_success.png "freeze_account_success")

Alright, in the next chapter let's learn to unfreeze a token account using `thaw` instruction from `token` program