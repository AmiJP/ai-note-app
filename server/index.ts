import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource } from "./src/data-source";
import "reflect-metadata";
import { userRouter, noteRouter } from "./src/routes";
import { errorHandler } from "./src/middlewares/errorHandler";
import session from "express-session";
import { isAuthenticated } from "./src/middlewares/isAuthenticated";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

AppDataSource.initialize()
  .then(() => {
    console.log("database connected.");
  })
  .catch((error) => console.log(error));

app.use("/user", userRouter);
app.use(isAuthenticated);
app.use("/note", noteRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("server running on port 4000");
});
