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
        dpi: req.body.dpi,
        password: req.body.password
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

exports.findMaestros = (req, res) => {
    const id = req.query.id_maestro;
    const nombre = req.query.nombre;

    let condition = {};

    if (id) {
        Maestro.findByPk(id)
            .then(data => {
                if (data.length > 0) {
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
        return;
    }

    if (nombre) {
        condition.nombre = { [Op.like]: `%${nombre}%` };
    }

    Maestro.findAll({ where: condition })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "No maestros found."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving maestros."
            });
        });
};

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