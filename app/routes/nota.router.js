module.exports = app => {
    const notas = require("../controllers/nota.controller.js");
    var router = require("express").Router();

    // Crear una nueva nota
    router.post("/create", notas.create);

    // Encontrar las notas por estudiante / curso / modulo / id
    router.get("/read", notas.findNotas)

    // Actualizar una nota por la id_nota
    router.put("/update/:id_nota", notas.update);

    // Eliminar una nota por la id_nota
    router.delete("/delete/:id_nota", notas.delete);

    app.use('/api/notas', router);
}