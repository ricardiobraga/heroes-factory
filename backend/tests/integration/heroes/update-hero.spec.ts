import request from 'supertest';
import app from '@/app';

describe('Update Hero (Integration)', () => {
  it('should update a hero successfully', async () => {
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

    const updateResponse = await request(app)
      .put(`/heroes/${heroId}`)
      .send({
        name: 'Bruce Banner Updated',
        nickname: 'Professor Hulk',
        mainPower: 'Intelligence',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.hero).toMatchObject({
      id: heroId,
      name: 'Bruce Banner Updated',
      nickname: 'Professor Hulk',
      mainPower: 'Intelligence',
    });

    const heroInDb = await request(app).get(`/heroes/${heroId}`);

    expect(heroInDb?.body.hero?.name).toBe('Bruce Banner Updated');
  });

  it('should return 404 if hero does not exist', async () => {
    const response = await request(app)
      .put('/heroes/non-existing-id')
      .send({
        name: 'Invalid',
      });

    expect(response.status).toBe(404);
  });
});
