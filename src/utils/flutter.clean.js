'use strict'

const execa = require('execa')
import Listr from 'listr'
import Spinner from './spinner'

// Runs flutter clean command in the current directory
export const flutterClean = async () => {
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
  } catch (error) {
    error('Failed to run flutter clean, Please try again')
  }
}
