//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var userService = require('../services').user_service;

module.exports = function (passport) {
    var user = require('../config/connectdb').users;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        userService.findById(id, function (status, user) {
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            if (req.body.password !== req.body.confirmPassword) {
                return done(null, false, {
                    message: 'Password does not match!'
                });
            }
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            userService.findOne(email, function (status, user) {
                console.log(user);
                if (status) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name
                    };


                    userService.create(data, function (status, newUser) {
                        if (!status) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    })
                }
            });
        }));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            userService.findOne(email, function (message, user) {
                if (!user) {
                    return done(null, false, message);
                }
                if (!isValidPassword(user.password, password)) {
                    message2 = 'Incorrect password.';
                    return done(null, false, message2);
                }
                return done(null, user);
            })
        }
    ));
};