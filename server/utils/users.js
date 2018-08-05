/// creating array


[{
    id: '/#12id832389ur8r32',
    name: 'Tono',
    room: 'Kantor Sekar'
}]


/////// peggunaan method pada class
    // addUser(id, name, room)
    // removeUser(id)
    // getUser(id)
    // getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    // create users method
    addUser(id, name, room){
        var user = {
            id, name, room
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user yang telah dihapus  --- salah gaweanku... ngisor iki looo
        // var user = {id, name, room};
        // this.users.pop(user.id);
        // return user;

        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        // get all user
        // ['Tono', 'Jen', 'Calo']
        var users = this.users.filter((user) => user.room === room );
        var namesArray = users.map((user) => user.name );

        return namesArray;
    }
}

// export class
module.exports = {Users};



//// karena ini tidak efisien maka membuat CLASSES
// new Person
/// new Object 
// create class
/*
class Person {
    constructor(name, age) {
        // this is a function // apa yang dilakukan disini
        console.log(`Namanya adalah ${name} dan umurnya adalah ${age}`)
        this.name = name;  // this reference to instance
        this.age = age;
    }

    // creating method
    getUserDescription () {
        return `${this.name} is ${this.age} years old`;
    }
}

// membuat instance class
var me = new Person('Tono', 25);
console.log('this.name: ', me.name);
console.log('this.age: ', me.age);
var description = me.getUserDescription();
console.log(desscription);
*/


// var users = [];

// var addUser = (id, name, room) => {
//     users.push({});
// }



// module.exports = {
//     addUser
// }