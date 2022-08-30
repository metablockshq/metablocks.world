---
chapterNumber: 12
emoji: 👩🏼‍🎨
title: Revoke tokens from account
subTitle: Understand how to revoke tokens from authority account
slug: revoke-tokens
tags:
  - blockchain
guideSlug: anchor
---
## Outline

In the previous chapter, we looked at approving tokens to an authority account. In this chapter we will revoke those approved tokens.

The final outcome of this chapter could be found [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%2012%20-%20Revoke%20Tokens)

## Prerequisites

We will continue to use the previously built program. 

You can get it [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%2011%20-%20Approve%20Tokens)

## How to Revoke approved tokens from an account ?

In the previous tutorial, we had approved 5 tokens of `payer_mint_ata` to `another_authority` account. We will revoke those 5 approved tokens from `another_authority`.

It can be achieved by 2-step process. 

1. Create a `RevokeTokens` context
2. Create a `revoke_tokens` instruction.

### Step-1 : Create a `RevokeTokens` context

Let us create a `RevokeTokens` context.

```rust
// Revoke approved token account
#[derive(Accounts)]
pub struct RevokeTokens<'info> {
    #[account(
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

    #[account(
        mut,
        associated_token::mint = spl_token_mint,
        associated_token::authority = payer
    )]
    pub payer_mint_ata: Box<Account<'info, TokenAccount>>, // --> 3

    #[account(mut)]
    pub payer: Signer<'info>, // ---> 4

    pub system_program: Program<'info, System>, // ---> 5
    pub token_program: Program<'info, Token>,   // ---> 6
}
```

1. `payer_mint_ata` account uses `spl_token_mint` as mint
2. `vault` account contains the bumps
3. Revoke approved tokens of `payer_mint_ata` account  
4. Authority `payer` account is revoking tokens
5. Solana program uses `system_program` for executing program
6. We invoke cpi call to `token_program` to call `revoke` instruction.

### Step-2 : Create a `revoke_tokens` instruction

Now let us create a `revoke_tokens` instruction. Add the following code 

```rust
    pub fn revoke_tokens(ctx: Context<RevokeTokens>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Revoke {
                authority: ctx.accounts.payer.to_account_info(),
                source: ctx.accounts.payer_mint_ata.to_account_info(),
            },
        );
        token::revoke(cpi_context)?;
        Ok(())
    }
```

### Run the test case

With this, we should be ready to run test case on this. Add following test case in your `spl-tokens.ts` file.

```typescript
  it("should revoke approved tokens", async () => {
    try {
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [payerMintAta, _3] = await findAssociatedTokenAccount(
        payer.publicKey,
        splTokenMint
      );

      const tx = await program.methods
        .revokeTokens()
        .accounts({
          splTokenMint: splTokenMint,
          vault: vaultMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          payerMintAta: payerMintAta,
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

Run the following command

```bash
anchor test
```

You should be able to see the following output.

![](/img/content/guide-chapters/revoke_tokens_success.png "revoke_tokens_success")

With this we have understood how to revoke any approved (delegated) tokens.