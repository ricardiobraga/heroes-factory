import { Hero } from "@prisma/client";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";
import { UpdateHeroStatusDTO } from "../dtos/UpdateHeroStatusDTO";

export interface IHeroRepository {
  create(data: CreateHeroDTO): Promise<Hero>;
  findAll(page: number, perPage: number, search?: string): Promise<{ heroes: Hero[]; total: number; }>;
  findById(id: string): Promise<Hero | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: UpdateHeroDTO): Promise<Hero>;
  updateStatus(id: string, data: UpdateHeroStatusDTO): Promise<Hero>;
}
