import inquirer from 'inquirer'
import { defaultFolderType, flutterText, nodeJs } from '../constants/strings'

export const chooseFolderType = async () => {
  const folderType = await inquirer.prompt({
    name: 'folderType',
    type: 'list',
    message: 'Please choose the folder type',
    choices: [flutterText, nodeJs],
    default: defaultFolderType,
  })
  return folderType
}
