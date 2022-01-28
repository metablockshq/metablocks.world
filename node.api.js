import { promises as fs } from "fs";

import R from "ramda";
import { Feed } from "feed";

const feedFactory = () =>
  new Feed({
    title: "Meta Blocks - Blog Feed",
    description:
      "Meta Blocks is an NFT Evolution Protocol that lets you build up your NFTs, buy accessories that you like and trade them on secondary marketplaces.",
    id: "https://metablocks.world",
    link: "https://metablocks.world",
    language: "en",
    favicon: "https://metablocks.world/favicon.ico",
    copyright: "All rights reserved 2021, Meta Blocks",
    generator: "https://github.com/jpmonette/feed",
  });

const addPostToFeed = (feed) => (post) =>
  feed.addItem({
    title: post.data.title,
    id: `https://metablocks.world/blog/${post.data.slug}`,
    link: `https://metablocks.world/blog/${post.data.slug}`,
    description: post.data.subTitle || "",
    content: post.data.contents,
    date: post.data.publishedOn,
    image: `https://metablocks.world${post.data.heroImg}`,
    author: {
      name: post.data.author.name,
      link: `https://metablocks.world/authors/${post.data.author.slug}`,
    },
  });

const writeFeeds = async (distPath, feed) => {
  await fs.writeFile(distPath + "/rss.xml", feed.rss2());
  await fs.writeFile(distPath + "/feed.json", feed.json1());
};

const pluginOptions = () => ({
  afterBundle: async (state) => {
    const routes = state.routes;
    const blogPosts = R.filter((r) => R.startsWith("blog/", r.path), routes);
    const feed = feedFactory();
    const addPostToFeedFn = addPostToFeed(feed);
    R.forEach(addPostToFeedFn, blogPosts);

    const distPath = state.config.paths.DIST;
    await writeFeeds(distPath, feed);
    console.log("Feed files generated.");
    return state;
  },
});

export default pluginOptions;
