var expect = require('expect');
var {generateMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Arya';
        var text = 'Winter came for the Dead.';

        var res = generateMessage(from, text);
        expect(res).toMatchObject({from, text})
        expect(typeof res.createdAt).toBe('number');
    });
});