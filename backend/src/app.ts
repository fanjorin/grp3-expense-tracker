import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/ping", (_, res) => res.send("pong"));

export default app;
