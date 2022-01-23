'use strict'

import path from 'path'
import fs from 'fs'

import { error, info, warn } from '../../utils/logger'
import { showIntroduction } from '../../utils/intro'
import { chooseFolderType } from '../../helpers/PROMPT.JS'
import { flutterText, nodeJs } from '../../constants/strings'

const handleFlutter = (files) => {
  if (files.includes('pubspec.yaml')) {
    console.log(process.cwd())
    // Todo: execute the flutter clean command
  } else {
    // Todo: execute the flutter clean command in all files in this folder
  }
}

const handleNodejs = (files) => {
  if (files.includes('package.json')) {
    console.log(process.cwd())
    // Todo: Delete node_modules
  } else {
    // Todo: node_modules
  }
}

export const clean = async (folderName) => {
  showIntroduction()

  let isCurrentDir = false
  let { folderType } = await chooseFolderType()

  if (folderName === '.') {
    isCurrentDir = true
    folderName = path.basename(process.cwd())
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
