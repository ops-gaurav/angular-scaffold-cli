const path = require('path');
const fs = require('fs');
const konsole = require('../services/konsole.js');
const prompt = require('prompt');

const templatesResolver = require('./templates-resolver.js');

module.exports = {
	/**
	 * this funciton handles the component creation
	 * @author gaurav sharma
	 */
	createComponent: (targetFolder, componentName) => {
		// create ts file first
		// read the compoennt file template
		var tsComponent = templatesResolver.forComponent(componentName);

		let componentFilePath = path.resolve(targetFolder, componentName.charAt(0).toUpperCase() + componentName.substring(1, componentName.length));
		if (fs.existsSync(componentFilePath)) {
			console.log('folder exists');
			konsole.yellow('there already exists a component with name ' + componentName + '. Do you want to override? (y/n): ');

			prompt.start();
			prompt.get(['choice'], (err, result) => {
				if (err) {
					console.log(err);
					return -1;
				} else {
					console.log('You prompt: ' + result.choice);
					switch (result.choice.toLowerCase()) {
						case 'y':
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.ts'), tsComponent);
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.html'), templatesResolver.forHTML());
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.css'), templatesResolver.forCSS());

							konsole.blue ('Created a new component '+ componentName);
							break;
						case 'n':
							konsole.green('Terminating process..');
							break;
						default:
							konsole.green('Terminating process..');
					}
				}
			})
		} else {
			fs.mkdirSync(componentFilePath);
			fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.ts'), tsComponent);
			fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.html'), templatesResolver.forHTML());
			fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.css'), templatesResolver.forCSS());

			konsole.blue ('Overridden a component '+ componentName);
		}
		// fs.writeFileSync (componentFilePath, tsComponent);
	}
};