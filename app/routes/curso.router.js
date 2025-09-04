module.exports = app => {
    const curso = require('../controllers/curso.controller.js');
    var router = require("express").Router();

    // Crear un nuevo curso
    router.post("/create", curso.create);

    // Obtener cursos o un curso por id o nombre
    router.get("/read", curso.findCursos);

    // Actualizar un curso por id
    router.put("/update/:id_curso", curso.update);

    // Eliminar un curso por id
    router.delete("/delete/:id_curso", curso.delete);

    app.use('/api/cursos', router);
}