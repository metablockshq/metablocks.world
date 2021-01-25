import React from 'react';

import colors from '../utils/colors';
import Nav from './Nav'

const LayeredContainer = ({level, children}) => {

  return (<div className="vh-100 w-100 flex flex-column bp3-dark" style={{background: colors.DARK_GRAY1}}>
    <Nav />
    {level > 0 && <div className="mh3" style={{
      background: colors.DARK_GRAY2, borderRadius: "16px 16px 0 0",
      height: "16px"
    }}/>}
    <div 
      className="mh2 overflow-y-scroll overflow-x-hidden" 
      id={"layeredContainerScrollDiv"}
      style={{
        background: colors.DARK_GRAY2, borderRadius: "16px 16px 0 0",
        boxShadow: level > 0 && "2px -8px 32px rgba(0, 0, 0, 0.5)",
        display: "flex",
        flex: 2
      }}
    >
      <div className="w-100">{children}</div>
    </div>
  </div>);
};

export default LayeredContainer;