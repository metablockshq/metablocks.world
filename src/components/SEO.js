import React from "react"
import {Head} from "react-static"

const SEO = ({title, subTitle, tags, type, publishedOn,
	      authorName, canonicalUrl, heroImg}) =>
      (<Head>
	 {/*SEO*/}
	 {title && <title>{title}</title>}
	 {tags && <meta name="keywords" content={tags} />}
	 <meta name="robots" content="index, follow" />
	 {subTitle && <meta name="description" content={subTitle} />}

	 <meta property="og:title" content={title} />
	 {subTitle && <meta name="og:description" content={subTitle} />}
	 {type && <meta property="og:type" content={type} />}

	 {publishedOn && <meta property="article:published_time" content={publishedOn} />}
	 {authorName && <meta property="article:author" content={authorName} />}
	 {tags && <meta property="article:tag" content={tags} />}

	 {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
	 {heroImg && heroImg.indexOf('https://') === -1 &&
	  <meta property="og:image" content={`https://krimlabs.com${heroImg}`} />}
       </Head>)


export default SEO
