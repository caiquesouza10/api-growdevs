import { Router } from "express";
import { SkillController } from "../controllers/skill.controller";

export const skillRoutes = () => {
    const app = Router({
        // quando chamado o arquivo de rota que chamamos de outra rota temos que colocar isso
        mergeParams: true,  
    });

    app.get("/", new SkillController().listarPorId);
    app.post("/", new SkillController().create);
    app.delete("/:skillId", new SkillController().delete);
    app.put("/:skillId", new SkillController().atualizar);

    return app;
};
