module.exports = app => {
    const maestro = require("../controllers/maestro.controller.js");
    var router = require("express").Router();

    // Create a new Maestro
    router.post("/create", maestro.create);

    // Retrieve Maestros ( all / by id / by name )
    router.get("/read", maestro.findMaestros);

    // Update a Maestro with id
    router.put("/update/:id_maestro", maestro.update);

    // Delete a Maestro with id
    router.delete("/delete/:id_maestro", maestro.delete);

    app.use('/api/maestros', router);
};