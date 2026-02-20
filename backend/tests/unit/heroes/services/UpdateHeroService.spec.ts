import { UpdateHeroService } from "@/modules/heroes/services/UpdateHeroService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";

describe("UpdateHeroService", () => {
    it("should update hero successfully", async () => {
        const service = new UpdateHeroService(HeroRepositoryMock);

        (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue({
            id: "1",
            nickname: "Thor",
        });

        (HeroRepositoryMock.update as jest.Mock).mockResolvedValue(undefined);

        await expect(
            service.execute("1", { nickname: "Hulk" })
        ).resolves.toBeUndefined();

        expect(HeroRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(HeroRepositoryMock.update).toHaveBeenCalledWith("1", {
            nickname: "Hulk",
        });
    });

    it("should throw error if hero does not exist", async () => {
        const service = new UpdateHeroService(HeroRepositoryMock);

        (HeroRepositoryMock.findById as jest.Mock).mockResolvedValue(null);

        await expect(
            service.execute("invalid-id", { nickname: "Hulk" })
        ).rejects.toMatchObject({
            message: "Heroi não encontrado",
            statusCode: 404,
        });
    });
});