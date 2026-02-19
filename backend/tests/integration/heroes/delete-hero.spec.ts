import request from 'supertest';
import app from '@/app';

describe('Delete Hero (Integration)', () => {
    it('should delete a hero successfully', async () => {
        const createResponse = await request(app)
            .post('/heroes')
            .send({
                name: 'Bruce Banner',
                nickname: 'Hulk',
                mainPower: 'Strength',
                dateOfBirth: new Date('1940-04-10'),
                avatarUrl: 'https://avatars.githubusercontent.com/u/3991663?v=4',
                universe: 'Marvel',
            });

        const heroId = createResponse.body.hero.id;

        const deleteResponse = await request(app)
            .delete(`/heroes/${heroId}`)

        expect(deleteResponse.status).toBe(204);

    });

    it('should return 404 if hero does not exist', async () => {
        const response = await request(app)
            .delete('/heroes/non-existing-id')
        expect(response.status).toBe(404);
    });
});
