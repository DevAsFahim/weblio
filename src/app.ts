import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World whole!");
});

export default app;
