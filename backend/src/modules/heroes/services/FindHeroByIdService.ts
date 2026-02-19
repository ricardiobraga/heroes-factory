import { AppError } from "@/shared/errors/AppError";
import { IHeroRepository } from "../repositories/IHeroRepository";
import { Hero } from "@prisma/client";

export class FindHeroByIdService {
    constructor(private readonly heroRepository: IHeroRepository) { }

    async execute(id: string): Promise<Hero> {
        const hero = await this.heroRepository.findById(id);
        if (!hero) {
            throw new AppError("Herói não encontrado", 404);
        }
        return hero;
    }
}