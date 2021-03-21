const jdown = require("jdown")
const R = require("ramda")

const {contentDir, isPublished, relatedSlugs, relatedPosts,
       injectRelatedPosts, postsToPostPages} = require("./static.config")

// state to load content to
let content;

beforeAll(async () => {
  // kinda assumes that contentDir is correct before testing it
  content = await jdown(contentDir)
})

test("contentDir is `./content`", () => {
  expect(contentDir).toBe("./content")
})

describe("isPublished()", () => {
  it("returns false if `publishedOn` is not presentl", () => {
    expect(isPublished({})).toBeFalsy()
  })

  it("returns false if `publishedOn` is present but null", () => {
    expect(isPublished({publishedOn: null})).toBeFalsy()
  })

  it("returns true if `publishedOn` is not null", () => {
    expect(isPublished({publishedOn: "2020-10-10"})).toBeTruthy()
  })
})

describe("relatedSlugs()", () => {
  it("returns empty array if `relatedSlugs` are not present", () => {
    expect(relatedSlugs({})).toEqual([])
  })

  it("returns og array if `relatedSlugs` are present", () => {
    expect(relatedSlugs({
      rawData: {
	relatedSlugs: ["s1", "s2"]
      }
    })).toEqual(["s1", "s2"])
  })
})

describe("relatedPosts()", () => {
  const posts = [{
    slug: 1,
    rawData: {
      relatedSlugs:[2]
    }
  }, {
    slug: 2
  }, {
    slug: 3,
    rawData: {
      relatedSlugs: [1, 2]
    }
  }]

  it("returns empty array if no related slugs exist", () => {
    const post = posts[1]
    const related = relatedPosts(posts, post)

    expect(related).toEqual([])
  })


  it("returns related posts if related slugs exist", () => {
    const post = posts[0]
    const related = relatedPosts(posts, post)

    expect(related).toBeInstanceOf(Array)
    expect(related).toHaveLength(1)
    expect(related[0]).toHaveProperty("slug", 2)
  })
})

describe("injectRelatedPosts()", () => {
  const posts = [{
    slug: 1,
    rawData: {
      relatedSlugs:[2]
    }
  }, {
    slug: 2
  }]

  const injectFn = injectRelatedPosts(posts)

  it("injects empty array of no related slugs exist", () => {
    const post = posts[1]
    const injected = injectFn(post)

    expect(injected.rawData.relatedPosts).toEqual([])
  })

  it("injects related array of related slugs exist", () => {
    const post = posts[0]
    const injected = injectFn(post)

    expect(injected.rawData.relatedPosts).toBeInstanceOf(Array)
    expect(injected.rawData.relatedPosts).toHaveLength(1)
    expect(injected.rawData.relatedPosts[0]).toHaveProperty("slug", 2)
  })

  it("maintains exisiting rawData post injection", () => {
    const post = posts[0]
    const injected = injectFn(post)

    expect(injected.rawData.relatedSlugs).toEqual([2])
  })

})

describe("jdown()", () => {
  it("has posts", () => {
    expect(content).toHaveProperty("posts")
  })

  it("loads known posts", () => {
    expect(content.posts).toHaveProperty("14LifeLessonsLearntAfter1YearOfGraduation")
    expect(content.posts).toHaveProperty("5InternetPeopleIFollow")
    expect(content.posts).toHaveProperty("clojure424Days")
  })

  it("loads post metadata", () => {
    const clojure424 = content.posts["clojure424Days"]
    const expectedKeys = [
      'title',       'subTitle',
      'slug',        'canonicalUrl',
      'publishedOn', 'heroImg',
      'tags',        'relatedSlugs',
      'author',      'contents'
    ]

    R.forEach((k) => {
      expect(clojure424).toHaveProperty(k)
    }, expectedKeys)
  })

  test("relatedSlugs and tags are arrays", () => {
    const clojure424 = content.posts["clojure424Days"]

    expect(clojure424.tags).toBeInstanceOf(Array)
    expect(clojure424.relatedSlugs).toBeInstanceOf(Array)
  })


  it("has tags", () => {
    expect(content).toHaveProperty("tags")
  })

  it("has authors", () => {
    expect(content).toHaveProperty("authors")
  })

  it("loads author metadata", () => {
    const me = content.authors["shivekKhurana"]
    const requiredKeys = ['slug', 'name', 'profilePicture', 'shortBio', 'contents']

    R.forEach((k) => {
      expect(me).toHaveProperty(k)
    }, requiredKeys)
  })
})


describe("postsToPostPages()", () => {
  const postPages = postsToPostPages([
    {slug: "test-slug", flag: "x"}
  ]);

  it("returns RS meta data", () => {
    const first = postPages[0]
    expect(first).toHaveProperty("path", "/blog/test-slug")
    expect(first).toHaveProperty("template", "src/templates/blog/Post")
    expect(first).toHaveProperty("rawData")
    expect(first.rawData).toHaveProperty("flag", "x")
  })
})
