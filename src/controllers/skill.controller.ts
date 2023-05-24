import { Request, Response } from "express";
import { Skill } from "../models/skill.model";
import { growdeversDb } from "../database/growdeversDb";

export class SkillController {
  public listarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const growdever = growdeversDb.find((growdever) => growdever.id === id);
      if (!growdever) {
        return res.status(404).send({
          ok: false,
          message: "Growdever was not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Skills successfully listed",
        data: growdever.skills.map((skill) => skill.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, isActive } = req.body;

      if (!nome) {
        return res.status(400).send({
          ok: false,
          message: "Nome was not provided",
        });
      }

      if (!isActive) {
        return res.status(400).send({
          ok: false,
          message: "isActive was not provided",
        });
      }

      const growdever = growdeversDb.find((growdever) => growdever.id === id);
      if (!growdever) {
        return res.status(404).send({
          ok: false,
          message: "Growdever was not found",
        });
      }

      const skill = new Skill(nome, isActive);
      growdever.skills.push(skill);

      return res.status(201).send({
        ok: true,
        message: "Skill was successfully created",
        data: growdever.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message:
          "Nossos servidores estão com problema, tente novamente mais tarde.",
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id, skillId } = req.params;

      const growdever = growdeversDb.find((growdever) => growdever.id === id);

      if (!growdever) {
        return res.status(404).send({
          ok: false,
          message: "Growdever was not found",
        });
      }

      const skillIndex = growdever.skills.findIndex(
        (skill) => skill.id === skillId
      );

      if (skillIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "Skill was not found",
        });
      }

      const deletedSkills = growdever.skills.splice(skillIndex, 1);

      return res.status(200).send({
        ok: true,
        message: "Skill was successfully deleted",
        data: deletedSkills[0].toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message:
          "Nossos servidores estão com problema, tente novamente mais tarde.",
      });
    }
  }

  public atualizar(req: Request, res: Response) {
    try {
      const { id, skillId } = req.params;

      const { nome } = req.body;

      const growdever = growdeversDb.find((growdever) => growdever.id === id);

      if (!growdever) {
        return res.status(404).send({
          ok: false,
          message: "Growdever was not found",
        });
      }

      const skillIndex = growdever.skills.find(
        (skill) => skill.id === skillId
      );

      if (!skillIndex) {
        return res.status(404).send({
          ok: false,
          message: "Skill was not found",
        });
      }

      //logica para atualizar a skill vai aqui...

      skillIndex.nome = nome

      
      

      return res.status(200).send({
        ok: true,
        message: "Skill was successfully update",
        data: growdever.toJson(),
      });

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message:
          "Nossos servidores estão com problema, tente novamente mais tarde.",
      });
    }
  }
  
}
