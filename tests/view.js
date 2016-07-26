'use strict'

const Bark = require('../src/bark.js').Bark;
const expect = require('chai').expect;
const jsdom = require('jsdom-global')();

describe('View', () => {
	
	it('should exist', () => {
		const newView = Bark.View();
		
		expect(newView).to.exist;
	});

});