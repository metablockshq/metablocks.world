import React from 'react';
import {Head} from 'react-static';

import LayeredContainer from '../components/LayeredContainer';
import people from '../images/people.svg';

const Landing = () => {
  return (<LayeredContainer>
    <Head>
      <title>Krim Labs</title>
    </Head>
    <div className="w-90 w-80-m w-30-l flex flex-column center justify-center items-center white">
      <div className="mt4 mt5-ns bb b--white-10">
        <img src={people} alt="People sitting around a table" />
      </div>
      <div className="mt4 mt5-ns f5 f4-ns">
        <p>Krim is a New Delhi based software company.</p>
        <p>We build delightful interfaces and solve real world problems using Clojure and JavaScript.</p>
      </div>
      <code className="f6 ph3 pv2 mt4 mono bg-black-40 br2">git commit -am "Ship MVP website"</code>
    </div>
  </LayeredContainer>);
};

export default Landing;