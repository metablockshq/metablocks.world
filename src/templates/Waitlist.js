import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import config from "../config";
import Shell from "../components/Shell";
import SignupDialog, { FAQS, signupFAQs } from "../components/SignupDialog";

import characterWaving from "../images/genft/character-waving.png";

const { discordInviteLink, twitterLink } = config;

const linkClassName = "blue underline pointer";

const Waitlist = () => {
  return (
    <Shell>
      <div className="ph0 ph3-m ph4-l pv4 pv6-ns w-90 w-90-m w-60-l center">
        <SignupDialog showTitle={true} />
        <FAQS faqItems={signupFAQs} />
      </div>
    </Shell>
  );
};

export default Waitlist;
