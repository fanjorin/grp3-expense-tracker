import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes";

const app: Express = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1", routes);

app.get("/ping", (_, res) => res.send("pong"));

export default app;
