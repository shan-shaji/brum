import chalk from 'chalk'
import fs from 'fs'
import Listr from 'listr'
import path from 'path'

export const dirSize = async (directory, isAfter = false) => {
  console.log('\n')
  let sizeString = ''
  let tasks = new Listr([
    {
      title: 'Calculating space',
      task: async () => {
        let size = await getTotalSize(directory)
        let folderSize = `${(size / 1000 / 1000).toFixed(2)} MB`
        sizeString = isAfter
          ? `   Updated size : ${chalk.green.bold(folderSize)}\n `
          : `   Current size: ${chalk.red.bold(folderSize)}\n`
      },
    },
  ])

  await tasks.run()
  console.log(sizeString)
}

// Recursively iterates through all the files and folders in the specified directory
// @dirPath - {string} The path of the directory
// @arrayOfFiles - {string[]} List of file paths
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

// @directoryPath - {string} Path of the directory where space needs to be found
const getTotalSize = async (directoryPath) => {
  const arrayOfFiles = await getAllFiles(directoryPath)
  let totalSize = 0
  arrayOfFiles.forEach(function (filePath) {
    totalSize += fs.statSync(filePath).size
  })
  return totalSize
}
