import React, {useState} from "react"
import useAxios from "axios-hooks"
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import config from "../config"

import launch from "../images/genft/launch.png"

const {discordInviteLink, twitterLink} = config

const signupFAQs = [{
  title: "How to get an item from the second drop?",
  body: <p>The second drop is reserved for community members who participate in the
	Meta Blocks launch event on <strong>Twitter</strong>. Follow us <a className="blue b" target="_blank" href={twitterLink}>@MetaBlockshHQ</a> to stay in the loop.</p>
}, {
  title: "How to get an item from the first drop?",
  body: <p>The first drop will be sent to community members who vote for us at the Ignite Hackathon. Getting a project like this started entails a lot of work and enthusiasm. Sending the first drop to our first voters is our way of saying thank you. Join <a className="blue b" target="_blank" href={discordInviteLink}>our Discord</a> to get a ping when voting starts.</p>
}, {
  title: "Can I get all three drops ?",
  body: <p>Yes! There is no restriction about that. Just add your email, follow us on Twitter and join our Discord to get notified about the drops.</p>
}, {
  title: "What chain are Meta Blocks stored on?",
  body: <p>Currently, Meta Blocks and the marketplace runs on the Solana Mainnet. We plan to support all major chains including Ethereum, Cardano, Cosmos and BSC in near future.</p>
}]


const FAQS = ({faqItems}) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleOrSetOpenIndex = (i) => () => {
    if (openIndex === i) {
      setOpenIndex(null)
    } else {
      setOpenIndex(i)
    }
  }

  return (<div className="mt4">
	    {faqItems.map((f, i) =>
	      (<div className="bb b--black-20"
		    key={`signup-faq-${i}`}
	       >
		 <div className="f4 pointer pv3"
		      onClick={toggleOrSetOpenIndex(i)}
		 >
		   <span className="mr3 black-50">{openIndex === i ? "▼" : "▶"}</span>
		   {f.title}
		 </div>
		 {openIndex === i &&
		  <div className="lh-copy">{f.body}</div>}
	       </div>
	      ))}
	  </div>)
}

const SignupDialog = ({open, onDismiss}) => {

  const [email, setEmail] = useState("")

  const [{data, loading}, execute] = useAxios({
    url: "https://ennso0fjk7rokdz.m.pipedream.net",
    method: "POST"
  }, {
    manual: true
  })

  const saveEmail = () => {
    if (email.length > 6) {
      execute({
	data: {
	  email: email,
	  createdAt: new Date().toISOString()
	}
      })
    }
  }

  return (<SlidingPane isOpen={open} onRequestClose={onDismiss}
		       from="bottom" title={"hi"} width="100%"
		       shouldCloseOnEsc={true} overlayClassName="z-2"
		       hideHeader={true} className="sheet-border">
	    <div className="ph0 ph3-m ph4-l pv4">
	      <div className="pointer f6 black-80 fr dn dn-m dib-l" onClick={onDismiss}>⤬ close</div>
	      <img src={launch} alt="Rocket launching" className="h3 h3-m h4-l mt3 mt3-m mt0-l ml2 fl" style={{}} />
	      <h2 className="tc mv2 f4 f3-ns">We are not quite ready yet !</h2>
	      <div className="tc mt3 black-60">Check the devnet demo at: <a className="blue underline pointer" href="https://app.metablocks.world" target="_blank">app.metablocks.world</a> or signup for a free drop</div>
	      <div className="lh-copy f4 tc black-80 dn">But we can contact you as soon as base layers are ready to mint.</div>


	      <div className="pv4 pv5-ns ph3 br2 mt4 tc" style={{backgroundColor: "#FFE9FB"}}>
		<form onSubmit={e => e.preventDefault()}>
		  <label htmlFor="email" className="db f4 f4-m f3-l">Enter your email to receive a free item from the <strong>third drop</strong></label>
		  <input id="email" placeholder="ex: john@icloud.com" minLength={6}
			 type="email" value={email} onChange={e => setEmail(e.target.value)} required={true}
			 className="w-90 w-40-m w-30-l db dib-ns input-reset center hover-bg-black hover-white mv3 pa2 ba b--black-20 br-pill mr0 mr2-ns"
		  />

		  <input className="w-auto link br-pill ph3 pv2 mb2 dib white bg-light-red b ba b--white"
			 onClick={saveEmail} type="submit" disabled={loading}
			 value={loading ? "..." : "Signup"}
		  />
		</form>
		{data && data.success && <div className="">Email saved successfully, thanks!</div>}
	      </div>



	      <FAQS faqItems={signupFAQs} />

	    </div>
	  </SlidingPane>)
}

export default SignupDialog
