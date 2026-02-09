import { IHeroRepository } from "../repositories/IHeroRepository";
import { AppError } from "../../../shared/errors/AppError";

interface Request {
    id: string;
    isActive: boolean;
}

export class UpdateHeroStatusService {
    constructor(private heroRepository: IHeroRepository) { }

    async execute({ id, isActive }: Request): Promise<void> {
        const heroExists = await this.heroRepository.findById(id);
        if (!heroExists) {
            throw new AppError("Heroi não encontrado", 404);
            
        }

        await this.heroRepository.updateStatus(id, isActive);
    }
}
