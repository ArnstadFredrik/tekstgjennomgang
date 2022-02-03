#!/usr/bin/env node

/**
 * tekstgjennomgang
 * Ordner filer og info for tekstgjennomgang av søndagens tekst ved VID
 *
 * @author Fredrik Arnstad <github.com/ArnstadFredrik>
 */

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js'
import { newPodcast } from './utils/handleCommand.js'
import chalk from 'chalk'

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });

input.includes(`help`) && cli.showHelp(0);

if (input.includes('path')) {
    const base_path = flags.path
    console.log(chalk.bold('Current Path:'),base_path)
}

if (input.includes('ny') || input.length === 0)  {
    newPodcast(flags)
}

debug && log(flags);
