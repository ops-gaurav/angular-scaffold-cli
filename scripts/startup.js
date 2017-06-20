#! /usr/bin/env node

const consoleMenu = require('console-menu');
const chalk = require('chalk');
const childProcess = require('child_process');
const path = require('path');
const konsole = require ('../services/konsole.js');

const structureAnalyzer = require('../services/analyze-scaffold-ng2-structure');

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