module.exports = app => {
    const curso = require('../controllers/curso.controller.js');
    var router = require("express").Router();

    // Crear un nuevo curso
    router.post("/create", curso.create);

    // Obtener todos los cursos
    router.get("/read", curso.findAll);

    // Obtener un curso por id
    router.get("/read/id/:id_curso", curso.findById);

    // Obtener un curso por nombre
    router.get("/read/:nombre", curso.findByName);

    // Actualizar un curso por id
    router.put("/update/:id_curso", curso.update);

    // Eliminar un curso por id
    router.delete("/delete/:id_curso", curso.delete);

    app.use('/api/cursos', router);
}