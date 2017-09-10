const { promisify } = require('util')

const fs = require('fs')
const less = require('less')
const postcss = require('postcss')

const readFile = promisify(fs.readFile)

const filename = process.argv[2]
const isProduction = process.env['NODE_ENV'] === 'production'
const enableSourceMaps = !isProduction

process.on('unhandledRejection', (error) => {
  console.error(error)
  process.exit(1)
})

const lessOptions = {
  sourceMap: {
    sourceMapFileInline: enableSourceMaps,
    outputSourceFiles: enableSourceMaps
  },
  filename
}

const postcssOptions = {
  map: enableSourceMaps && { inline: enableSourceMaps }
}

const postcssPlugins = [
  require('autoprefixer')(),
  require('postcss-selector-matches')()
]

if (isProduction) postcssPlugins.push(require('cssnano')())

;(async () => {
  const fileContent = await readFile(filename, { encoding: 'utf8' })
  const lessOutput = await less.render(fileContent, lessOptions)
  const postcssOutput = await postcss(postcssPlugins).process(lessOutput.css, postcssOptions)

  process.stdout.write(postcssOutput.css)
})()
