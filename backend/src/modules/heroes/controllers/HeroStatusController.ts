import { Request, Response } from "express";
import { PrismaHeroRepository } from "../repositories/PrismaHeroRepository";
import { UpdateHeroStatusService } from "../services/UpdateHeroStatusService";
export class HeroStatusController {
    async update(
        req: Request<{ id: string }>,
        res: Response
    ) {
        const repository = new PrismaHeroRepository();
        const service = new UpdateHeroStatusService(repository);
        const hero = await service.execute(req.params.id, req.body);

        return res.status(200).json({ hero, sucess: true, message: `Herói atualizado com sucesso!` });
    }
}
