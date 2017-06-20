#! /usr/bin/env node

const consoleMenu = require('console-menu');
const chalk = require('chalk');
const childProcess = require('child_process');
const path = require('path');
const konsole = require ('../services/konsole.js');
const fs = require ('fs');

const structureAnalyzer = require('../services/analyze-scaffold-ng2-structure');
const builder = require ('../services/create-items.js');

let spawn = childProcess.spawn;

if (process.argv.length > 2) {
	var args = process.argv[2];
	// console.log(args);
	switch (args.toLowerCase()) {
		case "create":
			// currently support only for the generate
			let make = process.argv[3] || '';
			switch (make.toLowerCase()) {
				case 'component':
					// console.log('making component');

					if (structureAnalyzer.analyzeScaffoldDirectoryStructure()){
						konsole.green ('directory validated');
						if (process.argv[4]) {
							let componentName = process.argv[4];
							let componentFolder = path.resolve ('src', 'app', 'Components');
							if (!fs.existsSync (componentFolder)) {
								fs.mkdirSync();
							}

							builder.createComponent (componentFolder, componentName);

						} else {
							konsole.red ('Need to define component name')
						}
					} else {
						konsole.red ('Directory not validated. Check structure and package.json for source stamp');
					}
					break;
				case 'facade':
					console.log('making new facade');
					break;
				case 'service':
					console.log('making new service');
					break;
				default:
					console.log('doing nothing');
					break;
			}
			break;
		default:
			console.log('terminating');
			break;
	}
} else {
	
}