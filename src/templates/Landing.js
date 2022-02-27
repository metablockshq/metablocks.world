import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import { Job } from "./Careers";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";
import img from "../utils/image";
import str from "../utils/string";
import config from "../config";

import wardrobe from "../images/mbk/wardrobe.png";
import cup from "../images/mbk/cup.png";
import bonfire from "../images/mbk/bonfire.png";
import bubbleImg from "../images/mbk/pink-bubble.svg";
import blueBubble from "../images/mbk/blue-bubble.svg";
import shure from "../images/mbk/shure.png";

import rollerImg from "../images/mbk/roller.png";
import magicHat from "../images/mbk/magic-hat.png";
import sdkImg from "../images/mbk/sdk.png";
import snowflake from "../images/mbk/snowflake.png";
import rightPointingHand from "../images/mbk/right-pointing-hand.png";

const { discordInviteLink } = config;
const features = [
  {
    icon: rollerImg,
    title: "Upgrade NFTs",
    subTitle: "Without burning token or modifying metadata",
  },
  {
    icon: magicHat,
    title: "Render upgrades off-chain",
    subTitle: "Process upgrades off-chain and update the NFT on-chain",
  },
  {
    icon: sdkImg,
    title: "Kyraa JS SDK",
    subTitle: "Reduce integration time with our JS  SDK",
  },
  {
    icon: snowflake,
    title: "Decaying NFTs",
    subTitle: "Create NFTs that burn themselves over time",
    comingSoon: true,
  },
];

function ActionLink({ title, href }) {
  const className = "f3 dim b blue";

  return (
    <div className="flex items-center">
      {href.startsWith("https://metablocks.world") ? (
        <Link to={href} className={className}>
          {title} ➔
        </Link>
      ) : (
        <a href={href} target="_blank" className={className}>
          {title} ➔
        </a>
      )}
    </div>
  );
}

const Feature = ({ icon, title, subTitle, comingSoon }) => {
  return (
    <div
      className="flex flex-column justify-between ba b--black-10 br4 pa4 mb5"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.64)",
        backdropFilter: "blur(10px)",
        width: "48%",
      }}
    >
      <div>
        <img
          alt=""
          src={icon}
          className="h4 fr nt5"
          style={{ objectFit: "contain" }}
        />
        <h3 className="mv0 f3">{title}</h3>
        <p className="f4 gray">{subTitle}</p>
      </div>
      <div className="flex items-center b underline pointer">
        Learn more
        <img
          src={rightPointingHand}
          className="ml2"
          style={{ height: "1.4rem" }}
        />
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="w-60 center">
      <div style={{ height: "32rem" }} className="tc mt5">
        <img src={bubbleImg} />
      </div>
      <div
        style={{ marginTop: "-24rem" }}
        className="flex flex-wrap justify-between"
      >
        {features.map((f) => (
          <Feature key={f.title} {...f} />
        ))}
      </div>
    </div>
  );
};

const IconicHeading = ({ title, subTitle, imgSrc, showBorder }) => {
  return (
    <div className={`flex items-center ${showBorder && "bb b--black-20"}`}>
      <div>
        <h4 className="mv0 f2">{title}</h4>
        <p className="mt2 f3 black-60">{subTitle}</p>
      </div>
      <div>
        <img
          src={imgSrc}
          style={{ objectFit: "contain" }}
          className="w-100 h5 nt3 pa3"
        />
      </div>
    </div>
  );
};

const Jobs = ({ jobs }) => {
  return (
    <div className="">
      <div style={{ height: "0rem" }} className="tc mt5">
        <img src={blueBubble} />
      </div>

      <IconicHeading
        title="Work with us"
        subTitle="Let's build the future of NFTs together"
        imgSrc={cup}
      />
      {jobs.map((j) => (
        <Job job={j} />
      ))}
    </div>
  );
};

const JoinDiscord = ({}) => {
  return (
    <div className="mt5">
      <IconicHeading
        title="Community"
        subTitle="Join our Discord to stay connected, get support on the protocol and see what other projects are building on top of Meta Blocks."
        imgSrc={bonfire}
      />
      <ActionLink title={"Join Discord"} href={discordInviteLink} />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-90 w-60-m w-60-l center flex items-center mv6">
      <div className="w-60 center">
        <h1 className="mv0 f1 f-subheadline-m f-subheadline-l">
          Application layer for your NFTs
        </h1>
        <p className="mv3 f3 lh-copy mid-gray">
          Meta Blocks help you build immersive NFT apps. With our open source
          tools, you can build NFTs that can upgrade and decay progmatically.
        </p>
        <ActionLink title="Build on Meta Blocks" href="/docs" />
      </div>
      <div className="flex flex-grow w-40">
        <img
          style={{ height: "24rem", objectFit: "contain" }}
          className="w-100"
          alt="3D shapes filling and transparent cup"
          src={wardrobe}
        />
      </div>
    </div>
  );
};

const AuthorBar = ({ author, publishedOn }) => {
  const optimizedPaths = img.getOptimizedPaths(author.profilePicture);
  return (
    <div className="flex flex-column flex-row-m flex-row-l justify-between items-center mt2 mt3-ns pb2 pt0 pt1-ns f7 f6-l">
      <div className="flex flex-column flex-row-m flex-row-l items-center">
        <img
          src={optimizedPaths.w80}
          className="br-100 mt1 dn dib-ns"
          alt={author.name}
          style={{ height: 28, width: 28 }}
        />
        <span className="pl1 pl2-l mt2 black-60 mt0-m mt0-l">
          {author.name}
        </span>
      </div>
      <div className="black-40">{str.humanReadableDate(publishedOn)}</div>
    </div>
  );
};

const PostCard = ({ post }) => {
  const optimizedPaths = img.getOptimizedPaths(post.data.heroImg);
  return (
    <Link to={`/blog/${post.data.slug}`}>
      <div className="flex justify-between pv3 bb b--black-10 grow">
        <div className="w-20">
          <img src={optimizedPaths.w80} className="br3" />
        </div>
        <div className="w-75">
          <h4 className="f4 mv0 normal lh-copy">{post.data.title}</h4>
          <h5 className="f5 mb0 mt2 lh-copy normal black-60">
            {post.data.subTitle}
          </h5>
          <AuthorBar
            author={post.data.author}
            publishedOn={post.data.publishedOn}
          />
        </div>
      </div>
    </Link>
  );
};

const PostList = ({ posts }) => {
  return (
    <div className="w-40">
      <IconicHeading
        title="Recent Posts"
        subTitle="Our thougts, ideas and updates for the fam"
        imgSrc={shure}
        showBorder={true}
      />
      {posts.map((p) => (
        <PostCard post={p} key={p.data.slug} />
      ))}
    </div>
  );
};

const Landing = () => {
  const { recentPosts, jobs } = useRouteData();
  return (
    <div className="">
      <MainNav jobsCount={jobs.length} />
      <Hero />
      <Features />

      <div className="w-60 center flex justify-between">
        <PostList posts={recentPosts} />
        <div className="w-50 mt6">
          <Jobs jobs={jobs} />
          <JoinDiscord />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
