import { Request, Response } from "express";

export class HttpResponse {
  public static notFound(res: Response, entity: string) {
    return res.status(404).send({
      ok: false,
      message: `${entity} was not found`,
    });
  }

  public static success(res: Response, message: string, data: any){
    return res.status(200).send({
        ok: true,
        message: `${message} was successfully update`,
        data
      });
  }
}

