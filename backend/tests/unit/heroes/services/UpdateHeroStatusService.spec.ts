import { UpdateHeroStatusService } from "@/modules/heroes/services/UpdateHeroStatusService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";
import { AppError } from "@/shared/errors/AppError";

describe("UpdateHeroStatusService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update hero status successfully", async () => {
    const service = new UpdateHeroStatusService(HeroRepositoryMock);

    (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Hulk",
    });

    (HeroRepositoryMock.updateStatus as jest.Mock).mockResolvedValue(undefined);

    await expect(
      service.execute({ id: "1", isActive: false })
    ).resolves.toBeUndefined();

    expect(HeroRepositoryMock.findById).toHaveBeenCalledWith("1");
    expect(HeroRepositoryMock.updateStatus).toHaveBeenCalledWith("1", false);
  });

  it("should throw error if hero does not exist", async () => {
    const service = new UpdateHeroStatusService(HeroRepositoryMock);

    (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({ id: "invalid-id", isActive: true })
    ).rejects.toBeInstanceOf(AppError);

    expect(HeroRepositoryMock.updateStatus).not.toHaveBeenCalled();
  });
});
