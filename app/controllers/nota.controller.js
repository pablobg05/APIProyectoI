const db = require("../models");
const Nota = db.nota;
const Sequelize = require("sequelize");
const Op = db.Sequelize.Op;

// Crear y guardar una nueva nota
exports.create = (req, res) => {
    // Validar solicitud
    if (!req.body.id_curso || !req.body.id_estudiante || !req.body.modulo || !req.body.nota) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    // Crear una nota
    const nota = {
        id_curso: req.body.id_curso,
        id_estudiante: req.body.id_estudiante,
        modulo: req.body.modulo,
        nota: req.body.nota
    };

    // Guardar nota en la base de datos
    Nota.create(nota)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear la nota."
            });
        });
}

// Recuperar todas las notas de la base de datos.
exports.findNotas = (req, res) => {
    const id = req.query.id_nota;
    const modulo = req.query.modulo;
    const id_curso = req.query.id_curso;
    const id_estudiante = req.query.id_estudiante;

    let condition = {};

    if (id) {
        Nota.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `No se puede encontrar la nota con id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al recuperar la nota con id=" + id
                });
            });
        return;
    }

    if (modulo) {
        condition.modulo = { [Op.like]: `%${modulo}%` };
    }
    if (id_curso) {
        condition.id_curso = id_curso;
    }
    if (id_estudiante) {
        condition.id_estudiante = id_estudiante;
    }

    Nota.findAll({ where: condition })
        .then(data => {
            if (data > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "No se encontraron notas."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar las notas."
            });
        });
}

// Actualizar una nota por la id_nota en la solicitud
exports.update = (req, res) => {
    const id = req.params.id_nota;

    Nota.update(req.body, {
        where: { id_nota: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La nota fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la nota con id=${id}. Tal vez la nota no fue encontrada o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la nota con id=" + id
            });
        });
}

// Eliminar una nota con la id_nota especificada en la solicitud
exports.delete = (req, res) => {
    const id = req.params.id_nota;

    Nota.destroy({
        where: { id_nota: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La nota fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la nota con id=${id}. Tal vez la nota no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la nota con id=" + id
            });
        });
}