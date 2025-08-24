module.exports = (sequelize, Sequelize) => {
    const Maestro = sequelize.define("maestro", {
        id_maestro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        dpi: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: "maestros",
        timestamps: false,
        underscored: true
    });
    return Maestro;
};