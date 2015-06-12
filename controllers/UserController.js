var UserModel = require('../models/UserModel');

var UserController = {
    getUserById: function (id, callback) {

        UserModel.findOne({
            '_id': id
        }, function (err, user) {
            if (err) return console.error(err);
            callback(user);
        });
    },
    getUserByEmail: function (email, callback) {

        UserModel.findOne({
            'email': email
        }, function (err, user) {
            if (err) return console.error(err);
            callback(user);
        });
    }
};

module.exports = UserController;