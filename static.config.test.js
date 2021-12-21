const jdown = require("jdown");
const R = require("ramda");

const {
  contentDir,
  isPublished,
  relatedSlugs,
  relatedPosts,
  injectRelatedPosts,
  postsToPostPages,
  rawDataToGetData,
  stripPostContents,
  stripRelatedPostsContent,
  injectRelatedPostAuthors,
  injectAuthor,
  generateGuideIndex,
  generateGuideIndices,
  injectGuideIndex,
} = require("./static.config");

// state to load content to
let content;

beforeAll(async () => {
  // kinda assumes that contentDir is correct before testing it
  content = await jdown(contentDir);
});

test("contentDir is `./content`", () => {
  expect(contentDir).toBe("./content");
});

describe("isPublished()", () => {
  it("returns false if `publishedOn` is not presentl", () => {
    expect(isPublished({})).toBeFalsy();
  });

  it("returns false if `publishedOn` is present but null", () => {
    expect(isPublished({ publishedOn: null })).toBeFalsy();
  });

  it("returns true if `publishedOn` is not null", () => {
    expect(isPublished({ publishedOn: "2020-10-10" })).toBeTruthy();
  });
});

describe("relatedSlugs()", () => {
  it("returns empty array if `relatedSlugs` are not present", () => {
    expect(relatedSlugs({})).toEqual([]);
  });

  it("returns og array if `relatedSlugs` are present", () => {
    expect(
      relatedSlugs({
        data: {
          relatedSlugs: ["s1", "s2"],
        },
      })
    ).toEqual(["s1", "s2"]);
  });
});

describe("relatedPosts()", () => {
  const posts = [
    {
      data: {
        slug: 1,
        relatedSlugs: [2],
      },
    },
    {
      data: {
        slug: 2,
      },
    },
  ];

  it("returns empty array if no related slugs exist", () => {
    const post = posts[1];
    const related = relatedPosts(posts, post);

    expect(related).toEqual([]);
  });

  it("returns related posts if related slugs exist", () => {
    const post = posts[0];
    const related = relatedPosts(posts, post);

    expect(related).toBeInstanceOf(Array);
    expect(related).toHaveLength(1);
    expect(related[0]).toHaveProperty("data.slug", 2);
  });
});

describe("injectRelatedPosts()", () => {
  const posts = [
    {
      data: {
        slug: 1,
        relatedSlugs: [2],
      },
    },
    {
      data: {
        slug: 2,
      },
    },
  ];

  const injectFn = injectRelatedPosts(posts);

  it("injects empty array of no related slugs exist", () => {
    const post = posts[1];
    const injected = injectFn(post);

    expect(injected.data.relatedPosts).toEqual([]);
  });

  it("injects related array of related slugs exist", () => {
    const post = posts[0];
    const injected = injectFn(post);

    expect(injected.data.relatedPosts).toBeInstanceOf(Array);
    expect(injected.data.relatedPosts).toHaveLength(1);
    expect(injected.data.relatedPosts[0]).toHaveProperty("data.slug", 2);
  });

  it("maintains exisiting data post injection", () => {
    const post = posts[0];
    const injected = injectFn(post);

    expect(injected.data.relatedSlugs).toEqual([2]);
  });
});

describe("jdown()", () => {
  it("has posts", () => {
    expect(content).toHaveProperty("posts");
  });

  it("loads known posts", () => {
    expect(content.posts).toHaveProperty("2021ClayBricksVersusLegos");
    expect(content.posts).toHaveProperty(
      "2021HowToBuildAMetaverseLet’sStartWithTheBlocks"
    );
    expect(content.posts).toHaveProperty("2021WhatsUpBlockNovember20To262021");
  });

  it("loads post metadata", () => {
    const existingPost = content.posts["2021ClayBricksVersusLegos"];
    const expectedKeys = [
      "title",
      "subTitle",
      "slug",
      "canonicalUrl",
      "publishedOn",
      "heroImg",
      "tags",
      "relatedSlugs",
      "author",
      "contents",
    ];

    R.forEach((k) => {
      expect(existingPost).toHaveProperty(k);
    }, expectedKeys);
  });

  test("relatedSlugs and tags are arrays", () => {
    const existingPost = content.posts["2021ClayBricksVersusLegos"];

    expect(existingPost.tags).toBeInstanceOf(Array);
    expect(existingPost.relatedSlugs).toBeInstanceOf(Array);
  });

  it("has tags", () => {
    expect(content).toHaveProperty("tags");
  });

  it("has authors", () => {
    expect(content).toHaveProperty("authors");
  });

  it("loads author metadata", () => {
    const me = content.authors["shivekKhurana"];
    const requiredKeys = [
      "slug",
      "name",
      "profilePicture",
      "shortBio",
      "contents",
    ];

    R.forEach((k) => {
      expect(me).toHaveProperty(k);
    }, requiredKeys);
  });
});

describe("postsToPostPages()", () => {
  const postPages = postsToPostPages([{ slug: "test-slug", flag: "x" }]);

  it("returns RS meta data", () => {
    const first = postPages[0];
    expect(first).toHaveProperty("path", "/blog/test-slug");
    expect(first).toHaveProperty("template", "src/templates/blog/Post");
    expect(first).toHaveProperty("data");
    expect(first.data).toHaveProperty("flag", "x");
  });
});

describe("stipPostContents()", () => {
  const post = { data: { contents: "x" } };
  it("strips contents from data", () => {
    expect(stripPostContents(post)).not.toHaveProperty("data.contents");
  });
});

describe("stripRelatedPostsContent()", () => {
  const post = {
    data: {
      relatedPosts: [
        {
          data: { contents: "x" },
        },
        {
          data: { contents: "y" },
        },
      ],
    },
  };

  it("strips contents of related posts", () => {
    const stripped = stripRelatedPostsContent(post);
    expect(stripped).not.toHaveProperty("data.relatedPosts.0.data.contents");
    expect(stripped).not.toHaveProperty("data.relatedPosts.1.data.contents");
  });
});

describe("rawDataToGetData()", () => {
  const post = { data: "x" };
  const withGetData = rawDataToGetData(post);

  it("converts data to a getData fn", () => {
    expect(withGetData.getData).toBeInstanceOf(Function);
    expect(withGetData.getData()).toEqual(post.data);
  });
});

describe("injectRelatedPostauthors()", () => {
  const authors = {
    x: { slug: "x", id: 1, data: "x-data" },
    y: { slug: "y", id: 2, data: "y-data" },
  };

  const post = {
    data: {
      relatedPosts: [
        {
          data: {
            author: "x",
          },
        },
        {
          data: {
            author: "y",
          },
        },
      ],
    },
  };

  const withAuthors = injectRelatedPostAuthors(authors)(post);

  it("should inject author data in place of author slug", () => {
    expect(withAuthors.data.relatedPosts).toBeInstanceOf(Array);
    expect(withAuthors.data.relatedPosts).toHaveLength(2);

    const first = withAuthors.data.relatedPosts[0];
    const second = withAuthors.data.relatedPosts[1];

    expect(first).toHaveProperty("data.author", authors.x);
    expect(second).toHaveProperty("data.author", authors.y);
  });
});

describe("injectAuthor()", () => {
  const authors = [
    { slug: "x", contents: "x contents", name: "xname" },
    { slug: "y", contents: "yc" },
  ];

  const post = { data: { author: "x" } };
  const injectFn = injectAuthor(authors);

  const injectedPost = injectFn(post);

  it("replaces author slug with author in post", () => {
    expect(injectedPost).toHaveProperty("data.author.slug", "x");
    expect(injectedPost).toHaveProperty("data.author.name", "xname");
  });
  it("strips author contents before injection", () => {
    expect(injectedPost).not.toHaveProperty("data.author.contents");
  });
});

describe("generateGuideIndex()", () => {
  const guidePages = [
    {
      path: "/guides/g1",
      getData: () => ({
        title: "g1",
        slug: "g1",
        emoji: "emoji",
        heroImage: "img",
        contents: "<h1>hello</h1>",
      }),
    },
    {
      path: "/guides/g2",
      getData: () => ({
        slug: "g2",
      }),
    },
  ];

  const guideChapterPages = [
    {
      path: "/guides/g1/c1",
      getData: () => ({
        guideSlug: "g1",
        chapterNumber: 1,
        contents: "<h2>c</h1>",
      }),
    },
    {
      path: "/guides/g1/c2",
      getData: () => ({
        guideSlug: "g1",
        chapterNumber: 2,
        contents: "<h2>c</h1>",
      }),
    },
    {
      path: "/guides/g2/c1",
      getData: () => ({ guideSlug: "g2" }),
    },
  ];

  const guideSlug = "g1";
  const index = generateGuideIndex(guidePages, guideChapterPages, guideSlug);

  it("should create index with guide intro and all guide chapters", () => {
    expect(index).toHaveProperty("guide");
    expect(index).toHaveProperty("guide.data");
    expect(index).toHaveProperty("chapters");
    expect(index).toHaveProperty("chapters.0.data");
    expect(index).toHaveProperty("chapters.1.data");
  });

  it("index.guide.data should have a title, path, emoji and heroImg", () => {
    expect(index.guide.path).toEqual(guidePages[0].path);
    const sentData = guidePages[0].getData();
    expect(index.guide.data.title).toEqual(sentData.title);
    expect(index.guide.data.slug).toEqual(sentData.slug);
    expect(index.guide.data.emoji).toEqual(sentData.emoji);
    expect(index.guide.data.heroImage).toEqual(sentData.heroImage);
  });

  it("index.guide should not have contents", () => {
    expect(index.guide.data).not.toHaveProperty("contents");
  });

  it("index.chapters should be an array with 2 children", () => {
    expect(index.chapters).toBeInstanceOf(Array);
    expect(index.chapters).toHaveLength(2);
  });

  it("index.chapters.data should not have contents", () => {
    expect(index.chapters[0].data).not.toHaveProperty("contents");
    expect(index.chapters[1].data).not.toHaveProperty("contents");
  });

  it("each element of index.chapters should have a path and associated data", () => {
    R.forEach((c) => {
      expect(c).toHaveProperty("path");
      expect(c).toHaveProperty("data");

      expect(c.data).toHaveProperty("guideSlug", guideSlug);
      expect(c.data).toHaveProperty("chapterNumber");
    }, index.chapters);
  });

  it("should return chapters in order of chapterNumber", () => {
    expect(R.nth(0, index.chapters).data).toHaveProperty("chapterNumber", 1);
    expect(R.nth(1, index.chapters).data).toHaveProperty("chapterNumber", 2);
  });
});

describe("generateGuideIndices()", () => {
  const guidePages = [
    {
      path: "/guides/g1",
      getData: () => ({
        slug: "g1",
        title: "title g1",
      }),
    },
    {
      path: "/guides/g2",
      getData: () => ({
        title: "title g2",
        slug: "g2",
      }),
    },
  ];

  const guideChapterPages = [
    {
      path: "/guides/g1/c1",
      getData: () => ({ guideSlug: "g1", chapterNumber: 1, slug: "c1" }),
    },
    {
      path: "/guides/g1/c2",
      getData: () => ({ guideSlug: "g1", chapterNumber: 2, slug: "c2" }),
    },
    {
      path: "/guides/g2/c1",
      getData: () => ({ guideSlug: "g2", chapterNumber: 1, slug: "c1" }),
    },
  ];

  const indices = generateGuideIndices(guidePages, guideChapterPages);

  it("guide slugs should be keys in indices object", () => {
    expect(indices).toHaveProperty("g1");
    expect(indices).toHaveProperty("g2");
  });
});

describe("injectGuideIndex()", () => {
  const index = "indexval";
  const page = { getData: () => ({ a: 1 }) };
  const injected = injectGuideIndex(page, index);

  it("should inject index to getData fn", () => {
    expect(injected.getData()).toHaveProperty("index", "indexval");
    expect(injected.getData()).toHaveProperty("a", 1);
  });
});
