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
                key: 'id_curso',

                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        id_estudiante: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'estudiantes',
                key: 'id_estudiante',

                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
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
    }, {
        tableName: 'notas',
        timestamps: false
    });
    return nota;
};