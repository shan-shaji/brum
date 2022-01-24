'use strict'

const execa = require('execa')
import Listr from 'listr'
import path from 'path'
import fs from 'fs'

import { warn, success, error } from './logger'
import chalk from 'chalk'

// Runs flutter clean command in the current directory
export const runFlutterClean = async () => {
  const tasks = new Listr([
    {
      title: 'Running flutter clean',
      task: async () => {
        try {
          await execa('flutter clean')
        } catch (error) {
          error('Failed to run flutter clean, Please try again')
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
  // List of processes that need to be executed bu Listr
  let processList = []

  files.forEach(async (folderName) => {
    // The relative path of the directory.
    let dirPath = path.join(process.cwd(), folderName)

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
              await execa('flutter clean', { cwd: dirPath })
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
    let tasks = new Listr(processList)
    try {
      await tasks.run()
    } catch (e) {
      error('\nFailed to clean files, please try again\n')
    }
  }
}
