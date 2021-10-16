import React from "react";
import {Link} from "react-router-dom"

import Footer from "../components/Footer";
import config from "../config"
import Shell from "../components/Shell";

import characterWaving from "../images/genft/character-waving.png"

const {discordInviteLink, twitterLink} = config

const linkClassName = "blue underline pointer"

const ThankYou = () => {
  return (<Shell>
    <div className="w-90 br3 ph3 ph4-m ph6-l pv4 bg-light-green tc center">
      <img src={characterWaving} className="h4" />
      <h1 className="mv0 f1 f1-m f-headline-l"> Thank you</h1>
     
      <div className="f3 f3-m f2-l black-80">
      <p>
	Getting a project like this started entails a lot of work and enthusiasm. Thank you for voting for us. As a token of our gratitude, we'll send you the first drop when it's ready.
      </p>
      <p>
	Until then, come say "hi" on our <a href={twitterLink} className={linkClassName}>Twitter</a> and <a href={discordInviteLink} className={linkClassName}>Discord</a>. Or go to our <Link to="/" className={linkClassName}>home page</Link>.
      </p>
      </div>
    </div>
  </Shell>)
}

export default ThankYou;

