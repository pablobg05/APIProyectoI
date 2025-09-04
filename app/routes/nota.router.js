module.exports = app => {
    const notas = require("../controllers/nota.controller.js");
    var router = require("express").Router();

    // Crear una nueva nota
    router.post("/create", notas.create);

    // Encontrar todas las notas de un estudiante por la id_estudiante
    router.get("/read/estudiante/:id_estudiante", notas.findByEstudiante);

    // Encontrar todas las notas de un estudiante por la id_estudiante y modulo
    router.get("/read/estudiante/:id_estudiante/modulo/:modulo", notas.findByEstudianteAndModulo);

    // Encontrar todas las notas de un curso por la id_curso
    router.get("/read/curso/:id_curso", notas.findByCurso);

    // Encontrar una nota por la id_curso y modulo
    router.get("/read/curso/:id_curso/modulo/:modulo", notas.findByCursoAndModulo);

    // Actualizar una nota por la id_nota
    router.put("/update/:id_nota", notas.update);

    // Eliminar una nota por la id_nota
    router.delete("/delete/:id_nota", notas.delete);

    app.use('/api/notas', router);
}