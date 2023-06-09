import { Router } from "express";
import { GrowdeverController } from "../controllers/growdever.controller";
import { skillRoutes } from "./skill.routes";

export const growderverRoutes = () => {
  const app = Router();

  //listar Growdevers
  //GET http://localhost:3333/growdever
  app.get("/", new GrowdeverController().listar);

  //Obter Growdevers por ID
  //GET http://localhost:3333/growdever/1
  app.get("/:id", new GrowdeverController().listarPorId);

  //Criar um Growdever
  //POST http://localhost:3333/growdever
  // app.post('/growdever', (req: Request, res: Response) => new GrowdeverController().create(req, res));
  // OU
  // app.post('/growdever', (req: Request, res: Response) => {
  //     return new GrowdeverController().create(req, res);
  // });
  app.post("/", new GrowdeverController().create);

  app.delete("/:id", new GrowdeverController().delete);
  
  app.put("/:id", new GrowdeverController().update);


  // coloco isso pois a skill faz parte de um growdever ai o prefixo vai ficar o mesmo 
  //porem tenho que chamar aqui, ai ele direciona para a skill router
  app.use("/:id/skill", skillRoutes());

  return app;
};
