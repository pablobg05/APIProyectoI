const db = require("../models");
const Maestro = db.maestro;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.telefono || !req.body.direccion || !req.body.email || !req.body.dpi) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const maestro = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email,
        dpi: req.body.dpi
    };

    Maestro.create(maestro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Maestro."
            });
        });
}

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {
        nombre: {
            [Op.like]: `%${nombre}%`
        }
    } : null;

    Maestro.findAll({
            where: condition,
            include: [{
                model: db.grado,
                as: 'grado'
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving maestros."
            });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id_maestro;

    Maestro.findByPk(id, {
            include: [{
                model: db.grado,
                as: 'grado'
            }]
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Maestro with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Maestro with id=" + id
            });
        });
}

exports.findByName = (req, res) => {
    const nombre = req.params.nombre;

    Maestro.findOne({
            where: {
                nombre: nombre
            },
            include: [{
                model: db.grado,
                as: 'grado'
            }]
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Maestro with nombre=${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Maestro with nombre=" + nombre
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id_maestro;

    Maestro.update(req.body, {
            where: {
                id_maestro: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Maestro was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Maestro with id=${id}. Maybe Maestro was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Maestro with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id_maestro;

    Maestro.destroy({
            where: {
                id_maestro: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Maestro was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Maestro with id=${id}. Maybe Maestro was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Maestro with id=" + id
            });
        });
}