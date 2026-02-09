import { Hero } from "@prisma/client";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";

export interface IHeroRepository {
  create(data: CreateHeroDTO): Promise<Hero>;
  findAll(page: number, perPage: number, search?: string): Promise<{ heroes: Hero[]; total: number; }>;
  findById(id: string): Promise<Hero | null>;
  update(id: string, data: UpdateHeroDTO): Promise<Hero>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, isActive: boolean): Promise<void>;
}
