module.exports = (sequelize, Sequelize) => {
    const nota = sequelize.define("nota", {
        id_nota: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_curso: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'cursos',
                key: 'id_curso'
            }
        },
        id_estudiante: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'estudiantes',
                key: 'id_estudiante'
            }
        },
        modulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nota: {
            type: Sequelize.FLOAT,
            allowNull: false
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

    }, {
        tableName: 'notas',
        timestamps: false
    });
    return nota;
};