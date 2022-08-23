---
chapterNumber: 1
emoji: 👨‍💻
title: Spl Tokens
slug: spl-tokens
tags:
  - blockchain
guideSlug: anchor
---
## What is an SPL-token?

Solana blockchain tokens are called as SPL-tokens. SPL-Tokens are created using [token-program](https://spl.solana.com/token). 

Even though the native there is a way to create/transfer and manipulate spl-tokens using the solana native program, it is easier to use to do the same using **Anchor Framework**

In this series, we will use `Anchor Framework` extensively to understand the concepts.


## Prerequisites

This guide requires you to have following installed

* Rust CLI - Following this [link](https://www.rust-lang.org/tools/install) for installing in your machine
* You should have installed `Solana` in your machine - Please follow this [link](https://docs.solana.com/cli/install-solana-cli-tools)
* You should have installed **Anchor Framework**  - Please follow this [link](https://book.anchor-lang.com/getting_started/installation.html#anchor)
* Typescript on the client side. (Anchor Framework generates a client code as well)