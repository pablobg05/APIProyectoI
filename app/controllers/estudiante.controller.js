const db = require("../models/index.js");
const Estudiante = db.estudiante;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.cui || !req.body.carnet) {
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

exports.findAll = (req, res) => {
    Estudiante.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving estudiantes."
        });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Estudiante.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Estudiante with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Estudiante with id=" + id
        });
        });
}

exports.findByName = (req, res) => {
    const nombre = req.params.nombre;
    Estudiante.findAll({ where: { nombre: { [Op.like]: `%${nombre}%` } } })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving estudiantes."
        });
        });
}

exports.findAllByGrado = (req, res) => {
    const id_grado = req.params.id_grado;
    Estudiante.findAll({ where: { id_grado: id_grado } })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving estudiantes."
        });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;
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
    const id = req.params.id;
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