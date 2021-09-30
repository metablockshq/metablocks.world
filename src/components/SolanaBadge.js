import React from "react"
import solanaLogo from "../images/genft/solana.svg"

const SolanaBadge = () =>
      (<div className="fixed pa1 bottom-0"
	    style={{
	      backgroundColor: "rgba(0, 0, 0, 0.64)",
	      backdropFilter: "saturate(180%) blur(5px)",
	      borderRadius: "0 8px 0 0"
	    }}
       >
	 <img src={solanaLogo} alt="Solana Logo" className="mr2"
	      style={{height: 8}} />
	 <span className="bl b--white-60 ph1 white b f7">
	   Ignition Hackathon Project
	 </span>
       </div>)

export default SolanaBadge;
