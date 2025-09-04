module.exports = app => {
    const maestro = require("../controllers/maestro.controller.js");
    var router = require("express").Router();

    // Create a new Maestro
    router.post("/create", maestro.create);

    // Retrieve all Maestros
    router.get("/read", maestro.findAll);

    // Retrieve a single Maestro with name
    router.get("/read/nombre/:nombre", maestro.findByName);

    // Retrieve a single Maestro with id
    router.get("/read/id/:id_maestro", maestro.findById);

    // Update a Maestro with id
    router.put("/update/:id_maestro", maestro.update);

    // Delete a Maestro with id
    router.delete("/delete/:id_maestro", maestro.delete);

    app.use('/api/maestros', router);
};