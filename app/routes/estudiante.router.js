module.exports = app => {
    const estudiante = require('../controllers/estudiante.controller.js');

    var router = require("express").Router();

    // Crear un nuevo estudiante
    router.post("/", estudiante.create);

    // Obtener todos los estudiantes
    router.get("/", estudiante.findAll);

    // Obtener todos los estudiantes por grado
    router.get("/grado/:id_grado", estudiante.findAllByGrado);

    // Obtener un estudiante por nombre
    router.get("/nombre/:nombre", estudiante.findByName);

    // Obtener un estudiante por id
    router.get("/:id", estudiante.findById);

    // Actualizar un estudiante por id
    router.put("/:id", estudiante.update);

    // Eliminar un estudiante por id
    router.delete("/:id", estudiante.delete);

    app.use('/api/estudiantes', router);
}