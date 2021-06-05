import React from "react"
import {Head} from "react-static"
import {Link} from "react-router-dom"

import Shell from "../components/Shell"
import {TinycanvaNav} from "../components/Nav"
import SEO from "../components/SEO"
import array from "../utils/array"
import YoutubeEmbed from "../components/YoutubeEmbed"
import {qAndAs, features, WeLoveClojure, freeResources} from "./tinycanva/data.js"
import "./tinycanva/tinycanva.css"

import newlineLogo from "../images/newline-logo-white.svg"
import bankNote from "../images/emoji/dollar-banknote.png"

const ShivekKhuranaAndNewline = () =>
      (<div className="flex justify-center items-center f7 f6-ns">
	 <Link to="/authors/shivekkhurana" className="dib mh2 underline b">Shivek Khurana</Link> and
	 <a href="https://newline.co" className="dib">
	   <img className="h1 h2-ns mh2 white pt1"
		src={newlineLogo}
		alt="Newline.co Logo" />
	 </a>
	 presents
       </div>)

const RemarkableTool = () =>
      (<div className="w-100 w-100-m w-40-l">
	 <h3 className="georgia f3 f3-m f2-l normal mv0">Clojure is a remarkable tool for thought</h3>
	 <WeLoveClojure />
       </div>)

const WistiaEmbed = () =>
      (<>
	 <Head>
	   <script src="https://fast.wistia.com/embed/medias/ler01csxi6.jsonp" async></script>
	   <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
	 </Head>
	 <div className="wistia_responsive_padding" style={{padding: "56.25% 0 0 0", position: "relative"}}>
	   <div className="wistia_responsive_wrapper" style={{height: "100%", left: 0, position: "absolute", top: 0, width:"100%"}}>
	     <div className="wistia_embed wistia_async_ler01csxi6 videoFoam=true" style={{height: "100%", position: "relative", width: "100%"}}>
	       <div className="wistia_swatch" style={{height: "100%", left: 0, opacity: 0, overflow: "hidden", position: "absolute", top: 0, transition: "opacity 200ms", width: "100%"}}>
		 <div dangerouslySetInnerHTML={{__html: `<img src="https://fast.wistia.com/embed/medias/ler01csxi6/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />`}}>
		 </div>
	       </div>
	     </div>
	   </div>
	 </div>
       </>)

const Header = () =>
      (<header className="mt4 mt5-ns">
	 <ShivekKhuranaAndNewline />

	 <h1 className="georgia f3 f2-ns mt4 mb2 tc w-100 w-70-ns center">
	   Tinycanva: Clojure for React Developers
	 </h1>

	 <h2 className="f4 f3-ns normal white-60 mv0 tc">
	   A course on building a web-based graphics editor with Clojure.
	 </h2>

	 <div className="flex flex-column flex-column-m flex-row-l justify-between black br4 bg-white ph3 ph4-m ph5-l pv3 pv4-m pv4-l items-center mt4 mt5-ns">
	   <RemarkableTool />
	   <div className="w-100 w-100-m w-50-l">
	     <WistiaEmbed />
	   </div>
	 </div>
       </header>)

const QAndA = ({emoji, question, answer: Answer}) =>
      (<div className="mt4 QAndA">
	 <img src={emoji} className="" style={{height: 40, width: 40}} />
	 <div className="georgia f4 f3-ns mt2 b">{question}</div>
	 <div className="mt3 lh-copy f6 f5-ns"><Answer /></div>
       </div>)

const QAndAGrid = () =>
      (<section id="faq"
	    className="mt4 flex justify-between flex-wrap">
	 {qAndAs.map(qa => <QAndA key={qa.question} {...qa} />)}
       </section>)

const Feature = ({title, body, containerClass}) =>
      (<div className={`mb3 ${containerClass}`}>
	 <div>{title}</div>
	 <div className="dn db-ns mt2 white-50">{body}</div>
       </div>)

const freeFeatures = features.filter(f => f.free)
const paidFeatures = features.filter(f => !f.free)
const partedPaidFeatures = array.partition(paidFeatures, paidFeatures.length/2)

const PricingPlanHeader = ({price, title, subTitle}) =>
      (<div className="mt3 mb3 bb pb4 b--white-40">
	 <div className="f1 f3-m f1-l georgia mb3 mb2-m mb4-ns">{price}</div>
	 <div className="f4 f4-m f3-l b mb1">{title}</div>
	 <div className="h0 h1-ns f6 f5-ns i white-70">{subTitle}</div>
       </div>)

const PricingSectionHeader = () =>
      (<div className="flex items-center justify-between">
	 <h1 className="f2 georgia b">Pricing</h1>
	 <img src={bankNote} className="dib h2" />
       </div>)

const Plans = () =>
      (<div className="flex flex-column flex-row-ns justify-between">
 	 <div className="w-100 w-30-m w-30-l">
	   <PricingPlanHeader price="$ 0.00"
			      title="Reduce Mode" />
 	   {freeFeatures.map(f => <Feature key={f.title} {...f} />)}
 	 </div>

	 <div className="w-100 w-70-m w-70-l pl0 pl4-ns">
	   <PricingPlanHeader price="$ 49.00"
			      title="Transduce Mode"
			      subTitle="Everything in Reduce Mode plus"/>
	   <div className="flex flex-column flex-row-ns justify-between">
	     <div className="w-100 w-50-ns">
	       {partedPaidFeatures[0].map(f => <Feature key={f.title} {...f} />)}
	     </div>

	     <div className="w-100 w-50-ns">
	       {partedPaidFeatures[1].map(f => <Feature key={f.title} {...f} />)}
	     </div>
	   </div>
	 </div>
       </div>)

const Purchase = () =>
      (<>
	 <div className="flex flex-column flex-row-ns justify-between b f4 mt4">
	   <div className="w-100 w-30-ns link pointer bg-white black br3 pv2 br3 tc mb3 mb0-ns">
	     <a href="https://www.newline.co/samples/course/tinycanva-clojure-for-react-developers" className="db w-100">
	       Enroll Free
	     </a>
	   </div>

	   <div style={{backgroundColor: "#2A6A5E"}}
		className="w-100 w-70-ns ml0 ml4-ns link pointer white br2 pv2 br3 tc mt3 mt0-ns">
	     <a href="https://www.newline.co/courses/tinycanva-clojure-for-react-developers" className="db w-100">
	       Enroll Full ($ 49.00)
	     </a>
	   </div>
	 </div>

	 <div className="f6 white-50 mt3">
	   Enrollments, payments and course delivery is handled by Newline.
	 </div>
       </>)

const Pricing = () =>
      (<section id="pricing"
		className="ba bw2 br4 ph4 b--white-80 mt5 pb5">
	 <PricingSectionHeader />
	 <Plans />
	 <Purchase />
       </section>)

const FreeResource = ({resource}) =>
      (<a href={resource.url} className="db FreeResource">
	   <h3 className="underline f4 f5-ns">{resource.title}</h3>
	   <p className="white-80 f6">{resource.subTitle}</p>
       </a>)

const FreeResources = () =>
      (<section id="more-resources"
		className="mt5 pb5">
	 <h2 className="f4 f3-ns georgia">Can't commit to a coures?</h2>
	 <p className="">We understand that everyone might not have the time or motivation to go through an extensive course. Here is our reccomendation on other free resources to jump-start your Clojure journey:</p>
	 <div className="flex justify-between flex-wrap">
	   {freeResources.map(r => <FreeResource key={r.url} resource={r} />)}
	 </div>
       </section>)

const Tinycanva = () =>
      (<>
	 <SEO title="Tinycanva - Clojure for React developers"
	      subTitle="A course on building a web-based graphics editor with Clojure."
	      tags="clojure,course,react,clojure app,tinycanva course" />
	 <div className="white"
	      style={{backgroundColor: "#1B1B1B"}}
	 >
	   <Shell nav={TinycanvaNav}>
	     <div className="w-90 w-80-m w-60-ns center">
	       <Header />
	       <QAndAGrid />
	       <Pricing />
	       <FreeResources />
	     </div>
	   </Shell>
	 </div>
       </>)

export default Tinycanva
