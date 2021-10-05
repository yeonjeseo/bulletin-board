import express from "express";
import renderRouter from "./routers/renderRouter.js";
import postingsRouter from "./routers/postingsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");
// console.log(process.cwd() + "/views");

// serve local files to virtual browser file system
app.use("/static", express.static("client"));

app.use("/", renderRouter);
app.use("/api/postings", postingsRouter);
app.use("/api/users", usersRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);
