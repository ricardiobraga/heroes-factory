import { Hero } from "@prisma/client";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";
import { IHeroRepository } from "../repositories/IHeroRepository";
import { AppError } from "@/shared/errors/AppError";

export class UpdateHeroService {
  constructor(
    private heroRepository: IHeroRepository
  ) { }

  async execute(id: string, data: UpdateHeroDTO): Promise<Hero> {
    const heroExists = await this.heroRepository.findById(id);

    if (!heroExists) {
      throw new AppError("Heroi não encontrado", 404);
    }

    const updatedHero = await this.heroRepository.update(id, data);

    return updatedHero;
  }
}
