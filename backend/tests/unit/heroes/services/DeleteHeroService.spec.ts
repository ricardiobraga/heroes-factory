import { DeleteHeroService } from "@/modules/heroes/services/DeleteHeroService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";
import { AppError } from "@/shared/errors/AppError";

describe("DeleteHeroService", () => {
  it("should delete a hero successfully", async () => {
    const service = new DeleteHeroService(HeroRepositoryMock);

    (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Hulk",
    });

    (HeroRepositoryMock.delete as jest.Mock).mockResolvedValue(undefined);

    await expect(service.execute("1")).resolves.toBeUndefined();

    expect(HeroRepositoryMock.findById).toHaveBeenCalledWith("1");
    expect(HeroRepositoryMock.delete).toHaveBeenCalledWith("1");
  });

  it("should throw error if hero does not exist", async () => {
    const service = new DeleteHeroService(HeroRepositoryMock);

    (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue(null);

    await expect(service.execute("invalid-id")).rejects.toBeInstanceOf(AppError);

    await expect(service.execute("invalid-id")).rejects.toMatchObject({
      message: "Herói não encontrado",
      statusCode: 404,
    });

    expect(HeroRepositoryMock.delete).not.toHaveBeenCalled();
  });
});
