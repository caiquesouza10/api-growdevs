import express, { Request, Response } from "express";
import { growdeversDb } from "../database/growdeversDb";
import { Growdev } from "../models/growdever";


//classe que engloba so metodos 
export class GrowdeverController {
    public create(req: Request, res: Response){
        try {
            const {id, nome, idade} = req.body;
    
            if(!nome){
                return res.status(400).send({
                    ok: false,
                    message: "Nome was not provided"
                })
            }
    
            if(!idade){
                return res.status(400).send({
                    ok: false,
                    message: "Idade was not provided"
                })
            }
            
            const growdever = new Growdev(nome, idade);
            
            growdeversDb.push(growdever)
    
            return res.status(201).send({
                ok: true,
                message: 'Growdever was successfuly created',
                data: growdever.toJson()
            })
    
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }
    }

    public delete(req: Request, res: Response){
        try {
            const { id } = req.params;

            const growdeverindex = growdeversDb.findIndex(growdever => growdever.id === id);
            if(growdeverindex < 0){
                return res.status(404).send({
                    ok: false,
                    message: "Growdever was not found"
                });
            };

            const deleteGrowdevers = growdeversDb.splice(growdeverindex, 1);

            return res.status(200).send({
                ok: true,
                message:"Growdever was successfully deleted",
                data: deleteGrowdevers[0].toJson(),
            })
            
        } catch (error:any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }

    }

    public update(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { idade } = req.body;

            const growdever = growdeversDb.find(growdever => growdever.id === id);

            if(!growdever){
                return res.status(404).send({
                    ok: false,
                    message: "Growdever was not found"
                });
            };

            growdever.idade = idade;

            return res.status(200).send({
                ok: true,
                message: "Growdever was successfully atualizado",
                data: growdever.toJson()
            })
            
        } catch (error:any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }
    }

}