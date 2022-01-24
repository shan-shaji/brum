'use strict'

import fs from 'fs'

import { error } from '../../utils/logger'
import { showIntroduction } from '../../utils/intro'
import { chooseFolderType } from '../../helpers/prompt'
import { flutterText, nodeJs } from '../../constants/strings'
import {
  runFlutterClean,
  runFlutterCleanOnMultipleFolders,
} from '../../helpers/flutter.clean'

const handleFlutter = async (files) => {
  if (files.includes('pubspec.yaml')) {
    await runFlutterClean()
  } else {
    await runFlutterCleanOnMultipleFolders(files)
  }
}

const handleNodejs = (files) => {
  if (files.includes('package.json')) {
    // Todo: Delete node_modules
  } else {
    // Todo: node_modules
  }
}

export const clean = async (folderName) => {
  // Show app intro using figlet
  showIntroduction()

  // variable to check if the folder is current working directory
  let isCurrentDir = false

  // prompt to get folder type
  let { folderType } = await chooseFolderType()

  // If the folderName is `.` then the directory is current working directory
  if (folderName === '.') {
    isCurrentDir = true
  }

  if (isCurrentDir) {
    const files = fs.readdirSync('.')
    if (files.length == 0) {
      error('\n Error: No folders found in this directory')
      process.exit(1)
    }

    switch (folderType) {
      case flutterText:
        handleFlutter(files)
        break
      case nodeJs:
        handleNodejs(files)
      default:
        break
    }
  }
}
