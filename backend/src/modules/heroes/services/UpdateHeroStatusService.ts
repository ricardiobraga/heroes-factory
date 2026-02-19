import { IHeroRepository } from "../repositories/IHeroRepository";
import { AppError } from "../../../shared/errors/AppError";
import { UpdateHeroStatusDTO } from "../dtos/UpdateHeroStatusDTO";
import { Hero } from "@prisma/client";



export class UpdateHeroStatusService {
    constructor(private heroRepository: IHeroRepository) { }

    async execute( id:string, data: UpdateHeroStatusDTO): Promise<Hero> {
        const heroExists = await this.heroRepository.findById(id);
        if (!heroExists) {
            throw new AppError("Heroi não encontrado", 404);
            
        }

        const updatedHero = await this.heroRepository.updateStatus(id, data);

        return updatedHero;
    }

 
}
