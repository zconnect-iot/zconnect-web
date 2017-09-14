/*
  Usage: node generateIconPathHashMap.js <PATH>

  Strips the d attribute from all svg files at given PATH and adds to JSON dictionary using upper cased filename as key
*/

const fs = require('fs')

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory")
  process.exit(-1)
}

var path = process.argv[2];

const ICONS = {}

function getPath(filename) {
  console.log(path, filename);
  const data = fs.readFileSync(`${path}/${filename}`, 'utf8')
  return data.match(/<path.*d="([^"]*)"/)[1]
}

const items = fs.readdirSync(path)

for (var i=0; i<items.length; i++) {
    const item = items[i]
    // console.log(item);
    const name = item.split('.')[0]
    const ext = item.split('.')[1]
    if (ext === 'svg') {
      ICONS[name.toUpperCase()] = getPath(item, name)
    }
}

fs.writeFileSync('icons.json', JSON.stringify(ICONS, null, 2))
