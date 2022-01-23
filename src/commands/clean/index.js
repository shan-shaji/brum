'use strict'

import path from 'path'
import fs from 'fs'
import { error, info, warn } from '../../utils/logger'
import { showIntroduction } from '../../utils/intro'

export const clean = async (folderName) => {
  showIntroduction()

  const argument = process.argv[4]
  let isCurrentDir = false

  if (folderName === '.') {
    isCurrentDir = true
    folderName = path.basename(process.cwd())
  }

  if (isCurrentDir) {
    const files = fs.readdirSync('.')
    if (files.length == 0) {
      error('\n Error: No folders found in this directory')
      process.exit(1)
    } else if (files.includes('pubspec.yaml')) {
      // Todo: execute the flutter clean command
    } else {
      // Todo: execute the flutter clean command in all files in this folder
    }
  }
}
