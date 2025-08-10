const express = require("express");
const path = require("path");
const rootRouter = require("./src/routes/routes");
const db = require("./src/configs/db");
const cors = require("cors"); // Importer le module CORS
const cookieParser = require("cookie-parser");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json()); // Utiliser le middleware express.json() pour analyser le corps de la requête (données JSON)
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(cookieParser());

/*app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});*/

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Linkhub Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LinkHub",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  "/api/courses/get-files/files",
  express.static(path.join(__dirname, "./files"))
);

app.use(
  "/api/categories/getImage/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

const port = 3000;

app.use("/api", rootRouter);

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
