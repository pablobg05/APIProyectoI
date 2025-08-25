const db = require("../models");
const Admin = db.admin;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.usuario || !req.body.nombre || !req.body.email || !req.body.password) {
        res.status(400).send({
        message: "Content cannot be empty!"
        });
        return;
    }
    
    const admin = {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    };
    
    Admin.create(admin)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Admin."
        });
        });
}

exports.findAll = (req, res) => {
    Admin.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Admin.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Admin with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the Admin."
        });
        });
}

exports.findByName = (req, res) => {
    const nombre = req.params.nombre;
    Admin.findAll({ where: { nombre: { [Op.like]: `%${nombre}%` } } })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;
    Admin.update(req.body, {
        where: { id_admin: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Admin was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Admin."
        });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Admin.destroy({
        where: { id_admin: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Admin was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Admin."
        });
        });
}