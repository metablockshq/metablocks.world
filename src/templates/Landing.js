import React from "react"
import {Head, useRouteData} from "react-static"
import {Link} from "react-router-dom"

import Shell from "../components/Shell"
import Pinboard from "../components/Pinboard"
import EmojiHeading from "../components/EmojiHeading"
import PostCard from "../components/PostCard"
import colors from "utils/colors"

import blackHeart from "../images/emoji/black-heart.png";
import loop from "../images/emoji/loop.png";
import books from "../images/emoji/books.png";
import writingHand from "../images/emoji/writing-hand.png";
import hangLoose from "../images/emoji/hang-loose.png";
import speechBubble from "../images/speech-bubble.svg";
import clojureLogo from "../images/clojure-logo.svg";
import ethLogo from "../images/ethereum.svg";
import batShield from "../images/bat-shield.png";
import jarvis from "../images/jarvis.png";
import rightArrowDoodle from "../images/icons/right-arrow-doodle.png";
import hatMan from "../images/hat-man.svg";

const Block = ({backgroundColor, heading, headingColor, headingEmoji, children, childrenContainerClass}) => {
  return (<section style={{backgroundColor,
			   borderRadius: 16}}
		   className="lh-copy tc w-90 w-80-m w-60-ns center pv4 mt4">
	    <EmojiHeading title={heading}
			  color={headingColor}
			  emoji={headingEmoji}
	    />
	    <div className={`w-70 center f4 ${childrenContainerClass}`}>
	      {children}
	    </div>
	  </section>)
}

const ThankYouInternet = ({post}) =>
      (<Block heading={"Thank you internet"}
	      headingEmoji={blackHeart}
	      backgroundColor="#FFE6E6">
	 <p>
	   The world is full of good people who freely share their knowledge and know how.
	 </p>
	 <p>
	   We are grateful to the open-source movement that taught us how to build systems at scale. And we are grateful to countless invisible individuals who published their work in the form of docs, articles, videos and tutorials for us to learn. Krim is our way to give back. <span className="b">Krim is how we close the loop</span>.
	 </p>
	 <div className="w-100 w-90-m w-80-l center nb5 mt3 mt5-l">
	   <PostCard post={post} leftTopTitle="Latest Post" stacked={true}/>
	 </div>
       </Block>)

// TODO: uncomment these when there are posts on the topic
const techWeLove = [{
  icon: clojureLogo,
  label: "Clojure"
}, {
  icon: ethLogo,
  label: "Blockchain"
}, /*{
  icon: batShield,
  label: "Privacy"
}, {
  icon: jarvis,
  label: "UX"
}*/]

const TechCard = ({icon, label, href}) =>
      (<Link to={`/blog?tag=${label.toLowerCase()}`} className="db w-100 w-100-m w-30-l">
	 <div className="black-80 bg-white br4 pa3 f5 b mt3 mh2"
	      style={{minWidth: 100,
		      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)"}}>
	   <img src={icon} className="h2" />
	   <div>{label}</div>
	 </div>
       </Link>)

const ClosingTheLoop = () =>
      (<Block heading={"Closing the loop"}
	      headingEmoji={loop}
	      backgroundColor="#FFF6E6">
	 <p>
	   Krim Labs was founded by Shivek Khurana in the year 2017. Initially a consultancy that spun-off from a failed startup, Krim has evolved into publication about building software and software companies. We publish our tutorials, opinions and articles about old and new tech and it’s moral implications. <span className="b">It's our way of giving back to the community</span>.
	 </p>
	 <p>
	   Over 1200 people follow Krim Labs and its author Shivek Khurana on various social platforms and email lists. Our research and publications have reached over 1 million readers over the past 4 years. We care the most about:
	 </p>
	 <div className="flex justify-center flex-wrap mt4 center">
	   {techWeLove.map(t => <TechCard key={t.label} {...t} />)}
	 </div>
       </Block>)

const TextWithRightArrowDoodle = ({text}) =>
      (<div className="flex justify-center items-center">
	 {text}
	 <img src={rightArrowDoodle} className="h2 pl3"/>
       </div>)

const RecentPosts = ({posts, tags}) =>
      (<Block heading={"Recent Posts"}
	      headingEmoji={writingHand}
	      backgroundColor="#FFEEE6"
       >
	 <div className="flex flex-wrap justify-between black-60 nt3 mb5 f6 f6-m f4-l">
	   {tags.map(t => <Link key={t} to={`/blog?tag=${t}`} className="underline dib">#{t}</Link>)}
	 </div>
	 <div className="w-100 w-80-m w70-l center">
	   {posts.map((p, i) =>
	     <PostCard key={p.data.slug} containerClass="mt4" post={p} />)}
	 </div>
	 <Link to="/blog" className="f3 b underline dib mt5 mb3">
	   <TextWithRightArrowDoodle text="View all posts" />
	 </Link>
       </Block>)

const HatManSpeaks = ({text}) =>
      (<div className="flex justify-center">
	 <img src={hatMan} alt="Man wearing a hat" className="mt4" />
	 <div className="bg-left white pv5 ph4 w-80 w-60-m w-20-l"
	      style={{backgroundImage: `url(${speechBubble})`,
		      transform: "rotate(-2deg)"}}
	 >
	   {text}
	 </div>
       </div>)

const LearnMoreButton = () =>
      (<Link to="/tinycanva" className="bg-white black f3 b br2 pv2 ph3 link mt5 dib"
	     style={{boxShadow: "0 0 4px 2px rgba(255, 255, 255, 0.4)"}}
       >
	 Learn more
       </Link>)

const ClojureCourse = () =>
      (<Block heading={"Clojure Course"}
	      headingEmoji={books}
	      headingColor="#FFFFFF"
	      childrenContainerClass="white"
	      backgroundColor="#1B1B1B">
	 <p>
	   Clojure is a functional hosted LISP known for its expressiveness. But since it’s not widely used, documented or advocated for, we decided to make a course about it. <span className="b">This course is a distilled form of our Clojure journey over the years.</span>
	 </p>
	 <p>
	   Focused at React.js developers, this course starts from setting up the editor and walks through building a Canva like graphics editor. Complete with authentication, state management, routing and API integration, for <span className="b">$49</span> only.
	 </p>
	 <LearnMoreButton />
	 <Link to="/blog" className="f5 underline db mt3">
	   <TextWithRightArrowDoodle text="or try the first module for free" />
	 </Link>
       </Block>)


const Form = () =>
      (<form className="measure center tl">
	 <div className="w-100 w-80-m w-60-l mt5 bn center">
	   <div className="mt3">
             <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
             <input className="b pa2 input-reset ba bg-white br2 hover-bg-black hover-white w-100"
		    type="text" id="firstName" />
	   </div>
	   <div className="mt3">
             <label className="db fw6 lh-copy f6" htmlFor="emailAddress">Email</label>
             <input className="pa2 input-reset ba bg-white br2 hover-bg-black hover-white w-100"
		    type="email" id="emailAddress" />
	   </div>
	 </div>
	 <div className="tc">
	   <button className="bg-black white f4 b br2 mt4 pv2 ph3 shadow-1 bn">
	     Send me your articles
	   </button>
	 </div>
	 <Link to="/blog" className="f5 underline db mt2">
	   <TextWithRightArrowDoodle text="learn how we manage your data" />
	 </Link>
       </form>)

const Subscribe = () =>
      (<Block heading={"Subscribe"}
	      headingEmoji={hangLoose}
	      backgroundColor="#FFE9FB">
	 <p>
	   Join 346 other readers to get latest articles about Clojure, Crypto, privacy and UX delivered straight to your inbox. Free forever. <span className="b">Unsubscribe anytime</span>.
	 </p>
	 <Form />
       </Block>)

const Letter = ({className}) => {
  return (<div>
	    <div className={`center w-90 w-70-m w-40-l f5 f4-ns lh-copy pr0 pr0-m pr4-l georgia flex justify-between ${className}`}
		 style={{flex:1}}>
	      <div className="w-20 mt2">
      		<img src="/img/brown-boy.svg" alt="Illustration of a brown boy" className="bb pl3 b--white-20"/>
      	      </div>
      	      <div className="w-70">
      		<p className="b sans-serif o-100">Hi Stranger !</p>
      		<p>My name is Shivek Khurana and <span className="i">Krim Labs is a canopy for my consultancy, products and ideas</span>.</p>
		<Pinboard content={"The site is being upgraded. Everything should work fine but the styling might be off."} />
 	      </div>
	    </div>
	  </div>);
}

const SEO = () => {
  return (<Head>
	    <title>Krim Labs</title>
	    <meta name="keywords" content="shivek khurana, krim labs, clojure, india, new delhi, javascript, react, shivek, krim" />
	    <meta name="robots" content="index, follow" />
	    <meta name="description" content="A canopy for my consultancy, products and ideas." />
	    <meta property="og:url" content="https://krimlabs.com" />
	    <meta property="og:description" content="A canopy for my consultancy, products and ideas." />
	    <meta property="og:title" content="Krim Labs" />
	    <meta property="og:type" content="website" />
	    <meta property="og:image" content={`https://krimlabs.com/img/og.png`} />
	  </Head>);
}

const Landing = () => {
  const {recentPosts, tags} = useRouteData();
  return (<Shell>
   	    <SEO />
	    <ThankYouInternet post={recentPosts[0]} />
	    <div className="mt5">
	      <ClosingTheLoop />
	    </div>
	    <RecentPosts posts={recentPosts}
			 tags={tags}
	    />
	    {/* Uncomment this when Clojure page and sub is ready
	    <HatManSpeaks text={"We love Clojure so much that we made a course about it !!!"} />
	    <ClojureCourse />
	    <Subscribe />
	     */}
   	  </Shell>);
};

export default Landing;
