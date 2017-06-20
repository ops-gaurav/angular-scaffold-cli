/**
 * teh templates resolved function
 * @author gaurav sharma
 */
module.exports = {
	forComponent: (component) => {
		return "" 
			+"import { Component, OnInit } from '@angular/core'\n"
			+"\n"
			+"@Component({\n"
			+"\tselector: '"+ component.toLowerCase() +"',\n"
			+"\ttemplateUrl: './"+ component.toLowerCase() +".component.html',\n"
			+"\tstyleUrls: ['./"+ component.toLowerCase() +".component.css']\n"
			+"})\n"
			+"export class "+ component.charAt(0).toUpperCase()+ component.substring(1, component.length)  +"Component implements OnInit {\n"
			+"\n"
			+"\tpublic title: String = 'sample title';\n"
			+"\tconstructor () {}\n"
			+"\n"
			+"\tpublic ngOnInit () {}\n"
			+"}";
	},

	forHTML: () => {
		return "{{title}}"
	},

	forCSS: () => {
		return "* {\n\tpadding: 0\n\tmargin: 0\n}";
	}
}