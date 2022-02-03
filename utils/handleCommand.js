import selectAudio from './selectAudio.js'
import axios from 'axios'
import { createSpinner } from 'nanospinner'
import makeProjectFolder from './makePodcastFolder.js'
import handleFlag, { writeConfirmation } from './handleFlags.js'
import formatReadings from './formatReadings.js'
import chalk from 'chalk'
import figures from 'figures'
import inquirer from 'inquirer'
import init from './init.js';
import path from 'path'
import encodeurl from 'encodeurl'

const newPodcast = async (flags) => {
    init({ clear: true })
    let { psalm, name, day, audio } = flags

    if (!audio) {
        audio = await selectAudio()
    } else {
        audio = {
            name: path.basename(audio),
            path: audio, 
        }
    }


    if (!day) {
        day = await getDay()
        writeConfirmation('day', day)
    }

    if (!name) name = await handleFlag('name')
    else writeConfirmation('name', name)

    if (!psalm) psalm = await handleFlag('psalm')
    else writeConfirmation('psalm', psalm)



    // if (!day) day = await handleFlag('day')
    // else writeConfirmation('day', day)
    
    const ready = await confirmAndChange({
        name,
        day,
        audio,
        psalm,
    })

    console.log(chalk.green(figures.tick), chalk.bold('Tekster'))
    for (let text of ready.info.readingsArray){
        console.log(`\t ${text}`)
    }
    makeProjectFolder(ready)

}

const confirmAndChange = async (input) => {
    let { name, day, audio, info, psalm, readingsObject} = input
    const confirmPrompt = await confirmCreate({ name, day, audio, psalm })
    if (confirmPrompt) { 
        const text = await getText(day)
        input.info = formatReadings({ name, psalm, day, readings: text.reading })
        input.day = text.name
        return input
    } else {
        const change = await changeInputs({ name, day, audio: audio.name, psalm })
        if (change === 'audio') input.audio = await selectAudio()
        else input[change] = await handleFlag(change, input[change])
        input = await confirmAndChange(input)
    }
    return input
}

const changeInputs = async (flags) => {
    const choices = []
    for (let option in flags) choices.push(`${option}: ${flags[option]}`)

    const answer = await inquirer.prompt({
        name: 'change',
        type: 'list',
        message: 'Hva skal endres?',
        choices
    })
    
    const result = String(answer.change).split(':')[0]
    return result
}

const confirmCreate = async (flags) => {
    init({ clear: true })
    for (let flag in flags) {
        if (flags[flag].hasOwnProperty('name')) writeConfirmation(`${flag}`, flags[flag].name)
        else writeConfirmation(`${flag}`, flags[flag])
    }
    const answer = await inquirer.prompt({
        name: 'confirm',
        type: 'confirm',
        message: 'Stemmer Dette?'
    })
    
    return answer.confirm
}

const getDay = async () => {
    const churchDay = await axios.get('https://kirkeåret.no/api/now')
    return churchDay.data[0].name
}

const getText = async (day) => {
    let churchDay
    const spinner = createSpinner(chalk.italic(`Henter Kirkeårstekster for ${day}...`))
    spinner.start()
    const query = encodeurl(day)
    const url = `https://kirkeåret.no/api/now/${query}`
    churchDay = await axios.get(url)
    spinner.success()

    churchDay = churchDay.data[0]

    return { 
        reading: churchDay.readings.currentReadings,
        name: churchDay.name
    }
}

export { newPodcast }
