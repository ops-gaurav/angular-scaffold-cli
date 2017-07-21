/**
 * @desc the builder for the application. The builder builds the angular 2 components automatically
 * @author gaurav sharma
 */
const path = require('path');
const fs = require('fs');
const konsole = require('../services/konsole.js');
const prompt = require('prompt');

const templatesResolver = require('./templates-resolver.js');

module.exports = {
	/**
	 * @desc this funciton handles the component creation
	 * @param {String} targetFolder repreenting the absolute path to creaet service in
	 * @param {String} componentName representing the name of the component to create
	 * @author gaurav sharma
	 */
	createComponent: (targetFolder, componentName) => {
		// create ts file first
		// read the compoennt file template
		var tsComponent = templatesResolver.forComponent(componentName);

		let componentFilePath = path.resolve(targetFolder, componentName.charAt(0).toUpperCase() + componentName.substring(1, componentName.length));
		if (fs.existsSync(componentFilePath)) {
			konsole.yellow('there already exists a component with name ' + componentName + '. Do you want to override? (y/n): ');

			prompt.start();
			prompt.get(['choice'], (err, result) => {
				if (err) {
					console.log(err);
					return -1;
				} else {
					switch (result.choice.toLowerCase()) {
						case 'y':
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.ts'), tsComponent);
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.html'), templatesResolver.forHTML());
							fs.writeFileSync(path.resolve(componentFilePath, componentName.toLowerCase() + '.component.css'), templatesResolver.forCSS());

							konsole.blue('Overwritten a component ' + componentName);
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

			konsole.blue('Created a component ' + componentName);
		}
		// fs.writeFileSync (componentFilePath, tsComponent);
	},
	/**
	 * @desc method to create a new service in the angular project
	 * @param {String} targetFolder the folder to create the service in
	 * @param {String} serviceName the name of the service	 
	 * @author gaurav sharma
	 * */
	createService: (targetFolder, serviceName) => {
		let serviceSource = templatesResolver.forService(serviceName);
		let serviceFilePath = path.resolve(targetFolder, serviceName.toLowerCase() +'.service.ts');

		if (fs.existsSync(serviceFilePath)) {
			konsole.yellow('There is already a service with the name ' + serviceName + '. Do you want to override it? (y/n) ');

			prompt.start();
			prompt.get(['choice'], (err, result) => {
				if (err) {
					console.log(err);
					return -1;
				} else {
					switch (result.choice.toLowerCase()) {
						case 'y':
							fs.writeFileSync(path.resolve(serviceFilePath), serviceSource);
							konsole.blue('Overwritten a component ' + serviceName);
							break;
						case 'n':
							konsole.green('Bypassing the service creation..');
							return -1;
						default:
							konsole.green('Ternimating process...');
							return -1;
					}
				}
			});
		} else {
			fs.writeFileSync(path.resolve(serviceFilePath), serviceSource);
			konsole.blue('Created a new component ' + serviceName);
		}
	},

	/**
	 * @desc method to create a new facade in the angular project
	 * @param {String} targetFolder represents the folder to create service in
	 * @param {String} facadeName represents the name of the facade to create
	 * @author gaurav sharma 
	 */
	createFacade: (targetFolder, facadeName) => {
		let facadeSource = templatesResolver.forFacade (facadeName);
		let facadeFilePath = path.resolve (targetFolder, facadeName.toLowerCase() +'.facade.ts');

		if (fs.existsSync (facadeFilePath)) {
			konsole.yellow ("There is already a facade with the name "+ facadeName +". Do you want to overwrite it? (y/n) ");

			prompt.start();
			prompt.get (['choice'], (err, result) => {
				if (err) {
					console.log (err);
					return -1;
				} else {
					switch (result.choice.toLowerCase()) {
						case 'y':
							fs.writeFileSync (path.resolve (facadeFilePath), facadeSource);
							konsole.blue ('Overwritten facade '+ facadeName);
							break;
						case 'n':
							konsole.green ('Bypassing the facade creation...');
							return -1;
						default:
							konsole.green ('Terminating process...');
					}
				}
			})
		} else {
			fs.writeFileSync (path.resolve (facadeFilePath), facadeSource);
			konsole.blue ('Created a new facade '+ facadeName);
		}
	}
};