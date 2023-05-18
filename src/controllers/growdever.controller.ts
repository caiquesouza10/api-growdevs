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

}