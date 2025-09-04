module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    const router = require("express").Router();

    // Create a new Admin
    router.post("/create", admins.create);

    // Retrieve Admins (all or by filters) [los filtros se ponen con ?, por ejemplo ?id_admin=3 o ?nombre=Juan]
    router.get("/read", admins.findAdmins);

    // Update an Admin with id
    router.put("/update/:id_admin", admins.update);

    // Delete an Admin with id
    router.delete("/delete/:id_admin", admins.delete);

    app.use('/api/admins', router);
}