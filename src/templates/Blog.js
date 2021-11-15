import React from "react";
import { useRouteData } from "react-static";
import { useLocation, Link } from "react-router-dom";

import Shell from "../components/Shell";
import SEO from "../components/SEO";
import PostCard from "../components/PostCard";
import EmojiHeading from "../components/EmojiHeading";
import str from "../utils/string";

import writingHand from "../images/emoji/writing-hand.png";

const YearPosts = ({ year, posts, tag }) => {
  const filteredPosts = tag
    ? posts.filter((p) => p.data.tags.includes(tag))
    : posts;

  return (
    filteredPosts.length > 0 && (
      <div className="">
        {year != new Date().getFullYear() && (
          <h2 className="f3 f3-m f2-l georgia tc">{year}</h2>
        )}
        <div className="mb5 mb6-ns">
          {filteredPosts.map((p) => (
            <PostCard key={p.data.slug} post={p} containerClass="mb4" />
          ))}
        </div>
      </div>
    )
  );
};

const Blog = () => {
  const { allPosts, allPostsByYear, tags } = useRouteData();
  const { search, pathname } = useLocation();
  const { tag } = str.queryStringToObj(search.substring(1));

  const topHeading = tag ? `#${tag}` : "Blog";

  const publishYears = Object.keys(allPostsByYear).reverse();
  return (
    <div>
      <SEO
        title="Meta Blocks / Blog"
        subTitle=""
        tags="nft, web3, avatars, meta verse, solana, ignition, meta blocks, shivek, sarthak, khurana, upgradable nfts"
      />
      <Shell>
        <div className="w-90 center w-90-m w-60-l">
          <EmojiHeading title={topHeading} emoji={writingHand} />
          <div className="flex flex-column flex-row-ns mt4">
            <div className="w-100 w-20-ns tc tl-ns f6 f5-m f4-ns black-60 mb4 mb0-ns">
              <Link
                to="/blog"
                className={`dib db-ns underline ${
                  !tag && pathname === "/blog" && "b black-80"
                }`}
              >
                All posts
              </Link>
              {tags.map((t) => (
                <Link
                  to={`/blog?tag=${t}`}
                  key={t}
                  className={`underline dib pa2 db-ns pa0-ns mv0 mv3-ns ${
                    tag === t && "b black-80"
                  }`}
                >
                  #{t}
                </Link>
              ))}
            </div>
            <div className="w-100 w-80-ns pl0 pl4-ns">
              {publishYears.map((y) => (
                <YearPosts
                  key={y}
                  year={y}
                  tag={tag}
                  posts={allPostsByYear[y]}
                />
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Blog;
