import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import config from "../config";
import Shell from "../components/Shell";
import Markdown from "../components/Markdown";
import SignupDialog, { FAQS, signupFAQs } from "../components/SignupDialog";

import characterWaving from "../images/genft/character-waving.png";

const { discordInviteLink, twitterLink } = config;

const linkClassName = "blue underline pointer";

const Waitlist = () => {
  const { title, subTitle, contents, emailInputTitle, emailBgColor, slug } =
    useRouteData();

  return (
    <Shell>
      <div className="ph0 ph3-m ph4-l pv4 pv6-ns w-90 w-90-m w-60-l center">
        <SignupDialog
          title={title}
          subTitle={subTitle}
          campaignId={slug}
          emailLabel={emailInputTitle}
          bgColor={emailBgColor}
        />

        <div className="mt6">
          <Markdown contents={contents} />
        </div>
      </div>
    </Shell>
  );
};

export default Waitlist;
