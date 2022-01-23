'use strict'

import { program } from './helpers/commander'
import pkg from '../package.json'
import { showIntroduction } from './utils/intro'

program
  .description(pkg.description)
  .version(pkg.version)
  .usage('<command> [options]')

program.parse(process.argv)

if (!program.args.length) {
  showIntroduction()
}
