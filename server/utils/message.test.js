var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Arya';
        var text = 'Winter came for the Dead.';

        var res = generateMessage(from, text);
        expect(res).toMatchObject({from, text})
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Arya';
        var lat = 0;
        var long = 0;

        var res = generateLocationMessage(from, lat, long);
        expect(res.from).toEqual('Arya');
        expect(res.url).toEqual('https://www.google.com/maps?q=0,0');
        expect(typeof res.createdAt).toBe('number');

    });
});