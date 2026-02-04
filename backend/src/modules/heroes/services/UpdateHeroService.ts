import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";
import { IHeroRepository } from "../repositories/IHeroRepository";

export class UpdateHeroService {
  constructor(private heroRepository: IHeroRepository) {}

  async execute(id: string, data: UpdateHeroDTO) {
    return this.heroRepository.update(id, data);
  }
}
