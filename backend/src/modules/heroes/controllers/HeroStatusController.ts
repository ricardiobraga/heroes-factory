import { Request, Response } from "express";
import { PrismaHeroRepository } from "../repositories/PrismaHeroRepository";
import { UpdateHeroStatusService } from "../services/UpdateHeroStatusService";
export class HeroStatusController {
    async update(
        req: Request<{ id: string }>,
        res: Response
    ) {
        const { id } = req.params;
        const { isActive } = req.body;

        const repository = new PrismaHeroRepository();
        const service = new UpdateHeroStatusService(repository);

        await service.execute({ id, isActive });

        return res.status(200).json({ sucess: true, message: `Herói atualizado com sucesso!` });
    }
}
