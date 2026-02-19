import { prisma } from "@/app";
import { IHeroRepository } from "./IHeroRepository";
import { CreateHeroDTO } from "../dtos/CreateHeroDTO";
import { UpdateHeroDTO } from "../dtos/UpdateHeroDTO";
import { Hero } from "@prisma/client";
import { UpdateHeroStatusDTO } from "../dtos/UpdateHeroStatusDTO";
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
          { name: { contains: search } },
          { nickname: { contains: search } },
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

  async updateStatus(id: string, data: UpdateHeroStatusDTO): Promise<Hero> {
    return prisma.hero.update({
      where: { id },
      data,
    });
  }
}
