#!/usr/bin/env node

const program = require('commander')
const path = require('path')

const { thumbnail, directoryExists, readdir, mkdir, rm } = require('./lib')

program
  .version('1.0.0')
  .name('make-thumbs')
  .description('An image resizer to make thumbnails')
  .option('-s,--source [folder]', 'Source images directory', 'images')
  .option(
    '-d,--destination [folder]',
    'Directory to be created for thumbnails',
    'thumbnails'
  )
  .parse(process.argv)

const main = async () => {
  try {
    // Use current working dir vs __dirname where this code lives
    const cwd = process.cwd()

    // Use user input or default options
    const { source, destination } = program
    const srcPath = path.join(cwd, source)
    const destPath = path.join(cwd, destination)

    // Remove destination directory is it exists
    if (directoryExists(destPath)) {
      await rm(destPath)
    }

    // Create destination directory
    await mkdir(destPath)

    // Read source directory
    const imagesAll = await readdir(srcPath)

    // Create thumbnails
    for (let image of imagesAll) {
      const src = path.join(srcPath, image)
      const dest = path.join(destPath, image)
      console.log(`Creating thumbnail at: ${dest}`)
      thumbnail(src, dest)
    }

    console.log('Thumbnails created successfully!')
  } catch (error) {
    console.log('Error creating thumbnails')
  }
}

main()
