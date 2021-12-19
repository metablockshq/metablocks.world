import React, { useState } from "react";
import useAxios from "axios-hooks";

import config from "../config";

import launch from "../images/genft/launch.png";

import "./signupDialog.css";

const { discordInviteLink, twitterLink, gleamLink, campaignEndpoint } = config;

const signupFAQs = [
  {
    title: "How to get an item from the second drop?",
    body: (
      <p>
        The second drop is reserved for community members who participate in the
        Meta Blocks launch event on <strong>Twitter</strong>. Follow us{" "}
        <a className="blue b" target="_blank" href={twitterLink}>
          @MetaBlockshHQ
        </a>{" "}
        to stay in the loop.
      </p>
    ),
  },
  {
    title: "How to get an item from the first drop?",
    body: (
      <p>
        First drop claims are over! But you can still signup for receiving an
        item from the third drop by entering your email.
      </p>
    ),
  },
  {
    title: "Can I get all three drops ?",
    body: (
      <p>
        Yes! There is no restriction about that. Just add your email, follow us
        on Twitter and join our Discord to get notified about the drops.
      </p>
    ),
  },
  {
    title: "What chain are Meta Blocks stored on?",
    body: (
      <p>
        Currently, Meta Blocks and the marketplace runs on the Solana Mainnet.
        We plan to support all major chains including Ethereum, Cardano, Cosmos
        and BSC in near future.
      </p>
    ),
  },
];

const FAQS = ({ faqItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOrSetOpenIndex = (i) => () => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      setOpenIndex(i);
    }
  };

  return (
    <div className="mt4">
      {faqItems.map((f, i) => (
        <div className="bb b--black-20" key={`signup-faq-${i}`}>
          <div className="f4 pointer pv3" onClick={toggleOrSetOpenIndex(i)}>
            <span className="mr3 black-50">{openIndex === i ? "▼" : "▶"}</span>
            {f.title}
          </div>
          {openIndex === i && <div className="lh-copy">{f.body}</div>}
        </div>
      ))}
    </div>
  );
};

const SignupDialog = ({ title, subTitle, campaignId, bgColor, emailLabel }) => {
  const [email, setEmail] = useState("");

  const [{ data, loading, error, response }, execute] = useAxios(
    {
      url: campaignEndpoint,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const saveEmail = () => {
    if (email.length > 6) {
      execute({
        data: {
          email,
          campaignId: campaignId || false,
        },
      });
    }
  };

  return (
    <>
      <img
        src={launch}
        alt="Rocket launching"
        className="h3 h3-m h4-l mt3 mt3-m mt0-l ml2 fl"
        style={{ marginTop: title ? 0 : -20 }}
      />
      {title && <h2 className="tc mv2 f4 f3-ns">{title}</h2>}
      {subTitle && <div className="lh-copy f4 tc black-80">{subTitle}</div>}

      <div
        className="pv4 pv5-ns ph3 br2 mt4 tc"
        style={{ backgroundColor: bgColor || "#FFE9FB" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          {emailLabel && (
            <label htmlFor="email" className="db f4 f4-m f3-l">
              {emailLabel}
            </label>
          )}
          <input
            id="email"
            placeholder="ex: john@icloud.com"
            minLength={6}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            className="w-90 w-40-m w-30-l db dib-ns input-reset center hover-bg-black hover-white mv3 pa2 ba b--black-20 br-pill mr0 mr2-ns"
          />

          <button
            className="w-auto link br-pill ph3 pv2 mb2 dib white bg-light-red b ba b--white"
            onClick={saveEmail}
            type="submit"
            disabled={loading}
          >
            {loading ? <div className="blink">...</div> : "Submit"}
          </button>
        </form>
        {data && data.msg && !error && (
          <div className="">Email saved successfully, thanks!</div>
        )}
        {error && error.response && (
          <div className="">Error: {error.response.data.msg}</div>
        )}
      </div>
    </>
  );
};

export default SignupDialog;
export { FAQS, signupFAQs };
