import { ListHeroesService } from "@/modules/heroes/services/ListHeroesService";
import { HeroRepositoryMock } from "@tests/__mocks__/HeroRepositoryMock";

describe("ListHeroesService", () => {
    it("should return a list of heroes", async () => {
        const service = new ListHeroesService(HeroRepositoryMock);
        (HeroRepositoryMock.findAll as jest.Mock).mockResolvedValue({
            heroes: [
                { id: "1", nickname: "Hulk" },
                { id: "2", nickname: "Iron Man" },
            ],
            total: 2,
        });

        const result = await service.execute(1, 10);

        expect(result.heroes).toHaveLength(2);
        expect(result.total).toBe(2);

    });
});
