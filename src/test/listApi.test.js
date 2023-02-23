const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const Item = require('../models/Item');
const Category = require('../models/Category');
const List = require('../models/List');
const testHelper = require('../lib/testHelper');

const api = supertest(app);

beforeEach(async () => {
  await Item.deleteMany({});
  await Category.deleteMany({});
  await List.deleteMany({});
});

describe('with no initial items', () => {
  it('returns error with missing items', async () => {
    const list = {
      name: 'test list',
      items: [],
      isCancelled: false,
      date: 'hoy',
    };
    const { body } = await api.post('/api/v1/lists').send(list).expect(400);
    expect(body.error).toBe('content missing');
  });
  it('returns error with missing name', async () => {
    const list = {
      name: '',
      items: ['a', 'b'],
      isCancelled: false,
      date: 'hoy',
    };
    const { body } = await api.post('/api/v1/lists').send(list).expect(400);
    expect(body.error).toBe('content missing');
  });
});
describe('with items', () => {
  beforeEach(async () => {
    await testHelper.postAllItems(testHelper.initialItems, api);
  });

  it('successfully saves a list', async () => {
    const { body: items } = await api.get('/api/v1/items');
    const mappedItemsId = items.map((item) => item.id);

    const list = {
      name: 'Test success',
      items: [...mappedItemsId],
      isCancelled: true,
      date: 'hoy',
    };

    const { body } = await api.post('/api/v1/lists').send(list);

    expect(body.name).toBe(list.name.toLowerCase());
    const res = await api.get('/api/v1/lists');
    console.log(res.body);
    expect(res.body[0].name).toBe(list.name.toLowerCase());
  });
});
