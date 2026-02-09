import { AppError } from "@/shared/errors/AppError";
import { IHeroRepository } from "../repositories/IHeroRepository";

export class DeleteHeroService {
  constructor(private heroRepository: IHeroRepository) {}

  async execute(id: string): Promise<void> {
    const hero = await this.heroRepository.findById(id);

    if (!hero) {
      throw new AppError("Herói não encontrado", 404);
    }
    
    return this.heroRepository.delete(id);
  }
}
