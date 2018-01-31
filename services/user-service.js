var bCrypt = require('bcrypt-nodejs');
var userDAO = require('../config/connectdb').users;
module.exports = {
    
    findById: function (id, getOutFunc) {
        userDAO.findById(id, {
            raw: true
        }).then(user => {
            if (user) {
                getOutFunc(null, user);
            } else {
                getOutFunc(user.errors, null);
            }
        })
    },
    findOne: function (email, getOutFunc) {
        userDAO.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                getOutFunc(true, user);
            } else {
               getOutFunc(false, null)
            }
        });
    },
    create: function (data, getOutFunc) {
        userDAO.create(data).then(newUser => {
            if (!newUser) {
                getOutFunc(false, null);
            }

            if (newUser) {
                getOutFunc(true, newUser);
            }
        })
    }

}