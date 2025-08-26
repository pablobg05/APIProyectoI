const db = require("../models");
const Curso = db.curso;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const curso = {
    nombre: req.body.nombre,
    tipo: req.body.tipo
  };

  Curso.create(curso)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Curso."
      });
    });
}

exports.findAll = (req, res) => {
  Curso.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cursos."
      });
    });
}

exports.findById = (req, res) => {
  const id = req.params.id;
    Curso.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Curso with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Curso with id=" + id
        });
        });
}

exports.findByName = (req, res) => {
  const nombre = req.params.nombre;
    Curso.findOne({
        where: { nombre: nombre }
    })
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Curso with name=${nombre}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Curso with name=" + nombre
        });
        });
}

exports.update = (req, res) => {
  const id = req.params.id;
    Curso.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Curso was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Curso with id=${id}. Maybe Curso was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Curso with id=" + id
        });
        });
}

exports.delete = (req, res) => {
  const id = req.params.id;

  Curso.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Curso was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Curso with id=${id}. Maybe Curso was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Curso with id=" + id
      });
    });
}