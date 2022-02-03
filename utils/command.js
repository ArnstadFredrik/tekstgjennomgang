const formatReadings = ({ name, psalm, readings, day }) => {

    let readingsString = ''
    let readingsArray = []

    for (let text in readings.text) {
        if (text === 'F') break
        readingsString += `${text}: ${readings.text[text]}\n`
        readingsArray.push(`${text}: ${readings.text[text]}`)
    }

    const payload = `Tekstgjennomgang for ${day}, ved ${name}

Salme: ${psalm}

${`Tekster for ${readings.name}:`}
${readingsString}
`
    return { payload, readingsArray, readingsString }
}

export { formatReadings }
