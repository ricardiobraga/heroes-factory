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
    page = 1,
    perPage = 10,
    search?: string
  ): Promise<{ heroes: Hero[]; total: number }> {
    const where = search
      ? {
        OR: [
          { name: { contains: search.toLowerCase() } },
          { nickname: { contains: search.toLowerCase() } },
        ],
      }
      : {};

    const [heroes, total] = await prisma.$transaction([
      prisma.hero.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.hero.count({ where }),
    ]);

    return { heroes, total };
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
