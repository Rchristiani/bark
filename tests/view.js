'use strict'

const Bark = require('../src/bark.js').Bark;
const expect = require('chai').expect;
const jsdom = require('jsdom-global')();

describe('View', () => {
	
	after(() => {
		jsdom();
	});
	
	it('should exist', () => {
		const newView = Bark.View();
		expect(newView).to.exist;
	});

	it('should render a template', () => {
		const newView = Bark.View({
			template: Bark.Template`<p></p>`()
		}).render();
		const elements = document.getElementsByTagName('p');
		expect(elements.length).to.be.eql(1);
	});

	it('should add an event', (done) => {
		const newView = Bark.View({
			template: Bark.Template`<p class="test">Testing</p>`(),
			events: {
				'click .test': 'handleClick'
			},
			handleClick: function() {
				expect(this.innerHTML).to.be.eql('Testing');
				expect(true);
				done();
			}
		}).render();

		document.querySelector('.test').click();
	});

	it('should throw an error for event with no selector', () => {
		const newView = Bark.View({
			template: Bark.Template`<p>Testing</p>`(),
			events: {
				'click .test': 'handleClick'
			}
		});

		expect(newView.render).to.throw(/WOOF: No selector for event/);
	});

});