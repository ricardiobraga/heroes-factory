import request from 'supertest';
import app from '@/app';

describe('List Heroes (Integration)', () => {
  it('should list heroes from database', async () => {
    await request(app).post('/heroes').send({
      name: 'Bruce Banner',
      mainPower: 'Strength',
      nickname: 'Batman',
      dateOfBirth: new Date('1940-04-10'),
      avatarUrl: 'https://avatars.githubusercontent.com/u/3991663?v=4',
      universe: 'DC',
    });

    await request(app).post('/heroes').send({
      name: 'Clark Kent',
      mainPower: 'Strength',
      nickname: 'SUPERMAN',
      dateOfBirth: new Date('1941-04-10'),
      avatarUrl: 'https://avatars.githubusercontent.com/u/3991663?v=4',
      universe: 'DC',
    });

    const response = await request(app).get('/heroes');
    expect(response.status).toBe(200);
    expect(response.body.heroes).toHaveLength(2);
    expect(response.body.heroes[0]).toHaveProperty('id');
    expect(response.body.heroes[0]).toHaveProperty('name');
  });
});
