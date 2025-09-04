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
exports.findAll = (req, res) => {
    const id_curso = req.query.id_curso;
    var condition = id_curso ? { id_curso: { [Op.eq]: `${id_curso}` } } : null;

    Nota.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar las notas."
            });
        });
}

// Encontrar una sola nota con una id_nota
exports.findOne = (req, res) => {
    const id = req.params.id_nota;

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
}

//Encontrar todas las notas de un curso por la id_estudiante
exports.findByEstudiante = (req, res) => {
    const id_estudiante = req.params.id_estudiante;

    Nota.findAll({ where: { id_estudiante: { [Op.eq]: `${id_estudiante}` } } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se pueden encontrar notas para el estudiante con id=${id_estudiante}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar las notas para el estudiante con id=" + id_estudiante
            });
        });
}

// Encontrar todas las notas de un estudiante por la id_estudiante y modulo
exports.findByEstudianteAndModulo = (req, res) => {
    const id_estudiante = req.params.id_estudiante;
    const modulo = req.params.modulo;

    Nota.findAll({ where: { id_estudiante: { [Op.eq]: `${id_estudiante}` }, modulo: { [Op.eq]: `${modulo}` } } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se pueden encontrar notas para el estudiante con id=${id_estudiante} en el módulo ${modulo}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar las notas para el estudiante con id=" + id_estudiante + " en el módulo " + modulo
            });
        });
}

// Encontrar todas las notas de un curso por la id_curso
exports.findByCurso = (req, res) => {
    const id_curso = req.params.id_curso;

    Nota.findAll({ where: { id_curso: { [Op.eq]: `${id_curso}` } } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se pueden encontrar notas para el curso con id=${id_curso}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar las notas para el curso con id=" + id_curso
            });
        });
}

// Encontrar todas las notas de un curso por la id_curso y modulo
exports.findByCursoAndModulo = (req, res) => {
    const id_curso = req.params.id_curso;
    const modulo = req.params.modulo;

    Nota.findAll({ where: { id_curso: { [Op.eq]: `${id_curso}` }, modulo: { [Op.eq]: `${modulo}` } } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se pueden encontrar notas para el curso con id=${id_curso} en el módulo ${modulo}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar las notas para el curso con id=" + id_curso + " en el módulo " + modulo
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