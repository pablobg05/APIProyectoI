const db = require("../models");
const Maestro = db.maestro;
const Grado = db.grado;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo grado
exports.create = (req, res) => {
    // Validar solicitud
    if (!req.body.id_maestro) {
        res.status(400).send({
            message: "¡El contenido no puede estar vacío!"
        });
        return;
    }

    // Crear un grado
    const grado = {
        id_maestro: req.body.id_maestro,
        nombre: req.body.nombre
    };

    // Guardar grado en la base de datos
    Grado.create(grado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "¡Ocurrió un error al crear el grado!"
            });
        });
}

// Recuperar todos los grados de la base de datos.
exports.findAll = (req, res) => {
    Grado.findAll({ include: [{ model: Maestro, as: 'maestro' }] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "¡Ocurrió un error al recuperar los grados!"
            });
        });
}

// Encontrar un solo grado con una id
exports.findById = (req, res) => {
    const id = req.params.id_grado;

    Grado.findByPk(id, { include: [{ model: Maestro, as: 'maestro' }] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el grado con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el grado con id=" + id
            });
        });
}

// Actualizar un grado por la id en la solicitud
exports.update = (req, res) => {
    const id = req.params.id_grado;

    Grado.update(req.body, {
        where: { id_grado: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El grado se actualizó correctamente!"
                });
            } else {
                res.send({
                    message: `No se puede actualizar el grado con id=${id}. ¡Quizás el grado no se encontró o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el grado con id=" + id
            });
        });
}

// Eliminar un grado con la id especificada en la solicitud
exports.delete = (req, res) => {
    const id = req.params.id_grado;

    Grado.destroy({
        where: { id_grado: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El grado se eliminó correctamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el grado con id=${id}. ¡Quizás el grado no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el grado con id=" + id
            });
        });
}