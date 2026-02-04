import { IHeroRepository } from "../repositories/IHeroRepository";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";

export class CreateHeroService {
  constructor(private heroRepository: IHeroRepository) {}

  async execute(data: CreateHeroDTO) {
    if (!data.name || !data.nickname) {
      throw new Error("Name and nickname are required");
    }

    return this.heroRepository.create(data);
  }
}
