module.exports = app => {
    const estudiante = require('../controllers/estudiante.controller.js');

    var router = require("express").Router();

    // Crear un nuevo estudiante
    router.post("/create", estudiante.create);

    // Obtener todos los estudiantes
    router.get("/read", estudiante.findAll);

    // Obtener todos los estudiantes por grado
    router.get("/read/grado/:id_grado", estudiante.findAllByGrado);

    // Obtener un estudiante por nombre
    router.get("/read/nombre/:nombre", estudiante.findByName);

    // Obtener un estudiante por id
    router.get("/read/id/:id_estudiante", estudiante.findById);

    // Actualizar un estudiante por id
    router.put("/update/:id_estudiante", estudiante.update);

    // Eliminar un estudiante por id
    router.delete("/delete/:id_estudiante", estudiante.delete);

    app.use('/api/estudiantes', router);
}