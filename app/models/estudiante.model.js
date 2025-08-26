module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("estudiante", {
        id_estudiante: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_grado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'grados',
                key: 'id_grado',

                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        encargado: {
            type: Sequelize.STRING,
            allowNull: true
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: true
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: true
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        cui: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true
        },
        fecha_nacimiento: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        tableName: "estudiantes",
        timestamps: false,
        underscored: true
    });
    return Estudiante;
}