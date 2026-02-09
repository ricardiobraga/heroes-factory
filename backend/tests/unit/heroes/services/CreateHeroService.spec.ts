import { CreateHeroService } from "@/modules/heroes/services/CreateHeroService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";

describe("CreateHeroService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a hero successfully", async () => {
    const service = new CreateHeroService(HeroRepositoryMock);

    (HeroRepositoryMock.create as jest.Mock).mockResolvedValue({
      id: "uuid",
      name: "Bruce Banner",
      nickname: "Hulk",
      universe: "Marvel",
      mainPower: "Force",
      dateOfBirth: new Date("1962-04-10"),
    });

    const hero = await service.execute({
      name: "Bruce Banner",
      nickname: "Hulk",
      universe: "Marvel",
      mainPower: "Force",
      dateOfBirth: new Date("1962-04-10"),
    });

    expect(hero).toHaveProperty("id");
    expect(HeroRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it("should throw error when name is missing", async () => {
    const service = new CreateHeroService(HeroRepositoryMock);

    await expect(
      service.execute({ nickname: "Hulk" } as any)
    ).rejects.toMatchObject({
      message: "Nome e nome de guerra são obrigatórios",
      statusCode: 400,
    });
  });
});
