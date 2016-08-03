'use strict';

(function(global) {

	let Bark = {};

	Bark.VERSION = '0.2.0';

	/*
	*	Bark Model
	*	@constructor 
	*	@params {object} Options object
	*	@returns {object}
	*/
	Bark.Model = function(options) {
		let defaults = {
			attrs: {},
			fetch(cb) {
				return new Promise((resolve,reject) => {
					if(this.url === undefined) {
						reject('WOOF: url property is not defined');
					}
					return fetch(this.url, {
						method: 'GET',
					})
					.then((res) => {
						res.json()
							.then(data => {
								this.attrs = data;
								resolve();
							});
					})
					.catch(err => reject(err) );
				});
			}
		};

		Object.assign(defaults,options);
		
		return defaults;
	};

	/*
		Bark View
		@constructor
		@params {object} options used for view
		@returns {object}
	*/
	Bark.View = function(options) {
		let defaults = {
			elem: document.body,
			elemType: 'div',
			className: '',
			events: {}
		};

		let eventHandler = function(events,element) {
			//loop through event keys
			let eventKeys = Object.keys(events);
			for(let key of eventKeys) {
				//Apply events.
				let [eventName, eventSelector] = key.split(' ');
				let eventElement = element.querySelector(eventSelector);
				if(!eventElement) {
					throw new Error('WOOF: No selector for event');
				}
				eventElement.addEventListener(eventName,defaults[events[key]]);
			}
		};

		Object.assign(defaults,options);

		return {
			render() {
				if(defaults.template === undefined) {
					throw 'WOOF: No template defined';
				}
				let tempElm = document.createElement(defaults.elemType);
				if(defaults.className.length > 0) {
					tempElm.className = defaults.className;
				}
				tempElm.innerHTML = defaults.template;
				eventHandler(defaults.events,tempElm);
				defaults.elem.appendChild(tempElm);
			}
		};
	};

	// /*
	// 	Bark Template
	// 	@returns string
	// */ 

	Bark.Template = function(strings, ...keys) {
		return function(data) {
			let temp = strings.slice();
			//function to walk through the object
			const retrieveNestedData = (key,objData) => {
				//If function is passed, call it with the data
				if(typeof key === 'function') {
					//Convert anything returned to a string
					//Replace , if data was a mapped array
					return key(objData).toString().replace(/\,/,'');
				}
				//Split string on keys
				let nested = key.split('.');
				//If there is more than one key
				if(nested.length > 1) {
					//Call self again with next key, and selected data
					return retrieveNestedData(nested[1],objData[nested[0]])
				}
				else {
					// Else just return string
					return objData[key];
				}
			} 
			keys.forEach((key, i) => {
				let replaceString = retrieveNestedData(key,data);
				temp[i] = temp[i] + replaceString;
			});
			return temp.join('');
		}
	};

	// /*
	// 	Bark Controller
	// 	@constructor
	// 	@params {object} options used for controller
	// 	@returns {object}
	// */
	Bark.Controller = function(options) {
		let defaults = {
			init() {
				//Nothing to see here
			}
		};
		Object.assign(defaults,options);
		defaults.init();
		return defaults 
	};
	global.Bark = Bark;

})(typeof exports === 'undefined' ? window : exports);