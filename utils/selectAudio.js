import inquirer from 'inquirer'
import { readdir } from 'fs/promises'
import { globby } from 'globby'
import path from 'path'

const getFiles = async (directory) => {
    const files = await globby(`/Volumes/${directory}`)
    return files
} 

const getDir = async () => {
    const volumeDir = await readdir('/Volumes')
    const volumes = []

    for (const dir of volumeDir) {
        if (dir != 'Mac Harddisk')
        if (!dir.match(/^Google/))
        volumes.push(dir)
    }

    return volumes
}

const selectAudio = async () => {
    const volumes = await getDir()

    const input = await inquirer.prompt({
        name: 'volume',
        type: 'list',
        choices: volumes,
    })
    
    const filesGlob = await getFiles(input.volume)
    const files = []

    for (const file of filesGlob) {
        files.push({
            name: path.basename(file),
            path: file
        })
    }

    const askForFile = await inquirer.prompt({
        name: 'audio',
        type: 'list',
        choices: files
    })
    
    const audioFile = files.find(file => file.name === askForFile.audio)

    return audioFile
}

export default selectAudio
