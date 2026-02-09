import { IHeroRepository } from "../../src/modules/heroes/repositories/IHeroRepository";

export const HeroRepositoryMock: IHeroRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  delete: jest.fn(),
};
