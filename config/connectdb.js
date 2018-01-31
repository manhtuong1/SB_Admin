'use strict'

const Sequelize = require('sequelize');
const env = require('./database').development;
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    define: {
        underscored: true
    }
});



// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables

db.users = require('../models/users.js')(sequelize, Sequelize);
db.comments = require('../models/comments.js')(sequelize, Sequelize);
db.posts = require('../models/posts.js')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

module.exports = db;