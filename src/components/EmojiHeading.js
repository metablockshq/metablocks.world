import React from "react"

const EmojiHeading = ({title, color, emoji}) =>
      (<div className="flex justify-center items-center">
	 <h1 className="f3 f3-m f1-l georgia" style={{color}}>{title}</h1>
	 <img src={emoji} loading="lazy" className="h2 h3-l pl1 pl3-l" />
       </div>)

export default EmojiHeading
