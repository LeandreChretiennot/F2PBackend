const User = require("../database/users")

const crudUser = {
    create: function(pseudo, password) {
        return new Promise(async resolve => {
            User.create({
                pseudo: pseudo,
                password: password
            })
                .catch(err => resolve(err))
                .then(user => {
                    resolve(user);
                })
        })
    },
    readAll: function() {
        return new Promise(resolve => {
            User.find({}).then(result => {
                resolve(result);
            });
        })
    }
}

module.exports = crudUser;