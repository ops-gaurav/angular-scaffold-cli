/**
 * the logger definition
 */
const winston = require ('winston');

let logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({filename: 'angular-scaffolder.log'})
	]
});

module.exports = logger;