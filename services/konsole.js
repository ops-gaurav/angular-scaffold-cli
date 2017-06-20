const chalk = require ('chalk');

module.exports = {
	bgRed: (message) => {
		console.log (chalk.bgRed(message));
	},
	red: (message) => {
		console.log (chalk.red (message));
	},
	bgBlue: (message) => {
		console.log (chalk.bgBlue (message));
	},
	blue: (message) => {
		console.log (chalk.blue (message));
	},
	bgYellow: (message) => {
		console.log (chalk.bgYellow (message));
	},
	yellow: (message) => {
		console.log (chalk.yellow (message));
	},
	bgGreen: (message) => {
		console.log (chalk.bgGreen (message));
	},
	green: (message) => {
		console.log (chalk.green (message));
	}
}