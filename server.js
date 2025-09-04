const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: [
            "http://localhost:8081",
            "https://apirest2025-1-xdab.onrender.com"
    ]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Todo Bien :)" });
});

require("./app/routes/curso.router.js")(app);
require("./app/routes/estudiante.router.js")(app);
require("./app/routes/maestro.router.js")(app);
require("./app/routes/grado.router.js")(app);
require("./app/routes/nota.router.js")(app);
require("./app/routes/admin.router.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});