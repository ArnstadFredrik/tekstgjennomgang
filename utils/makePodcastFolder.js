import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import os from 'os'
import sleep from './sleep.js'
import figures from 'figures'
import cmd from 'node-cmd'
import { createSpinner } from 'nanospinner'
import cli from './cli.js'


const makeProjectFolder = async (input) => {
    let { info, day, name, audio } = input
    let date = new Date()
    let formatDate = date.toISOString().split('T')[0]

    let projectName = `${formatDate} - tekstgjennongang - ${day} - ${name}`
    const projectPath = `${cli.flags.path}/${projectName}`
    const spinner = createSpinner(`${chalk.bold('Lager prosjektmappen:')} "${chalk.underline(projectName)}"`)
    
    if (!(await fs.exists(projectPath))) {
        spinner.start()
        await fs.outputFile(`${projectPath}/info.txt`, info.payload)
        spinner.success()
        
        const audioPath = chalk.bold.underline(`${projectPath}/audio/`)
        const copySpinner = createSpinner(`Kopierer ${chalk.bold(audio.name)}, til ${audioPath}`).start()
        await fs.copy(audio.path, `${projectPath}/audio/${audio.name}`)
        copySpinner.success()
        cmd.runSync(`open "${projectPath}"`)
        cmd.runSync(`open -a Audacity "${projectPath}/audio/${audio.name}"`)
    } else {
        console.log(chalk.red(figures.cross), chalk.bold(`Fil eller mappe finnes allerede.`))
        console.log(`\t${chalk.bold.underline(projectPath)}`)
        cmd.runSync(`open "${projectPath}/.."`)
    }
}

export default makeProjectFolder
