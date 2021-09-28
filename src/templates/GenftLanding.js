import React, {useState} from "react"
import {Parallax, ParallaxLayer} from"@react-spring/parallax"

import Footer from "../components/Footer";
import {MetaBlocksNav} from "../components/Nav"
import img from "../utils/image"
import useWindowSize from "../utils/hooks/useWindowSize"

import heroIllustration from "../images/genft/hero-character-on-lounge-chair.png"

import howMint from "../images/genft/how-mint.png"
import howDrop from "../images/genft/how-drop.png"
import howGenerate from "../images/genft/how-generate.png"

import contractBase from "../images/genft/contract-base.png"
import contractShelf from "../images/genft/contract-shelf.png"

import characterPresenting from "../images/genft/character-presenting.png"
import characterWaving from "../images/genft/character-waving.png"
import characterThinking from "../images/genft/character-thinking.png"

import roboVerse from "../images/genft/robot-verse.png"
import tigerCubVerse from "../images/genft/tiger-cub-verse.png"

import mountainFlag from "../images/genft/mountain-flag.png"
import hourGlass from "../images/genft/hour-glass.png"
import phoneChat from "../images/genft/phone-chat.png"
import moneyVault from "../images/genft/money-vault.png"
import tokenGraph from "../images/genft/token-graph.png"
import chartStats from "../images/genft/chart-stats.png"

import whatsappSticker from "../images/genft/whatsapp-sticker.png"
import instagramPost from "../images/genft/instagram-post.png"
import podcast from "../images/genft/podcast.png"
import minecraft from "../images/genft/minecraft.png"

import solanaLogo from "../images/genft/solana.svg"

const pastelBlue = "#D8E8EA"
const darkGreen = "#367856"
const lightGreen = "#C8DCC6"
const offWhite = "#FFF7D4"
const peach = "#F1A889"

const Button = ({label, onClick = () => {}}) =>
      (<a className="link br-pill ph3 pv2 mb2 dib white bg-light-red b f3" href="#"
	  onClick={e => {
	    e.preventDefault()
	    onClick(e)
	  }}
       >
	 {label}
       </a>)

const CTA = ({containerClassName = "", onClick}) =>
      (<div className={`${containerClassName}`}>
	 <div className="mb2 i">Get started now!</div>
	 <Button label="Connect wallet" onClick={onClick} />
       </div>)

const FloatingBanner = () =>
      (<div className="fixed w-100 z-1 db bottom-0" style={{left: "50%", transform: "translateX(-50%)"}}>
	  <div className="flex pv2 justify-between items-center br3 mb3 ph3"
		 style={{backgroundColor: "rgba(0, 0, 0, 0.5)",
			 backdropFilter: "saturate(180%) blur(5px)",
			 marginLeft: "5%", marginRight: "5%"}}>
	    hello
	  </div>
       </div>)

const Heading = ({title, subTitle, titleClassName = ""}) =>
      (<div>
         <h1 className={`f3 f2-m f1-ns ${titleClassName}`}>{title}</h1>
         {subTitle && <h2 className="f5 f5-m f4-l black-80 normal nt1 lh-copy">{subTitle}</h2>}
       </div>)

const Hero = ({openSignupDialog}) =>
      (<div className="pt4 mt5 tc dt w-90 br3 center" style={{backgroundColor: darkGreen, color: offWhite}}>
	 <div className="dtc v-mid tc">
	   <div className="w-90 f5 f4-ns w-80m w-40-l center">
	     Meta Blocks is an NFT Evolution Protocol that lets you build up your NFTs, buy accessories that you like and trade them on secondary marketplaces.
	   </div>
	   <h1 className="f1 f-subheadline-m f-headline-l nb4 mt3">
	     Unleash NFTs
	   </h1>
	   <img src={heroIllustration}
		className="vh-50-l mt2 mt0-ns"
		alt="Character sitting on a lounge chair with laptop" />
	   <CTA containerClassName="nt2 mb3" onClick={openSignupDialog} />
	 </div>
       </div>)

const HowImageColumn = ({imageSrc, imageAlt, imageClass, imageStyle, containerClass, containerStyle,
			 title, description}) =>
      (<div className={`overflow-hidden ${containerClass}`} style={{...containerStyle}}>
	 <img className={`${imageClass}`} style={{...imageStyle}} src={imageSrc} alt={imageAlt} />

	 <div className="dib dib-m dn-l mv3">
	   <h3 className="mv0">{title}</h3>
	   <div className="ph3 black-80 tl lh-copy">{description}</div>
	 </div>

       </div>)

const HowTextColumn = ({title, description}) =>
      (<div className={`dn dn-m db-l`} style={{...{}}}>
	 <h3 className="">{title}</h3>
	 <div className="ph5 black-80 tl lh-copy">{description}</div>
       </div>)

const howCols = [{
  imageSrc: howMint,
  imgAlt: "",
  imageClass: "",
  imageStyle: {maxHeight: "33vh"},
  containerClass: "mt4 w-100 w-100-m w-33-l",
  title: "1. Mint free base layer",
  description: <>
		 <p>
		   The base layer defines your characters features like skin color, body structure, hair type and basic shoes. Minting also comes with an optional pair of clothing. <strong>Base layers are not-scarce hence not valuable</strong>.
		 </p>
	       </>
}, {
  imageSrc: howDrop,
  imgAlt: "",
  imageClass: "",
  imageStyle: {},
  containerClass: "mt4 w-100 w-100-m w-33-l nr6",
  title: "2. Participate in drops",
  description: <p>
		 Frequent drops introduce limited edition collectibles. These NFTs augment with your base layer to form a hybrid scene. Drops can happen at anytime. <strong>Drops can be collected and resold.</strong>
	       </p>
}, {
  imageSrc: howGenerate,
  imgAlt: "",
  imageClass: "nr6",
  imageStyle: {minHeight: "33vh", width: "100%", objectFit: "contain"},
  containerClass: "w-100 w-100-m w-50-l nt0 nl0 nt0-m nl0-m nt4-l nl6-l",
  title: "3. Generate your(NFT)self",
  description: <p>
		 Generate multiple scenes that showcase one or more of your collectibles. Everything stays on-chain as a single token. <strong>You can also create parallel-universe renders of your collection. </strong>
	       </p>
}]

const HowItWorks = ({openSignupDialog}) =>
      (<div className="pv3 mt4 tc w-90 center br3 mv3" style={{backgroundColor: lightGreen}}>
	 <Heading title={"How it works ?"} />
	 <div className="flex flex-column flex-column-m flex-row-l justify-between mt0 mt0-m mt5-l">
	   {howCols.map(h => <HowImageColumn key={h.imageSrc} {...h} />)}
	 </div>
	 <div className="flex flex-row justify-between">
	   {howCols.map(h => <HowTextColumn key={h.imageSrc} {...h} />)}
	 </div>
	 <CTA containerClassName="mt4" onClick={openSignupDialog} />
       </div>)


const DataNotRenders = ({openSignupDialog}) =>
      (<div className="w-90 center br3 pv3 mv2 tc ph3 ph2-m ph0-ns" style={{backgroundColor: pastelBlue}}>
	 <Heading title={"Contract stores data not renders"}
		  subTitle={"When you buy items, the new traits are added to your original NFT. The old NFT is either burnt or held in a contract for later release."}/> 

	 <div className="w-100 w-90-m w-70-l center flex flex-row mt5">
	   <div className="" style={{flex: 1}}>
	     <img className="h5" src={howMint} />
	     <img className="nt5" src={contractBase} style={{}}/>
	   </div>

	   <div style={{flex: 1.6}}>
	     <img className="min-h5" src={howGenerate} />
	     <img className="w-80 nt2 nt5-ns tc" src={contractShelf} style={{}}/>
	   </div>
	 </div>

	 <CTA containerClassName="mt4" onClick={openSignupDialog} />
       </div>)

const multiverseRenders = [{id: 1, title: "Presenting render", imageSrc: characterPresenting},
			   {id: 2, title: "Waving render", imageSrc: characterWaving},
			   {id: 3, title: "Thinking render", imageSrc: characterThinking}]

const Multiverse = () =>
      (<div className="tc pv4" style={{backgroundColor: lightGreen}}>
	 <Heading title="GENFTs help form multiverses"
		  subTitle="Since the render is the function of the properties of your NFT, the same NFT can be rendered in multiple scenes as images, videos or stickers."/>

	 <div className="w-40 center flex flex-row justify-between mt5">
	   {multiverseRenders.map(r =>
	     (<div key={r.id} className="">
		<img src={r.imageSrc} />
		<div className="mt3 black-80">{r.title}</div>
	      </div>))}
	 </div>
       </div>)

const parallelUniverseCharacters = [{id: 1, title: "Human Verse", imageSrc: characterPresenting},
				    {id: 2, title: "Tennis Ball Joint Robo Verse", imageSrc: roboVerse},
				    {id: 3, title: "Tiger Cub Verse", imageSrc: tigerCubVerse}]
const ParallelUniverse = () =>
      (<div className="tc pv4" style={{backgroundColor: lightGreen}}>
	 <Heading title="Parallel Universes"
		  subTitle="GENFTs by design are formless. The form a GENFT takes depends on the context. This allows to reuse attributes across universes. Ahem ahem games." />

	 <div className="w-40 center justify-between items-center flex flex-row mt5">
	   {parallelUniverseCharacters.map(c =>
	     (<div key={c.id} className="flex flex-row items-center">
		<div>
		  <img src={c.imageSrc} />
		  <div className="mt3 black-80">{c.title}</div>
		</div>
		{c.id < 3 && <div className="f-headline">=</div>}
	      </div>))}
	 </div>
       </div>)

const links = [{id: 1, imageSrc: mountainFlag, title: "Aspiration"},
	       {id: 2, imageSrc: hourGlass, title: "Timeline"},
	       {id: 3, imageSrc: phoneChat, title: "Discord"},
	       // {id: 4, imageSrc: moneyVault, title: "Investors"},
	       // {id: 5, imageSrc: tokenGraph, title: "Tokenomics"},
	       // {id: 6, imageSrc: chartStats, title: "Whitepaper"}
	       {id: 7, imageSrc: moneyVault, title: "Connect wallet", primary: true},
	      ]

const Links = () =>
      (<div className="tc pv4 fixed bottom-0 w-100" style={{}}>
	 <div className="center flex justify-center" style={{}}>
	   {links.map(l =>
	     (<div key={l.id} className="pointer dim ph3">
		<img src={l.imageSrc} className="h3"/>
		<div className="br-pill ph3 pv2 black-90 mt3 b f4" style={{backgroundColor: l.primary ? peach : offWhite}}>
		  {l.title}
		</div>
	      </div>))}
	 </div>
       </div>)

const useCases = [{
  title: "Stickers only you own",
  body: <p>Meta Blocks collectibles can be used to express yourself in your day to day communications. This brings <strong>real world utility</strong> to your digital assets.</p>,
  image: whatsappSticker
}, {
  title: "Auto generated visual content",
  body: <p>Auto generate visuals for any text input, like tweets. Visuals can be shared on various photo based social networks. The generated visuals are a function of your Meta Blocks. This <strong>unlocks a new wave of creative influencers</strong>.</p>,
  image: instagramPost
}, {
  title: "Auto generated podcasts",
  body: <p>With advances in text to speech specially with MelGans (et. al. Lyrebird AI), vocal footprint can be encoded as a trait and used to generate audio content from text. A <strong>user can encode their own voice or buy a unique voice</strong> from the market.</p>,
  image: podcast
}, {
  title: "Gaming SDKs / 3D models",
  body: <p>Open source 3d meshes and traits info will enable game developers to encode NFT traits into game characters.  We plan to build an open SDK for game studios and <strong>encode this character into Minecraft ourselves</strong>.</p>,
  image: minecraft
}]

const UseCaseHeading = ({title, subTitle, titleClassName = ""}) =>
      (<div>
         <h1 className={`f4 f3-m f2-ns ${titleClassName}`}>{title}</h1>
         {subTitle && <h2 className="f5 f5-m f4-l black-80 normal nt1 lh-copy">{subTitle}</h2>}
       </div>)

const UseCase = ({title, body, image, containerClass, containerStyle}) =>
      (<div className={`br3 flex flex-column flex-row-ns items-center ph4 pv3 ${containerClass}`}
	    style={{...containerStyle, ...{backgroundColor: "rgb(255, 230, 230)"}}}>
	 <img src={image} alt={title} className="vh-25 vh-25-m vh-50-l mr0 mr4-ns br4 shadow-3" />
	 <div>
	   <div className="mt3 mt0-ns ttu f7 b black-60">Use Case</div>
	   <UseCaseHeading title={title} subTitle={body} titleClassName="mt2" />
	 </div>
       </div>)

const UseCases = () => {
  const windowSize = useWindowSize()
  return (<div className="w-90 flex-wrap center flex flex-row justify-between"
	       id="use-cases">
	    {useCases.map(u =>
	      <UseCase key={u.title} containerClass={"mt3"}
		       containerStyle={{width: windowSize.width > 1278 ? "49.2%" : "100%"}}
		       {...u}
	      />
	    )}
	  </div>)
}

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

const comps = [
  Hero,
  HowItWorks,
  DataNotRenders,
  // <Multiverse/>,
  // <ParallelUniverse />,
  UseCases
]

const Landing = () => {
  const [signupDialogOpen, setSignupDialogOpen] = useState(false)
  const openSignupDialog = () => setSignupDialogOpen(true)
  return (<>
	    <MetaBlocksNav
	      signupDialogOpen={signupDialogOpen} setSignupDialogOpen={setSignupDialogOpen}
	      onConnectWalletClick={openSignupDialog}
	    />
	    {comps.map((Comp, i) =>
	      <React.Fragment key={i}>
		<Comp openSignupDialog={openSignupDialog} />
	      </React.Fragment>)}

	    <Footer />

	    <SolanaBadge />
	  </>)
}

export default Landing;
