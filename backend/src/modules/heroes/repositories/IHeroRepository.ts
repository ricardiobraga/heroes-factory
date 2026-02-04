import { Hero } from "@prisma/client";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";

export interface IHeroRepository {
  create(data: CreateHeroDTO): Promise<Hero>;
  findAll(): Promise<Hero[]>;
  findById(id: string): Promise<Hero | null>;
  update(id: string, data: UpdateHeroDTO): Promise<Hero>;
  delete(id: string): Promise<void>;
}
