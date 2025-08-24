module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define("curso", {
        id_curso: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: "cursos",
        timestamps: false,
        underscored: true
    });
}