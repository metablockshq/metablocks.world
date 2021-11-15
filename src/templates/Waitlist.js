import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import config from "../config";
import Shell from "../components/Shell";
import SignupDialog from "../components/SignupDialog";

import characterWaving from "../images/genft/character-waving.png";

const { discordInviteLink, twitterLink } = config;

const linkClassName = "blue underline pointer";

const Waitlist = () => {
  return (
    <Shell>
      <SignupDialog />
    </Shell>
  );
};

export default Waitlist;
