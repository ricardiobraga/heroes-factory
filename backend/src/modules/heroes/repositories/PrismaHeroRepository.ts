import { prisma } from "../../../shared/database/prisma";
import { IHeroRepository } from "./IHeroRepository";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";
import { Hero } from "@prisma/client";
export class PrismaHeroRepository implements IHeroRepository {
  async create(data: CreateHeroDTO): Promise<Hero> {
    return prisma.hero.create({ data });
  }

  async findAll(
    page: number,
    perPage: number,
    search?: string
  ) {
    const where = search
      ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { nickname: { contains: search, mode: "insensitive" } },
        ],
      }
      : undefined;

    const [heroes, total] = await Promise.all([
      prisma.hero.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where,
      }),
      prisma.hero.count({ where }),
    ]);

    return {
      heroes,
      total,
    };
  }



  async findById(id: string): Promise<Hero | null> {
    return prisma.hero.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateHeroDTO): Promise<Hero> {
    return prisma.hero.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.hero.delete({ where: { id } });
  }

  async updateStatus(id: string, isActive: boolean): Promise<void> {
    await prisma.hero.update({
      where: { id },
      data: { isActive },
    });
  }
}
