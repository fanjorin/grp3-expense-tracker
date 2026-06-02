import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import * as _ from "./types/express";

const app: Express = express();

app.use(cors({ origin: ["https://pennywiseaipro.vercel.app", "http://localhost:3000"] }));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1", routes);

app.get("/ping", (_, res) => res.send("pong"));

export default app;
