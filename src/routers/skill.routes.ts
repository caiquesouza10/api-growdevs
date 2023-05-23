import { Router } from "express";
import { SkillController } from "../controllers/skill.controller";

export const skillRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.get("/", new SkillController().list);
    app.post("/", new SkillController().create);
    app.delete("/:skillId", new SkillController().delete);

    return app;
};
