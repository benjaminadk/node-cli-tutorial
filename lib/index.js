const jimp = require('jimp')
const rimraf = require('rimraf')

const fs = require('fs')
const { promisify } = require('util')

const thumbnail = async (src, dest) => {
  const image = await jimp.read(src)
  await image.resize(225, 190, jimp.RESIZE_BICUBIC)
  image.quality(40)
  await image.writeAsync(dest)
}

const directoryExists = filepath => {
  return fs.existsSync(filepath)
}

const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const rm = promisify(rimraf)

module.exports = {
  thumbnail,
  directoryExists,
  readdir,
  mkdir,
  rm
}
