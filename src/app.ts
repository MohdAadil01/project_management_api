import express, { Response, Request } from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.json("hi");
});

export default app;
