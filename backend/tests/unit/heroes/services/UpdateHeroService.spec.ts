import { UpdateHeroService } from "@/modules/heroes/services/UpdateHeroService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";

describe("UpdateHeroService", () => {
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