import { Request, Response } from "express";
import { PrismaHeroRepository } from "../repositories/PrismaHeroRepository";
import { CreateHeroService } from "../services/CreateHeroService";
import { ListHeroesService } from "../services/ListHeroesService";
import { UpdateHeroService } from "../services/UpdateHeroService";
import { DeleteHeroService } from "../services/DeleteHeroService";


export class HeroController {
    async create(req: Request, res: Response) {
        const repository = new PrismaHeroRepository();
        const service = new CreateHeroService(repository);

        const hero = await service.execute(req.body);

        return res.status(201).json({hero, success: true, message: `Herói criado com sucesso!`});
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const repository = new PrismaHeroRepository();
        const service = new UpdateHeroService(repository);
        console.log(req.params.id);
        const hero = await service.execute(req.params.id, req.body);

        return res.status(200).json({ hero, sucess: true, message: `Herói atualizado com sucesso!` });
    }

    async list(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const perPage = 10;
        const search = req.query.search as string | undefined;

        const repository = new PrismaHeroRepository();
        const { heroes, total } = await repository.findAll(page, perPage, search);

        const totalPages = Math.ceil(total / perPage);

        return res.json({ heroes, page, perPage, totalPages });
    }

    async delete(
        req: Request<{ id: string }>,
        res: Response
    ) {
        const repository = new PrismaHeroRepository();
        const service = new DeleteHeroService(repository);

        await service.execute(req.params.id);

        return res.status(204).send({sucess: true, message: 'Herói excluído com sucesso'});
    }

    
}
