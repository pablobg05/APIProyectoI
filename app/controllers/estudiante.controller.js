const db = require("../models/index.js");
const Estudiante = db.estudiante;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.cui) {
        res.status(400).send({
        message: "Content cannot be empty!"
        });
        return;
    }
    
    const estudiante = {
        nombre: req.body.nombre,
        encargado: req.body.encargado,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        correo: req.body.correo,
        cui: req.body.cui,
        fecha_nacimiento: req.body.fecha_nacimiento,
        tipo: req.body.tipo
    };
    
    Estudiante.create(estudiante)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Estudiante."
        });
        });
    }

exports.findEstudiantes = (req, res) => {
    const id = req.query.id_estudiante;
    const nombre = req.query.nombre;
    const grado = req.query.grado;

    let condition = {};

    if (id) {
        Estudiante.findByPk(id)
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Estudiante with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Estudiante with id=" + id
            });
        });
        return;
    }

    if (nombre) {
        condition.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (grado) {
        condition.grado = { [Op.like]: `%${grado}%` };
    }

    Estudiante.findAll({ where: condition })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "No students found matching the criteria."
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving students."
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id_estudiante;
    Estudiante.update(req.body, {
        where: { id_estudiante: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Estudiante was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Estudiante with id=${id}. Maybe Estudiante was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Estudiante with id=" + id
        });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id_estudiante;
    Estudiante.destroy({
        where: { id_estudiante: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Estudiante was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Estudiante with id=${id}. Maybe Estudiante was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Estudiante with id=" + id
        });
        });
}