import express, { Request, Response } from "express";
import { Growdev } from "./models/growdever";
import { growdeversDb } from "./database/growdeversDb";
import { GrowdeverController } from "./controllers/growdever.controller";

const app = express();
app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   console.log("Entrou na rota");
//   const growdev1 = new Growdev("1", "caique", 29);
//   res.status(200).send({ ok: true, data: growdev1.toJson() });
// });


//listar Growdevers
//GET http://localhost:3333/growdever?idade=20
app.get('/growdever', (req: Request, res: Response) => {
    try {
        const { idade } = req.query;

        let result = growdeversDb;

        if(idade){
            result = growdeversDb.filter(growdever => growdever.idade === Number(idade));
        }

        return res.status(200).send({
            ok: true,
            message: 'Growdevers were successfully listed',
            data: result.map((growdever) => growdever.toJson())
        });

    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString()
        });
    }
});



//Obter Growdevers por ID
//GET http://localhost:3333/growdever/1
app.get('/growdever/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = growdeversDb.find(growdever => growdever.id === id);

        if(!result){
            return res.status(404).send({
                ok: false,
                message: "Growdever was not found"
            });
        }
        
        return res.status(200).send({
            ok: true,
            message: 'Growdevers was successfully obtained',
            data: result?.toJson()
        });

    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString()
        });
    }
});



//Criar um Growdever
//POST http://localhost:3333/growdever
app.post('/growdever', (req: Request, res: Response) => {
    return new GrowdeverController().create(req, res);
});
//OU
// app.post('/growdever', (req: Request, res: Response) => new GrowdeverController().create(req, res));
// app.post('/growdever', new GrowdeverController().create);


app.listen(3333, () => {
  console.log(`API Está rodando`);
});
