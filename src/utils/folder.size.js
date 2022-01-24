import getFolderSize from 'get-folder-size'
import Listr from 'listr'
import chalk from 'chalk'

export const dirSize = async (directory, isAfter = false) => {
  let folderSize
  if (!isAfter) {
    console.log('\n')
  }
  let tasks = new Listr([
    {
      title: `Calculating ${isAfter ? 'updated' : ''} folder size`,
      task: () => {
        getFolderSize(directory, (err, size) => {
          if (err) console.log()
          folderSize = `${(size / 1000 / 1000).toFixed(2)} MB`
          console.log(
            isAfter
              ? `  Updated size: ${chalk.green.bold(folderSize)} `
              : `   Current size: ${chalk.red.bold(folderSize)}`,
          )
          console.log(isAfter ? '' : '  ===============================\n\n')
        })
      },
    },
  ])
  await tasks.run()
}
