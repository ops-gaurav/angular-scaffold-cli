/**
 * @desc the module to analyze the directory structure of the application
 * @author gaurav sharma
 */
const path = require('path');
const fs = require('fs');	
// for logging
const logger = require ('./logging-service.js');

// let exports = module.exports = {};

// analyze this directory structure
var directoryStructure= {
	src: {
		app: {
			"app-routing.module.ts": "typescript",
			"app.module.ts": "typescript",
			"main.ts": "typescript"
		},
		"index.html": "html",
		"index.ts": "typescript",
		"styles.css": "stylesheet"
	},
	"package.json": "json",
	"tsconfig.json": "json",
	"webpack.config.js": "javascript"
};

/**
 * this function will analyze the scaffold directory sturcture 
 * The builder can only continue the build process,once it validates that the current folder is 
 * a valid es6-basecamp-angular folder. 
 */
module.exports.analyzeScaffoldDirectoryStructure = () => {
	let projectPath = path.resolve();
	
	let validDirectory = this.analyzePathSync (projectPath, directoryStructure);

	// check the package.json file for the source stamp to varify the application source
	
	var fileData = JSON.parse(fs.readFileSync (path.resolve (projectPath, 'package.json')));
	
	if (fileData.source !== 'es6-basecamp-ng2-webpack') {
		validDirectory = false;
		logger.log ('info', 'Repository source stamp failed');
	} 
	
	if (validDirectory) logger.log ('info', 'Directory validated');
	else logger.log ('info', 'Directory  not validated');
	return validDirectory;
}

/**
 * recursive function to derive the directory structure and validate it
 */
module.exports.analyzePathSync =(absPath, pathObject) => {
	let validDirectory = true;
	
	for (file in pathObject) {
		if (typeof pathObject[file] == 'object') {
			return this.analyzePathSync (path.resolve (absPath, file), pathObject[file]);
		}else {
			var dir = path.resolve (absPath, file);
			if (!fs.existsSync (dir)) {
				return !validDirectory;
			}
		}
	}
	return validDirectory;
}