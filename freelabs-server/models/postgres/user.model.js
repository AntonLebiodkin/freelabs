var bcrypt = require('bcrypt');
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isUnique: function (value, next) {
                    User.find({
                        where: {username: value},
                        attributes: ['id']
                    }).done(function (error, user) {
                        if (error)
                        // Some unexpected error occured with the find method.
                            return next(new Error(error.message));
                        if (user)
                        // We found a user with this username.
                        // Pass the error to the next method.
                            return next(new Error('Username is already exists!'));
                        // If we got this far, the username hasn't been used yet.
                        // Call next with no arguments when validation is successful.
                        next();
                    });
                }
            }
        },
        password: Sequelize.STRING,
        permission: Sequelize.INTEGER
    },{
        instanceMethods: {
            verifyPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });


    return User;
};
