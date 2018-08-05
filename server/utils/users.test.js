const expect = require('expect');

const {Users} = require('./users');

describe('Menggunakan Users Class', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Tino',
            room: 'Node'
        }, {
            id: '2',
            name: 'Tugi',
            room: 'React'
        }, {
            id: '3',
            name: 'Tiyo',
            room: 'Node'
        }]
    });

    ////// TEST CASE ... method removeUser()

    it('Harus menghapus user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Harus tidak menghapus user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    /////// ~~~~ TEST CASE getUser()
    it('Harus find / menemukan user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Harus not find / tidak menemukan user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });
    ////////~~~~~~ end



    it('seharusnya menambahkan user baru', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Tono', 
            room: 'Kantor Sekar'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });


    it('harus return name untuk NODE course', () => {
        var userList = users.getUserList('Node');
        expect(userList).toEqual(['Tino', 'Tiyo']);
    });

    it('harus return name untuk REACT course', () => {
        var userList = users.getUserList('React');
        expect(userList).toEqual(['Tugi']);
    });
});