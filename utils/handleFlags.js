import inquirer from 'inquirer'
import figures from 'figures'
import { flags } from './cli.js'
import chalk from 'chalk'

const handleFlag = async ( flag, defaultAnswer = false  ) => {
    let options = {
        name: 'flag',
        type: 'string',
        message: flags[flag].desc,
    }

    if (defaultAnswer) options.default = defaultAnswer

    const prompt = await inquirer.prompt(options)

    writeConfirmation(flag, prompt.flag)

    return  prompt.flag
}

const writeConfirmation = (flag, prompt) => {
    console.log(chalk.green(figures.tick), `${chalk.bold(flags[flag].name)}:` , prompt)
    console.log()
}

export { writeConfirmation }

export default handleFlag
