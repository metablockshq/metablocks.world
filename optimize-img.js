const sharp = require("sharp")
const path = require("path")
const {promises: fs} = require("fs")

const R = require("ramda")

const sourceDir = "public/img"
const destDir = "public/optimized-img"

const notEndsWith = extension => R.filter(node => R.not(R.endsWith(extension, node)))

const filterUnwantedExtensions = R.compose(
  notEndsWith(".svg"),
  notEndsWith(".gif"),
  notEndsWith(".DS_Store")
)

const walkDirs = source => R.map(async node => {
  const nextPath = path.join(source, node)
  const stat = await fs.stat(nextPath)
  return stat.isDirectory() ? await lsFiles(nextPath) : nextPath
})

/**
 * Recursively get a list of all leaf file paths in a directory
 */
const lsFiles = async source => {
  const contents = await fs.readdir(source)
  const transducer = R.compose(filterUnwantedExtensions, walkDirs(source))
  const files = R.transduce(transducer,
			    R.flip(R.append),
			    [], contents)
  return R.flatten(await Promise.all(files))
}

const computePathAndName =  R.map(f => {
  const components = f.split("/")
  return {filePath: R.join("/", R.dropLast(1, components)),
	  name: R.last(components)}
})

const appendOptimizedPath = R.map(pathAndName => (
  {...pathAndName,
   optimizedPath: path.join(
     R.replace(sourceDir, destDir, pathAndName.filePath),
     pathAndName.name)
  }
))

const tentativeOptimizedPaths = imgFiles => {
  const transducer = R.compose(computePathAndName, appendOptimizedPath)
  return R.transduce(transducer, R.flip(R.append), [], imgFiles)
}

/**
 * Remove the processed file names like w-20.jpeg
 * and return just the path
 */
const stripFileNames = processedImgFiles => {
  const txf = R.compose(
    R.join("/"),
    R.dropLast(1),
    R.split("/")
  )
  return R.uniq(R.map(txf, processedImgFiles))
}

const filesToProcess = (imgFiles, processedImgFiles) => {
  const computedOutComponents = tentativeOptimizedPaths(imgFiles)
  const existingOptimizedPaths = stripFileNames(processedImgFiles)
  return R.filter(
    c => R.not(R.includes(c.optimizedPath, existingOptimizedPaths)),
    computedOutComponents
  )
}

const widthsToGenerate = [80, 240, 480, 960, 1440]
const widthsToBlur = [240, 480]

const processFile = async component => {
  // create the folder
  await fs.mkdir(component.optimizedPath, {recursive: true})

  // convert image to webp format in highest quality
  const inputSharp = sharp(path.join(component.filePath, component.name))
  const ogWebpPath = path.join(component.optimizedPath, "og.webp")
  await inputSharp.toFile(ogWebpPath)

  // convert og.webp to desired widths
  const ogSharp = sharp(ogWebpPath)
  await Promise.all(R.map(async width => {
    const widthPath = path.join(component.optimizedPath, `w-${width}.webp`)
    await ogSharp.clone().resize({width}).toFile(widthPath)

    // blur if needed
    if (R.contains(width, widthsToBlur)) {
      await sharp(widthPath).blur(8).toFile(path.join(component.optimizedPath, `w-${width}-blurred.webp`))
    }
  }, widthsToGenerate))
}

async function main() {
  const imgFiles = await lsFiles(sourceDir)
  const processedImgFiles = await lsFiles(destDir)
  const unprocessedImageFiles = filesToProcess(imgFiles, processedImgFiles)

  try {
    await Promise.all(R.map(await processFile, unprocessedImageFiles))
    console.log("Images optimized successfully!")
  } catch(e) {
    console.error(e)
  }
}

module.exports = {
  filterUnwantedExtensions, computePathAndName,
  sourceDir, destDir, appendOptimizedPath,
  stripFileNames, filesToProcess
}

if (require.main === module) {
  main()
}

