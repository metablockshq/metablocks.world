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

const ArticleStructuredData = ({title, subTitle, heroImg, publishedOn, url, authorName, tags}) =>
      (<Head>
	 <script type="application/ld+json">
	   {JSON.stringify({
	     "@context": "https://schema.org",
             "@type": "TechArticle",
	     "headline": title,
	     "image": "https://krimlabs.com"+heroImg,
             "author": authorName,
             "keywords": tags,
             "publisher": "Krim Labs",
             "url": url,
 	     "datePublished": publishedOn,
             "description": subTitle || "",
           })}
	 </script>
       </Head>)

export default SEO
export {ArticleStructuredData}
