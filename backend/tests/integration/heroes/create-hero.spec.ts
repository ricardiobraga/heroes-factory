import request from 'supertest';
import app from '@/app';

describe('Create Hero (Integration)', () => {
    it('should create a hero', async () => {
        const response = await request(app)
            .post('/heroes')
            .send({
                name: 'Bruce Banner',
                nickname: 'HULK',
                mainPower: 'Strength',
                universe: 'Marvel',
                dateOfBirth: new Date('1940-04-10'),
                avatarUrl: 'https://example.com/hulk.png',
            });

        expect(response.status).toBe(201);
        expect(response.body.hero).toHaveProperty('id');
        expect(response.body.hero.name).toBe('Bruce Banner');
    });
});
