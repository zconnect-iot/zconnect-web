/**
 * Usage: node generateIconPathHashMap.js <PATH>

 * Strips the d attribute from all svg files at given PATH and adds to JSON
 * dictionary using upper cased filename as key.
*/
const ERR_SOME_OPTIMISATIONS_FAILED = 1
const ERR_INVALID_ARGS = 2

// Ensure the arguments are valid.
if (process.argv.length !== 3) {
  console.log("Usage: node", __filename, " path/to/icons/directory")
  console.error('Received arguments:', process.argv)
  process.exit(ERR_INVALID_ARGS)
}


const fs = require('fs')
const path = require('path')
const Svgo = require('svgo')

const ICONS_DIR = process.argv[2];
const ICONS = {}
const ERRORS = []
const OUTPUT = path.resolve(ICONS_DIR, 'map.json')

const optimiser = new Svgo({
  transformsWithOnePath: true,
})

const getSvgPathRegex = /<path.*d="([^"]*)"/
function getSvgPath(svgString) {
  if (typeof svgString !== 'string') {
    throw new Error(`Expected string; got ${svgString}`)
  }
  return svgString.match(getSvgPathRegex)[1]
}

const optimise = (svgString) => new Promise((resolve, reject) => {
  optimiser.optimize(svgString.toString(), data => {
    if (data.error) reject(data)
    else resolve(data)
  })
})

const readFile = filepath => new Promise((resolve, reject) => {
  fs.readFile(filepath, (err, data) => {
    if (err) reject(err)
    else resolve(data)
  })
})

const processIcon = filepath => readFile(filepath)
  .then(optimise)
  .then(({ data }) => getSvgPath(data))
  .then(svgPath => {
    const iconName = path.basename(filepath).replace('.svg', '').toUpperCase()
    ICONS[iconName] = svgPath
  })
  .catch(err => {
    ERRORS.push(`Unable to process ${filepath}: ${err.message}`)
  })

const iconPaths = fs.readdirSync(ICONS_DIR)
  .filter(filepath => filepath.endsWith('.svg'))
  .map(filepath => path.resolve(ICONS_DIR, filepath))
  .map(processIcon)

Promise.all(iconPaths).then(() => {
  fs.writeFileSync(OUTPUT, JSON.stringify(ICONS, null, 2))
  console.log('Hash map written to', OUTPUT)
  if (ERRORS.length) {
    console.error("Encountered the following errors.\n- %s", ERRORS.join('\n- '))
    process.exit(ERR_SOME_OPTIMISATIONS_FAILED)
  }
})
