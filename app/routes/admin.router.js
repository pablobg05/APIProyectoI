module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    const router = require("express").Router();

    // Create a new Admin
    router.post("/", admins.create);

    // Retrieve all Admins
    router.get("/", admins.findAll);

    // Retrieve a single Admin with id
    router.get("/:id", admins.findById);

    // Retrieve Admins by name
    router.get("/name/:nombre", admins.findByName);

    // Update an Admin with id
    router.put("/:id", admins.update);

    app.use('/api/admins', router);
}