module.exports = app => {
    const grado = require('../controllers/grado.controller.js');

    var router = require("express").Router();

    // Crear un nuevo grado
    router.post("/", grado.create);

    // Obtener todos los grados
    router.get("/", grado.findAll);

    // Obtener un grado por id
    router.get("/:id", grado.findById);

    // Actualizar un grado por id
    router.put("/:id", grado.update);

    // Eliminar un grado por id
    router.delete("/:id", grado.delete);

    app.use('/api/grados', router);
}