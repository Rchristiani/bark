'use strict'
const Bark = require('../src/bark.js').Bark;
const expect = require('chai').expect;
const jsdom = require('jsdom-global');
require('isomorphic-fetch');

describe('Bark Model', () => {


	it('should exist',() => {
		expect(Bark).to.be.an('object');
		expect(Bark.Model).to.exist;
	});

	it('should create a new model', () => {
		const newModel = Bark.Model({
			url: 'http://test.com'
		});
		expect(newModel).to.be.an('object');
		expect(newModel).to.have.any.keys('attrs','fetch');
	});

	it('should throw an error if no url', (done) => {
		const newModel = Bark.Model({});
		newModel
			.fetch()
			.catch((err) => {
				expect(err).to.be.eql('WOOF: url property is not defined')
				done();
			});
	});

	it('should fetch data', (done) => {
		const newModel = Bark.Model({
			url: 'https://api.icndb.com/jokes/random'
		});

		newModel
			.fetch()
			.then(() => {
				expect(newModel.attrs).to.be.an('object');
				expect(newModel.attrs).to.have.keys('type','value');
				done();
			});
	});

});