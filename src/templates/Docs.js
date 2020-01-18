import React from 'react';
import {useRouteData, useLocation} from 'react-static';
import {Link, Redirect} from 'react-router-dom';
import convert from 'htmr';
import {capitalCase} from 'change-case';

import Nav from '../components/Nav';
import string from '../utils/string';

const index = {
  'getting-started': ['installation', 'mental-model', 'setup-main', 'setup-renderer'], 
  'usage': ['requests', 'notifiers']
};

const Sidebar = () => {
  const location = useLocation();

  return (<div className="br b--white-20 pt4" style={{height: '90vh'}}>
    {Object.keys(index).map(parentKey => (<div className="mb3" key={parentKey}>
      <div className="mb1 ttu f7 white-50 pl2 pr4">{capitalCase(parentKey)}</div>
      <div>
        {index[parentKey].map(childKey => {
          const pathname = `/docs/${parentKey}/${childKey}`;
          const active = (location && location.pathname === pathname) || (window && window.location.pathname === pathname);
          return (<Link 
            key={childKey} 
            to={pathname}
          >
            <div className={`pointer dim pl2 pr4 pv1 ${active ? "bg-white black" : ""}`}>
              {capitalCase(childKey)}
            </div>
          </Link>);
        })}
      </div>
    </div>))}
  </div>);
};

const Section = ({doc}) => {
  const thisParentKey = Object.keys(index).find(parentKey => index[parentKey].indexOf(doc.slug) > -1);
  const nextParentKey = Object.keys(index)[Object.keys(index).indexOf(thisParentKey) + 1];
  const previousParentKey = Object.keys(index)[Object.keys(index).indexOf(thisParentKey) - 1];

  const nextChildKeyInThisParent = index[thisParentKey][index[thisParentKey].indexOf(doc.slug) + 1];
  const previousChildKeyInThisParent = index[thisParentKey][index[thisParentKey].indexOf(doc.slug) - 1];

  const next = nextChildKeyInThisParent ? 
    {parentKey: thisParentKey, childKey: nextChildKeyInThisParent} :
    nextParentKey ? 
      {parentKey: nextParentKey, childKey: index[nextParentKey][0]} : 
      null
  ;

  // reduceRight gives the last element of array
  // https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array-in-javascript
  const previous = previousChildKeyInThisParent ? 
    {parentKey: thisParentKey, childKey: previousChildKeyInThisParent} :
    previousParentKey ? 
      {parentKey: previousParentKey, childKey: index[previousParentKey].reduceRight(i => i)} : 
      null
  ;

  return (<div className="ph4 flex-auto lh-copy overflow-y-scroll" style={{height: '90vh'}}>
    <div className="w-100 w-90-m w-60-l word-wrap">

      <div>{convert(doc.contents)}</div>

      <div className="flex justify-between mt4">
        {previous && <Link to={`/docs/${previous.parentKey}/${previous.childKey}`}>
          <div className="ba pv2 ph4 br2 pointer dim">
            <div className="f7">Previous</div>
            {capitalCase(previous.childKey)}
          </div>
        </Link>}
        {!previous && <div />}
        {next && <Link to={`/docs/${next.parentKey}/${next.childKey}`}>
          <div className="ba pv2 ph4 br2 pointer dim">
            <div className="f7">Next</div>
            {capitalCase(next.childKey)}
          </div>
        </Link>}
        {!next && <div />}
      </div>
    </div>
  </div>);
};


const Docs = () => {
  const {doc} = useRouteData();
  const location = useLocation();

  if (!location || location && location.pathname === '/docs') {
    return (<Redirect to={"/docs/getting-started/installation"} />)
  }

  return (<div className="flex flex-column bg-black min-vh-100 white">
    <Nav showHome />
    <div className="cf">
      <div className="fl" style={{width: '16%'}}>
        <Sidebar />
      </div>
      <div className="fl" style={{width: `${100-16}%`}}>
        <Section doc={doc} />
      </div>
    </div>
  </div>)
};

export default Docs;