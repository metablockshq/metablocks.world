import React from "react"

import Shell from "../components/Shell"
import {SolanaWalletButtons} from "../components/SolanaWallet"
import {DashNav} from "../components/Nav"
import {
    WalletDisconnectButton,
    WalletMultiButton
} from "@solana/wallet-adapter-react-ui"



const Dashboard = () =>
      (<Shell nav={<DashNav />}>
	 Dashboard
       </Shell>)

export default Dashboard
