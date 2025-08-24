const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.curso = require("./curso.model.js")(sequelize, Sequelize);
db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.maestro = require("./maestro.model.js")(sequelize, Sequelize);
db.grado = require("./grado.model.js")(sequelize, Sequelize);

// Relacion maestro-grado 1:1
db.maestro.hasOne(db.grado, {
        foreignKey: 'id_maestro',
        as: 'grado',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    });
db.grado.belongsTo(db.maestro, {
        foreignKey: 'id_maestro'
    });

module.exports = db;