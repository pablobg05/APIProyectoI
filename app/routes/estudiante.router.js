module.exports = app => {
    const estudiante = require('../controllers/estudiante.controller.js');

    var router = require("express").Router();

    // Crear un nuevo estudiante
    router.post("/create", estudiante.create);

    // Obtener estudiantes o un estudiante por id, nombre o grado
    router.get("/read", estudiante.findEstudiantes);

    // Actualizar un estudiante por id
    router.put("/update/:id_estudiante", estudiante.update);

    // Eliminar un estudiante por id
    router.delete("/delete/:id_estudiante", estudiante.delete);

    app.use('/api/estudiantes', router);
}