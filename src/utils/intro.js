'use strict'

import figlet from 'figlet'

import { appName, tagLine } from '../constants/strings'
import { info } from './logger'

export const showIntroduction = () => {
  console.log(
    figlet.textSync(appName, {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    }),
  )

  info(tagLine)
}
