import React from "react"

// https://kevinsimper.medium.com/full-width-youtube-embed-with-react-js-responsive-embed-509de7e7c3bf
const YoutubeEmbed = ({youtubeId, containerClass}) =>
  (<div
     className={containerClass}
     style={{position: "relative",
             paddingBottom: "56.25%" /* 16:9 */,
             paddingTop: 25,
             height: 0}}
   >
     <iframe
       style={{
         position: "absolute",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%"
       }}
       src={`https://www.youtube.com/embed/${youtubeId}`}
       frameBorder="0"
     />
   </div>)

export default YoutubeEmbed
