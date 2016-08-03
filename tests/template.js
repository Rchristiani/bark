'use strict'

const Bark = require('../src/bark.js').Bark;
const expect = require('chai').expect;
const jsdom = require('jsdom-global');

describe('Template', () => {
	
	it('should create a template', () => {
		const newTemplate = Bark.Template`<div>
			<h2>Template Test</h2>
		</div>`;
		expect(newTemplate).to.be.a('function');
	});

	it('should fill in data', () => {
		const newTemplate = Bark.Template`<div>
			<h2>${'text'}</h2>
		</div>`;
		const compiledTemplate = newTemplate({
			text: 'Template Test'
		});
		
		expect(compiledTemplate).to.match(/Template Test/);
	});

	it('should render data from an array', () => {
		const newTemplate = Bark.Template`
			<div>
				<h2>${$ => $[0]}</h2>
			</div>
		`;

		const compiledTemplate = newTemplate(['Array data test']);

		expect(compiledTemplate).to.match(/Array data test/);
	});

	it('should accept a mapped array as output', () => {
		const newTemplate = Bark.Template`
			<div>
				<h2>${$ => $.map(el => `<li>${el}</li>`)}</h2>
			</div>
		`;

		const compiledTemplate = newTemplate(['data', 'test']);

		expect(compiledTemplate).to.not.match(/\,/);
	});

});