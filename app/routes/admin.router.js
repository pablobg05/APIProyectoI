module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    const router = require("express").Router();

    // Create a new Admin
    router.post("/create", admins.create);

    // Retrieve all Admins
    router.get("/read", admins.findAll);

    // Retrieve a single Admin with id
    router.get("/read/:id", admins.findById);

    // Retrieve Admins by name
    router.get("/read/name/:nombre", admins.findByName);

    // Update an Admin with id
    router.put("/update/:id", admins.update);

    app.use('/api/admins', router);
}