import React from 'react';
import {useRouteData, Head} from 'react-static';
import {useParams, useLocation, Link} from 'react-router-dom';

import Shell from '../components/Shell';
import PostCard from '../components/PostCard';
import EmojiHeading from "../components/EmojiHeading"
import str from '../utils/string';

import writingHand from "../images/emoji/writing-hand.png";

const YearPosts = ({year, posts, tag}) => {
  const filteredPosts = tag ?
	posts.filter(p => p.data.tags.includes(tag)) :
	posts

  return filteredPosts.length > 0 &&
    (<div className="">
       {year != (new Date()).getFullYear() &&
	<h2 className="f3 f3-m f2-l georgia tc">{year}</h2>}
       <div className="mb5 mb6-ns">
	 {filteredPosts.map(p => <PostCard key={p.data.slug} post={p} containerClass="mt4" />)}
       </div>
     </div>)
}

const Blog = () => {
  const {allPosts, allPostsByYear, tags} = useRouteData();
  const {search, pathname} = useLocation()
  const {tag} = str.queryStringToObj(search.substring(1))

  const topHeading = tag ? `#${tag}` : "All posts"

  const publishYears = Object.keys(allPostsByYear).reverse()
  return (<div style={{backgroundColor: "#FFEEE6"}}>
	    <Head>
	      <title>Krim / Blog</title>
	    </Head>
	    <Shell>
	      <div className="w-90 center w-80-m w-60-l">
		<EmojiHeading title={topHeading}
			      emoji={writingHand}
		/>
		<div className="flex flex-column flex-row-ns">
		  <div className="w-100 w-20-ns tc tl-ns">
		    <Link to="/blog" className={`f5 f4-ns underline black-60 ${!tag && pathname === "/blog" && "b black-80"}`}>All posts</Link>
		    {tags.map(t =>
		      (<Link to={`/blog?tag=${t}`}
			     key={t}
			     className={`dib pa2 db-ns pa0-ns underline black-60 mv0 mv3-ns f5 f4-ns ${tag === t && "b black-80"}`}
		       >
			 #{t}
		       </Link>))}
		  </div>
		  <div className="w-100 w-80-ns pl4">
		  {publishYears.map(y =>
		    (<YearPosts key={y}
				year={y}
				tag={tag}
				posts={allPostsByYear[y]} />))}
		  </div>

		</div>
	      </div>
	    </Shell>
	  </div>);
};

export default Blog;
