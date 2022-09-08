---
chapterNumber: 3
emoji: 🧰
title: Kyraa SDK
slug: kyraa-sdk
guideSlug: protocol
---
Kyraa SDK provides a developer friendly API for development on top of Meta Blocks protocol. The SDK is [open-source](https://github.com/metablockshq/kyraa).

Kyraa is a mono repo that consists of multiple utilities. The NFT upgradation SDK is a part of the `kyraa/metablocks` package.

## Installation
You can use yarn or npm to install `kyraa/metablocks` in your project.

```bash
yarn add @kyraa/metablocks
```

## Install peer dependancies
This package also relies on some other packages that you need to install to your project

```bash
yarn add  @metaplex-foundation/mpl-token-metadata @project-serum/anchor @solana/web3.js axios loglevel
```

## Integration with React JS
Kyraa wraps the the Solana Wallet Adapter for easy usage with React JS. In order to use this wrapper, you can install the `kyraa/solana` package. 

```bash
yarn add @kyraa/solana
```

### Setup providers
You can wrap any component with the provider to access Solana wallet. You can also wrap your entire app once to make the provider available to all components.

```js
// import providers
import { provider } from "@kyraa/solana";

const {SolanaProvider} = provider

// wrap your component
function Root() {
  return (<SolanaProvider network="devnet">
    <App />
  </SolanaProvider>)
}
```
The `network` prop can be one of `devnet`, `testnet` or `mainnet-beta`.

### Use wallets and connections

The `kyraa/solana` package also exposes some hooks from the wallet adapter library. 

```js
// import hooks
import { hooks } from "@kyraa/solana";

const { useConnection, useWallet, useWalletModal } = hooks

// inside your component
function App() {
  const { wallet, publicKey, connect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();

  return (</>)
}
```

### Show connection modal
In order to show the modal to connect to the wallet, you can call the `setVisible` function from the `useWalletModal` hook

```js
<button onClick={() => setVisible(true)}>Connect</button>
```

With Kyraa SDK installed, you can start interacting with the on-chain programs.
