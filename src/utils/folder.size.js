import chalk from 'chalk'
import fs from 'fs'
import Listr from 'listr'
import path from 'path'
import Spinner from './spinner'

export const dirSize = async (directory, isAfter = false) => {
  let spinner = new Spinner()
  console.log('\n')
  let sizeString = ''
  spinner.text = 'Calculating space'
  spinner.start()
  let size = await getTotalSize(directory)
  let folderSize = `${(size / 1000 / 1000).toFixed(2)} MB`
  sizeString = isAfter
    ? `   Updated size : ${chalk.green.bold(folderSize)}\n `
    : `   Current size: ${chalk.red.bold(folderSize)}\n`
  spinner.stop()
  console.log(sizeString)
}

// Recursively iterates through all the files and folders in the specified directory.
// @param {string} dirPath - The path of the directory.
// @param {string[]} arrayOfFiles -  List of file paths.
// @return {string[]} Returns an array of file paths.
const getAllFiles = function (dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, file))
    }
  })
  return arrayOfFiles
}

// @param {string} directoryPath -  Path of the directory where space needs to be found.
// @return {number} Retunrns the total size in bytes.
const getTotalSize = async (directoryPath) => {
  const arrayOfFiles = getAllFiles(directoryPath)
  let totalSize = 0
  arrayOfFiles.forEach(function (filePath) {
    totalSize += fs.statSync(filePath).size
  })
  return totalSize
}
