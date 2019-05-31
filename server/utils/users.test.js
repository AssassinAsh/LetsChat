const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Cersei',
            room: 'Lannister'
        }, {
            id: '2',
            name: 'Jaime',
            room: 'Lannister'
        }, {
            id: '3',
            name: 'Tyrion',
            room: 'Dwarf Lannister'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: "Ned",
            room: "Stark"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        var user = users.removeUser('1');
        expect(user.id).toEqual('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('5');
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it('should return a given user', () => {
        var user = users.getUser('3');
        expect(user.id).toEqual('3');

    });

    it('should not return a user', () => {
        var user = users.getUser('4');
        expect(user).toBeUndefined();
    });

    it('should return names of Lannisters', () => {
        var userList = users.getUserList('Lannister');
        expect(userList).toEqual(['Cersei', 'Jaime']);
    });

    it('should return names of Dwarf Lannisters', () => {
        var userList = users.getUserList('Dwarf Lannister');
        expect(userList).toEqual(['Tyrion']);
    });

});