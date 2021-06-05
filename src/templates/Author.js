import React from 'react';
import {useRouteData} from 'react-static';
import convert from 'htmr';

import Shell from '../components/Shell';
import SEO from '../components/SEO';
import Markdown from '../components/Markdown';
import colors from '../utils/colors';

const Li = ({href, title}) => <li><a className="blue" href={href}>{title}</a></li>

const SocialLinks = ({twitter, youtube, github, medium}) => {
  return (<ul>
	    {twitter && <Li title={"Twitter"} href={`https://twitter.com/${twitter}`}/>}
	    {github && <Li title={"Github"} href={`https://github.com/${github}`}/>}
	    {youtube && <Li title={"YouTube"} href={youtube} />}
	    {medium && <Li title={"Medium"} href={`https://${medium}.medium.com`}/>}
	  </ul>)
}

const Author = () => {
  const {contents, name, profilePicture, shortBio,
	 twitter, github, youtube, medium} = useRouteData();

  return (<React.Fragment>
	    <SEO title={`Krim / ${name}`} />
	    <Shell>
	      <div className="w-90 w-70-m w-50-l center flex items-center">
		<div>
		  <img src={profilePicture} alt={name} className="br-100" />
		</div>
		<div className="pl3">
		  <div className="f1 b">
		    {name}
		  </div>
		  <SocialLinks twitter={twitter} github={github}
			       medium={medium} youtube={youtube}
		  />
		</div>
	      </div>
	      <div className="mt2">
		<Markdown contents={contents} />
	      </div>
	    </Shell>
	  </React.Fragment>);
};

export default Author;
