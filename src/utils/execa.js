'use strict'

const execa = require('execa')
import Listr from 'listr'

// Runs flutter clean command in the current directory
export const executeFlutterClean = async () => {
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
      title: 'Completing task',
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
  } catch (error) {
    error('Failed to run flutter clean, Please try again')
  }
}
