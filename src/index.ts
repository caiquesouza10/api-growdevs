import express, { Request, Response } from "express";
import { growderverRoutes } from "./routers/growderver.routes";

const app = express();
app.use(express.json());

app.use("/growdever",growderverRoutes());

app.listen(3333, () => {
  console.log(`API Está rodando`);
});
