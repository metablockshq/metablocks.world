---
chapterNumber: 8
emoji: 👩🏼‍🎨
title: Unfreeze token account
subTitle: Learn how to unfreeze a token account
slug: unfreeze-token-account
tags:
  - blockchain
guideSlug: anchor
---
## Outline

`thaw` instruction from `token` program is used to unfreeze a frozen token account. 

Therefore, the prerequisite to `thaw` instruction is that the token account is frozen.

The final outcome of this chapter can be found [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%208%20-%20Unfreeze%20Token%20Accounts)


## Prerequisite

For the demonstration purpose, we will retain only `create_mint`, `transfer_mint` and `freeze_token_account` instructions. 

So remove `transfer_token_to_another` instruction, `TransferTokenToAnother` context and test case related to it in `spl-token.ts` 

## How to `Thaw` (unfreeze) an account ?

A `thaw` operation is done on a token account to unfreeze a `frozen` account. Only `spl_token_mint` authority can perform this action. Hence only `payer` can perform this action.

This also involves the below process. 

1. Create a `UnfreezeTokenAccount` context  
2. Then write an instruction for freezing the token.

Let's create a `UnfreezeTokenAccount` context using the `struct`

```rust
// Unfreeze token account
#[derive(Accounts)]
pub struct UnfreezeTokenAccount<'info> {
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

We will now create an instruction `unfreeze_token_account` to unfreeze the token account.

Let's update the import in `lib.rs` file.

```rust
use anchor_spl::{token::{self, Mint, Token, TokenAccount, FreezeAccount, ThawAccount}, associated_token::AssociatedToken};
```

Add the `unfreeze_token_account` instruction.

```rust
    pub fn unfreeze_token_account(ctx : Context<UnfreezeTokenAccount>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            ThawAccount {
                account : ctx.accounts.payer_mint_ata.to_account_info(),
                mint : ctx.accounts.spl_token_mint.to_account_info(),
                authority : ctx.accounts.payer.to_account_info()
            },
        );
        token::thaw_account(cpi_context)?;
        Ok(())
    }
```

Add a test case in `spl-token.ts` to test unfreeze instruction.

```typescript
  it("should unfreeze token account of payer wallet ", async () => {
    try {
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [payerMintAta, _3] = await findAssociatedTokenAccount(
        payer.publicKey,
        splTokenMint
      );

      const tx = await program.methods
        .unfreezeTokenAccount()
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

Run the command 

```bash
anchor test
```

You should see a successful test run.

![](/img/content/guide-chapters/thaw_account_success.png "thaw_account_success")

In the chapter, we will focus on `burning` tokens.