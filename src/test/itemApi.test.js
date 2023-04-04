const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const Item = require('../models/Item');
const Category = require('../models/Category');
const testHelper = require('../lib/testHelper');

const api = supertest(app);

beforeEach(async () => {
  await Item.deleteMany({});
  await Category.deleteMany({});
});

describe('when there is one', () => {
  beforeEach(async () => {
    await api.post('/api/v1/items').send(testHelper.initialItems[0]);
  });

  it('db has one item', async () => {
    const response = await api
      .get('/api/v1/items')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(1);
    const itemName = response.body[0].name;
    expect(itemName).toBe(testHelper.initialItems[0].name.toLowerCase());
  });
  it('post another item', async () => {
    await api.post('/api/v1/items').send(testHelper.initialItems[1]);
    const response = await api.get('/api/v1/items');

    expect(response.body).toHaveLength(2);
    expect(response.body[1].name).toBe(
      testHelper.initialItems[1].name.toLocaleLowerCase()
    );
  });
  it('responds an error with wrong request', async () => {
    const withoutName = {
      name: '',
      category: 'meat',
    };
    const withoutCategory = {
      name: 'chicken',
    };
    await api.post('/api/v1/items').send(withoutName).expect(400);
    await api.post('/api/v1/items').send(withoutCategory).expect(400);

    const items = await Item.find({});
    expect(items).toHaveLength(1);
  });
});

describe('with more than two items', () => {
  beforeEach(async () => {
    await testHelper.postAllItems(testHelper.initialItems, api);
  });
  it('databases items has the length of the items', async () => {
    const { body } = await api.get('/api/v1/items');

    expect(body).toHaveLength(testHelper.initialItems.length);
  });
  it('only has correct number of categories', async () => {
    const response = await Category.find({});
    expect(response).toHaveLength(3);
    const mappedNames = response.map((object) => object.name);
    expect(mappedNames).toContain('drinks');
    expect(mappedNames).toContain('cereals');
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
