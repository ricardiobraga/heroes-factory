import { IHeroRepository } from "../repositories/IHeroRepository";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { AppError } from "@/shared/errors/AppError";

export class CreateHeroService {
  constructor(private heroRepository: IHeroRepository) {}

  async execute(data: CreateHeroDTO) {
    if (!data.name || !data.nickname) {
      throw new AppError("Nome e nome de guerra são obrigatórios", 400);
    }

    return this.heroRepository.create(data);
  }
}
