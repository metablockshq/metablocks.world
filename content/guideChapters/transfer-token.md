---
chapterNumber: 6
emoji: 👩🏼‍🎨
title: Token transfer
slug: transfer-token
tags:
  - blockchain
guideSlug: anchor
---
## Outline

It is a necessary operation to transfer tokens between accounts. Use `transfer` instruction of `token` program to perform transfer operation. 

The final outcome of this chapter could be found [here](https://github.com/metablockshq/spl-token-chapters/tree/main/Chapter%206%20-%20Transfer%20Tokens)

## How to transfer a token to other account?

So far, we have created a mint and minted it to an account. But how to transfer the mint to other accounts?

It also involves the same process. Create a `TransferTokenToAnother` context and create an instruction `transfer_token_to_another` to achieve the end goal.

### How to create a `TransferTokenToAnother` context?

Below is the `struct` that we define for transferring a `spl_token_mint` token to other account.

```rust
// Transfer token to another account
#[derive(Accounts)]
pub struct TransferTokenToAnother<'info> {
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

    pub rent: Sysvar<'info, Rent>, // ---> 7

    pub associated_token_program: Program<'info, AssociatedToken>, // ---> 8

    #[account(
        init,
        payer = payer,
        associated_token::mint = spl_token_mint,
        associated_token::authority = another_account
    )]
    pub another_mint_ata: Box<Account<'info, TokenAccount>>, // --> 9

    /// CHECK : We just pass the account info for the demonstration purpose. Ideally this is either signer or trusted account
    pub another_account: AccountInfo<'info>, // ---> 10
}
```

1. We pass the `spl_token_mint` account without any `mut` or `init` decoration.
2. We pass the `vault`. This can be used for security purpose.
3. `payer_mint_ata` account from which we are transferring token to another ata
4. `payer` signer who is transferring the token
5. `system_program` account for executing the instruction.
6. `token_program` account used for performing `transfer` operation
7. `init` decorator uses `rent` account for creating account
8. We are creating a new ata account. Hence we pass `associated_token_program` 
9. `another_mint_ata` account to which we transfer the token.
10. `another_account` account is the owner of `another_mint_ata`

Create a `transfer_token_to_another` instruction for transferring a token.

```rust
    pub fn transfer_token_to_another(ctx : Context<TransferTokenToAnother>) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from : ctx.accounts.payer_mint_ata.to_account_info(),
                to : ctx.accounts.another_mint_ata.to_account_info(),
                authority : ctx.accounts.payer.to_account_info()
            },
        );
        token::transfer(cpi_context, 1)?;
        Ok(())
    }
```

Time to test the `transfer_token_to_another` instruction.

Let us first create anotherWallet and add it to the root of the test case.

```typescript
const anotherWallet = anchor.web3.Keypair.generate(); // newly created another wallet
```

And add some sols to the wallet using `addSols` function in `before` function block.

```typescript
  before("Add sols to wallet ", async () => {
    await addSols(provider, payer.publicKey);
    await addSols(provider, anotherWallet.publicKey); // add sols to another wallet 
  });
```

We will test case in `spl-token.ts`. Add the following in your test file.

```typescript
  it("should transfer 1 token from payer_mint_ata to another_mint_ata", async () => {
    try {
      
      const [splTokenMint, _1] = await findSplTokenMintAddress();

      const [vaultMint, _2] = await findVaultAddress();

      const [payerMintAta, _3] = await findAssociatedTokenAccount(
        payer.publicKey,
        splTokenMint
      );

      const [anotherMintAta, _4] = await findAssociatedTokenAccount(
        anotherWallet.publicKey,
        splTokenMint
      );

      const tx = await program.methods
        .transferTokenToAnother()
        .accounts({
          splTokenMint: splTokenMint,
          vault: vaultMint,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          payerMintAta: payerMintAta,
          payer: payer.publicKey,
          anotherMintAta: anotherMintAta,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          anotherAccount: anotherWallet.publicKey,
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

Then the output should be a success as shown below.

![](/img/content/guide-chapters/image_9.png "transfer_token_success")

So, far we have understood how minting and transfer work. In the next sections we will discuss about freezing a token account.