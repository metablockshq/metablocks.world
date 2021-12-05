import React, { useState } from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";
import marked from "marked";

import { TokenomicsNav } from "../components/Nav";
import Shell from "../components/Shell";
import SEO from "../components/SEO";
import Markdown from "../components/Markdown";
import colors from "../utils/colors";

const introMd = `
  Meta Blocks is an NFT Evolution Protocol that lets you build up your NFTs, buy
  accessories that you like and trade them on secondary marketplaces.


  Meta Blocks creates customizable NFTs that will act as the basis and bridge between all the multiverses in a metaverse and be your virtual identity on web2.


  We’re looking for a contract based branding and website designer to establish the design language of our product.
`;

const whyUsMd = `
Most careers page start with a list of perks and pictures of team members playing football on a beach. We are not there yet. This means that you will have to face hurdles and challenges that you might not face at a big company. This also means you will get a chance to shape our company up you see fit. It's like the famous [Marshmallow Experiment](https://www.apa.org/monitor/2014/12/marshmallow-test#:~:text=In%20a%20series%20of%20studies,who%20were%20more%20likely%20to). We are looking for people who are attracted to chaos and are capable of fighting it to create order.`;

const whatAreWeLikeMd = `
We are hackers and try to hack all systems - marketing, human resources, product, sales and people ops. This makes us huge fans of cryptocurrencies, because crypto hacks state sovereignty. If you like pushing upto the edge, you will like working with us.

We are amazed by and rely on the open source community and do our best to payback in the form of blog posts, tutorials, libraries, and even full-fledged software. Working here would give you access to many brilliant developers and product minds.

We are deeply inspired by the principles of [The Lean Startup](https://www.amazon.in/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898), [Slow Growth](https://www.inc.com/laura-montini/jason-fried-slow-growth-is-the-healthiest-growth.html) and [Rework](https://basecamp.com/books/rework). Most of our communications (like [investor updates](/blog/whats-up-block-november-20-to-26-2021), [protocol design](/blog/clay-bricks-vs-legos/) and [product vision](/blog/lets-start-with-blocks)) are open.`;

const perksMd = `
* A generous library and book budget. Read all you want to. We'd even buy you a Kindle if you prefer portability
* Competitive salary and stock in the form of Meta Blocks tokens
* Informal work environment with minimal hierarchy
* Chance to be a founding member of a crypto project, option to get paid on crypto tokens
* Anything else? Just ask. We might say no, but you have a no already if you don't ask`;

const Job = ({ job }) => {
  return (
    <Link to={`/jobs/${job.slug}`}>
      <div className="ba pa3 br3 b--black-10 mb3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="f3 mr2">{job.emoji}</span>
          {job.title}
        </div>
        <div className="bg-black white br2 f6 pa1">
          {job.isFullTime ? "Full Time" : "Contract"}
        </div>
      </div>
    </Link>
  );
};

const Careers = () => {
  const { jobs } = useRouteData();

  return (
    <React.Fragment>
      <SEO title={`Meta Blocks / Careers`} />
      <Shell>
        <h1 className="center w-90 w-80-m w-50-l">Careers</h1>
        <Markdown contents={marked.parse(whyUsMd)} />

        <div className="mv5 center w-90 w-80-m w-50-l">
          <h2>Open Positions</h2>
          {jobs.map((j) => (
            <Job key={j.slug} job={j} />
          ))}
        </div>

        <h2 className="center w-90 w-80-m w-50-l">What are we like?</h2>
        <Markdown contents={marked.parse(whatAreWeLikeMd)} />

        <h2 className="center w-90 w-80-m w-50-l">Perks and benefits</h2>
        <Markdown contents={marked.parse(perksMd)} />
      </Shell>
    </React.Fragment>
  );
};

export default Careers;
export { introMd, perksMd, whyUsMd, whatAreWeLikeMd };
