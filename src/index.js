'use strict'

import { program } from './helpers/commander'
import pkg from '../package.json'
import { showIntroduction } from './utils/intro'
import { clean } from './commands/clean/index'

program
  .description(pkg.description)
  .version(pkg.version)
  .usage('<command> [options]')

program
  .command('clean <folderName>')
  .description('Deletes the generated files')
  .action(clean)

program.parse(process.argv)

if (!program.args.length) {
  showIntroduction()
}
