module.exports = (sequelize, Sequelize) => {
    const Grado = sequelize.define("grado", {
        id_grado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_maestro: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'maestros',
                key: 'id_maestro',

                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        nombre: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Grado;
}