import {promises as fs} from "fs"

import R from "ramda"
import {Feed} from "feed";

const feedFactory = () => new Feed({
  title: "Krim Labs Blog Feed",
  description: "Articles about Clojure, Blockchain, Ethereum, Privacy, UX and SaaS",
  id: "https://krimlabs.com",
  link: "https://krimlabs.com",
  language: "en",
  favicon: "https://krimlabs.com/favicon.ico",
  copyright: "All rights reserved 2017, Krim Labs",
  generator: "https://github.com/jpmonette/feed"
})


const addPostToFeed = feed => post => feed.addItem({
  title: post.data.title,
  id: `https://krimlabs.com/blog/${post.data.slug}`,
  link: `https://krimlabs.com/blog/${post.data.slug}`,
  description: post.data.subTitle || "",
  content: post.data.contents,
  date: post.data.publishedOn,
  image: `https://krimlabs.com${post.data.heroImg}`,
  author: {
    name: post.data.author.name,
    link: `https://krimlabs.com/authors/${post.data.author.slug}`
  }
})


const writeFeeds = async (distPath, feed) => {
  await fs.writeFile(distPath + '/rss.xml', feed.rss2())
  await fs.writeFile(distPath + '/feed.json', feed.json1())
}

const pluginOptions = () => ({
  afterBundle: async state => {
    const routes = state.routes
    const blogPosts = R.filter(r => R.startsWith("blog/", r.path), routes)
    const feed = feedFactory()
    const addPostToFeedFn = addPostToFeed(feed)
    R.forEach(addPostToFeedFn, blogPosts)

    const distPath = state.config.paths.DIST
    await writeFeeds(distPath, feed)
    console.log("Feed files generated.")
    return state
  },
})

export default pluginOptions
