import React from "react"
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react"
import {getPhantomWallet} from "@solana/wallet-adapter-wallets"
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from "@solana/wallet-adapter-react-ui"

import config from "../config"

import "@solana/wallet-adapter-react-ui/styles.css"

const wallets = [
  getPhantomWallet()
]

const SolanaProviders = ({children}) =>
      (<ConnectionProvider endpoint={config.solanaRpcEndpoint}>
	 <WalletProvider wallets={wallets} autoConnect={true}>
	   <WalletModalProvider>
	     {children}
	   </WalletModalProvider>
	 </WalletProvider>
       </ConnectionProvider>)

const SolanaWalletButtons = () =>
      (<>
	 <WalletMultiButton />
	 <WalletDisconnectButton />
       </>)


export {SolanaProviders, SolanaWalletButtons}
