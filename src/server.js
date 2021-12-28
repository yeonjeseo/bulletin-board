import express from "express";
import renderRouter from "./routers/renderRouter.js";
import postingsRouter from "./routers/postingsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./swagger.js";
import db from "./db.js";

const specs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
console.log(process.cwd() + "/views");

// serve local files to virtual browser file system
app.use("/static", express.static("client"));

// swagger
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/", renderRouter);
app.use("/api/postings", postingsRouter);
app.use("/api/users", usersRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);
