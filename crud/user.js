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
            User.find({})
                .then(result => {
                    resolve(result);
                });
        })
    },
    readOne: function(params) {
        return new Promise(resolve => {
            User.findOne({ pseudo: params.pseudo })
                .then(result => {
                    if (result && params.password)
                    {
                        if (!result.authenticate(params.password))
                        {
                            resolve("Password incorect");
                            return
                        }
                        
                        // result = {
                        //     _id: result.id,
                        //     pseudo: result.pseudo
                        // }
                    }
                    resolve(result);
                })
        })
    }
}

module.exports = crudUser;