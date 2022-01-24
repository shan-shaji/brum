'use strict'

import execa from 'execa'
import Listr from 'listr'
import path from 'path'
import fs from 'fs'

import { warn, error } from '../utils/logger'
import chalk from 'chalk'
import { dirSize } from '../utils/folder.size'

// Runs flutter clean command in the current directory
export const runFlutterClean = async () => {
  const tasks = new Listr([
    {
      title: 'Running flutter clean',
      task: async () => {
        try {
          await execa('flutter', ['clean'])
        } catch (error) {
          console.log(error)
          throw Error(error)
        }
      },
    },
    {
      title: 'Cleaning Files',
      task: async () => {
        try {
          setTimeout(() => {}, 100)
        } catch (error) {
          throw Error(error)
        }
      },
    },
  ])

  try {
    await tasks.run()
  } catch (e) {
    error('Failed to run flutter clean, Please try again')
  }
}

export const runFlutterCleanOnMultipleFolders = async (files) => {
  let workingDir = process.cwd()

  // List of processes that need to be executed bu Listr
  let processList = []

  let isManupulatedFolders = false

  files.forEach(async (folderName) => {
    // The relative path of the directory.
    let dirPath = path.join(workingDir, folderName)

    // List of sub folders and files
    const subF = fs.readdirSync(dirPath)

    // Checks if the folder is a flutter project
    if (subF.includes('pubspec.yaml')) {
      // Checks if the folder is already cleaned or not
      if (subF.includes('build') || subF.includes('.packages'))
        // Creates task that can be executed by Listr
        processList.push({
          title: `Cleaning ${chalk.green.bold(dirPath)}`,
          task: async () => {
            try {
              await execa('flutter', ['clean'], { cwd: dirPath })
            } catch (error) {
              throw Error(error)
            }
          },
        })
    }
  })

  if (!processList.length) {
    warn("\nCouldn't find folders with build or .packages files\n")
  } else {
    await dirSize(workingDir)
    let tasks = new Listr(processList)
    try {
      await tasks.run()
      console.log('\n\n  ===============================')
    } catch (e) {
      error('\nFailed to clean files, please try again\n')
    }

    await dirSize(workingDir, true)
  }
}
