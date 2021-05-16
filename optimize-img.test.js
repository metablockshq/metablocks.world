const R = require("ramda")

const {
  filterUnwantedExtensions, computePathAndName,
  sourceDir, destDir, appendOptimizedPath,
  stripFileNames, filesToProcess
} = require("./optimize-img")

beforeAll(async () => {
})

describe("filterUnwantedExtensions()", () => {
  it("should remove .DS_Store, .svg and .gif files from list of files", () => {
    const files = ["public/img/.DS_Store", "public/img/boy.svg",
		   "public/img/anim.gif", "public/img/ok.png"]

    const filtered = R.transduce(filterUnwantedExtensions, R.flip(R.append), [], files)

    expect(filtered).toHaveLength(1)
    expect(filtered[0]).toEqual("public/img/ok.png")
  })
})

describe("computePathAndname()", () => {
  it("spilts a file into its path and name", () => {
    const files = ["public/img/content/posts/a.jpg", "public/img/content/authors/b.jpg"]
    const computedFiles = R.transduce(computePathAndName, R.flip(R.append), [], files)

    expect(computedFiles).toHaveLength(2)

    expect(computedFiles[0]).toHaveProperty("filePath", "public/img/content/posts")
    expect(computedFiles[0]).toHaveProperty("name", "a.jpg")

    expect(computedFiles[1]).toHaveProperty("filePath", "public/img/content/authors")
    expect(computedFiles[1]).toHaveProperty("name", "b.jpg")
  })
})

describe("appendOptimizedPath()", () => {
  it("spilts a file into its path and name", () => {
    const pathAndNames = [{filePath: "public/img/content/posts",
			   name: "a.jpg"}]
    const computedFiles = R.transduce(appendOptimizedPath, R.flip(R.append), [], pathAndNames)

    expect(computedFiles).toHaveLength(1)
    expect(computedFiles[0]).toHaveProperty("filePath", "public/img/content/posts")
    expect(computedFiles[0]).toHaveProperty("optimizedPath", "public/optimized-img/content/posts/a.jpg")
    expect(computedFiles[0]).toHaveProperty("name", "a.jpg")
  })
})


describe("stripFileNames()", () => {
  it("removes file names and retursn a list of unique dirs", () => {
    const optimizedFiles = [
      "public/optimized-img/contents/a.jpg/w-20.webp",
      "public/optimized-img/contents/a.jpg/w-40.webp",
      "public/optimized-img/contents/a.jpg/w-80.webp",
      "public/optimized-img/contents/b.jpg/w-20.webp",
      "public/optimized-img/contents/b.jpg/w-40.webp",
      "public/optimized-img/contents/b.jpg/w-80.webp",
    ]

    const stripped = stripFileNames(optimizedFiles)
    expect(stripped).toHaveLength(2)
    expect(stripped[0]).toEqual("public/optimized-img/contents/a.jpg")
    expect(stripped[1]).toEqual("public/optimized-img/contents/b.jpg")
  })
})

describe("filesToProcess()", () => {
  it("should check all files against optimized files and return un-optimized files", () => {
    const allFiles = [
      "public/img/contents/authors/a1.jpg",
      "public/img/contents/posts/p1.jpg",
      "public/img/contents/a.jpg", // processed
      "public/img/contents/b.jpg" // processed
    ]
    const optimizedFiles = [
      "public/optimized-img/contents/a.jpg/w-20.webp",
      "public/optimized-img/contents/a.jpg/w-40.webp",
      "public/optimized-img/contents/a.jpg/w-80.webp",
      "public/optimized-img/contents/b.jpg/w-20.webp",
      "public/optimized-img/contents/b.jpg/w-40.webp",
      "public/optimized-img/contents/b.jpg/w-80.webp",
    ]

    const toProcess = filesToProcess(allFiles, optimizedFiles)

    expect(toProcess).toHaveLength(2)

    expect(toProcess[0]).toHaveProperty("filePath", "public/img/contents/authors")
    expect(toProcess[0]).toHaveProperty("name", "a1.jpg")
    expect(toProcess[0]).toHaveProperty("optimizedPath", "public/optimized-img/contents/authors/a1.jpg")

    expect(toProcess[1]).toHaveProperty("filePath", "public/img/contents/posts")
    expect(toProcess[1]).toHaveProperty("name", "p1.jpg")
    expect(toProcess[1]).toHaveProperty("optimizedPath", "public/optimized-img/contents/posts/p1.jpg")
  })
})
