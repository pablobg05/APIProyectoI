module.exports = app => {
    const maestro = require("../controllers/maestro.controller.js");
    var router = require("express").Router();

    // Create a new Maestro
    router.post("/", maestro.create);

    // Retrieve all Maestros
    router.get("/", maestro.findAll);

    // Retrieve a single Maestro with name
    router.get("/nombre/:nombre", maestro.findByName);

    // Retrieve a single Maestro with id
    router.get("/id/:id", maestro.findOne);

    // Update a Maestro with id
    router.put("/:id", maestro.update);

    // Delete a Maestro with id
    router.delete("/:id", maestro.delete);

    app.use('/api/maestros', router);
};