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
exports.findGrados = (req, res) => {
    const id = req.query.id_grado;

    let condition = id ? { id_grado: id } : null;

    Grado.findAll({ where: condition })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: id
                        ? `No se puede encontrar el grado con id=${id}.`
                        : "¡No se encontraron grados!"
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "¡Ocurrió un error al recuperar los grados!"
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