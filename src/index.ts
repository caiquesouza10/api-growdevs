import express, { Request, Response } from "express";
import { Growdev } from "./models/growdever";

const app = express();

app.get("/", (req: Request, res: Response) => {
  console.log("Entrou na rota");

  const growdev1 = new Growdev("1", "caique", 29);

  res.status(200).send({ ok: true, data: growdev1.toJson() });
});

app.listen(3333, () => {
  console.log(`API Está rodando`);
});
