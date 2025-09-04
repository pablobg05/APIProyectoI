module.exports = app => {
    const grado = require('../controllers/grado.controller.js');

    var router = require("express").Router();

    // Crear un nuevo grado
    router.post("/create", grado.create);

    // Obtener todos los grados
    router.get("/read", grado.findAll);

    // Obtener un grado por id
    router.get("/read/:id_grado", grado.findById);

    // Actualizar un grado por id
    router.put("/update/:id_grado", grado.update);

    // Eliminar un grado por id
    router.delete("/delete/:id_grado", grado.delete);

    app.use('/api/grados', router);
}