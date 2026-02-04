import { IHeroRepository } from "../repositories/IHeroRepository";

export class DeleteHeroService {
  constructor(private heroRepository: IHeroRepository) {}

  async execute(id: string) {
    return this.heroRepository.delete(id);
  }
}
