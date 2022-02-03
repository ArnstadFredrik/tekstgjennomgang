import meow from 'meow';
import meowHelp from 'cli-meow-help';
import os from 'os'

const home = os.homedir()

const flags = {
    name: {
        type: 'string',
        alias: 'w',
        desc: 'Hvem har tekstgjennomgangen?',
        name: 'Lærer'
    },
    psalm: {
        type: 'string',
        alias: 's',
        desc: 'Hvilken salme ble brukt?',
        name: 'Salme'
    },
    day: {
        type: 'string',
        alias: 'n',
        desc: 'Kirkeårsdag for tekstgjennomgangen',
        name: 'Kirkeårsdag'
    },
    audio: {
        type: 'string',
        alias: 'a',
        desc: 'Opptaket av tekstgjennomgangen',
        name: 'Audio'
    },
    path: {
        type: 'string',
        alias: 'p',
        desc: 'Sti til prosjekt mappen.',
        name: 'Prosjekt mappe',
        default: process.env.TEKSTGJENNOMGANG_PATH || `${home}/tekstgjennomgang`,
    },
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
};

const commands = {
	help: { desc: `Print help info` },
    ny: { desc: 'Lag ny podkast episode. Ved ingen cmd, vil ny brukes automatisk'},
    path: { desc: 'Print current path' }
};

const helpText = meowHelp({
	name: `tekstgjennomgang`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export { flags }

export default meow(helpText, options);
