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

exports.findAdmins = (req, res) => {
    const id = req.query.id_admin;      // buscar por ID si se pasa
    const nombre = req.query.nombre;    // buscar por nombre si se pasa

    // Construir condición según los filtros
    let condition = null;

    if (id) {
        // Si hay id, buscamos por PK
        Admin.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({ message: `Cannot find Admin with id=${id}.` });
                }
            })
            .catch(err => res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Admin."
            }));
        return; // salimos aquí porque no necesitamos buscar todos
    }

    if (nombre) {
        condition = { nombre: { [Op.like]: `%${nombre}%` } };
    }

    // Buscar todos o por nombre
    Admin.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        }));
};

exports.update = (req, res) => {
    const id = req.params.id_admin;
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
    const id = req.params.id_admin;
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