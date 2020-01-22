import React from 'react';

import plant from '../images/plant.png';

const Follow = () => {
  return (<div className="mv5">
    <div className="ba br2 bw2 b--white flex pt0 pt1-m pt3-l pl2 pl3-ns">
      <div className="flex items-end nb2">
        <img src={plant} />
      </div>
      <div className="pa3 f4 f3-ns">
        If you liked this post and want to stay updated, follow me on <a href="https://twitter.com/shivek_khurana">Twitter</a> or <a href="https://github.com/shivekkhurana">Github</a>  
      </div>    
    </div>
    <div className="mt2 f7 o-30">
      Plant image illustration designed by <a href="http://www.freepik.com">rawpixel.com at Freepik</a>
    </div>
  </div>);
}

export default Follow;