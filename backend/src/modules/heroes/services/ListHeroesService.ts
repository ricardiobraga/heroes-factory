import { IHeroRepository } from "../repositories/IHeroRepository";
import { Hero } from "@prisma/client";

interface ListHeroesResponse {
    heroes: Hero[];
    total: number;
}

export class ListHeroesService {
    constructor(private heroRepository: IHeroRepository) { }

    async execute(
        page: number,
        perPage: number,
        search?: string
    ): Promise<ListHeroesResponse> {
        return this.heroRepository.findAll(page, perPage, search);
    }
}
