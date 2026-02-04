import { IHeroRepository } from "../repositories/IHeroRepository";

export class ListHeroesService {
    constructor(private heroRepository: IHeroRepository) { }

    async execute() {
        return this.heroRepository.findAll();
    }
}
