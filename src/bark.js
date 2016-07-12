'use strict';

(function(global) {

	let Bark = global.Bark = {};

	Bark.VERSION = '0.1.0';

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
						throw 'WOOF: url property is not defined';
					}
					return fetch(this.url, {
						method: 'GET'
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
			className: ''
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
				defaults.elem.appendChild(tempElm);
			}
		};
	};

	/*
		Bark Template
		@returns string
	*/ 

	Bark.Template = function(strings, ...keys) {
		return function(data) {
			let temp = strings.slice();
			//function to walk through the object
			const retrieveNestedData = (key,objData) => {
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

	/*
		Bark Controller
		@constructor
		@params {object} options used for controller
		@returns {object}
	*/
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

})(window);