const supertest = require('supertest');
const app = require('../../index');
const Item = require('../models/Item');
const Category = require('../models/Category');
const List = require('../models/List');
const testHelper = require('../lib/testHelper');

const api = supertest(app);
jest.setTimeout(30000);
beforeEach(async () => {
  await Item.deleteMany({});
  await Category.deleteMany({});
  await List.deleteMany({});
});

// describe('with no initial items', () => {
//   it('returns error with missing items', async () => {
//     const list = {
//       name: 'test list',
//       items: [],
//       isCancelled: false,
//       date: new Date(),
//     };
//     const { body } = await api.post('/api/v1/lists').send(list).expect(400);
//     expect(body.error).toBe('content missing');
//   });
//   it('returns error with missing name', async () => {
//     const list = {
//       name: '',
//       items: ['a', 'b'],
//       isCancelled: false,
//       date: new Date(),
//     };
//     const { body } = await api.post('/api/v1/lists').send(list).expect(400);

//     expect(body.error).toBe('content missing');
//   });
// });
describe('with items', () => {
  beforeEach(async () => {
    await testHelper.postAllItems(testHelper.initialItems, api);
  });

  it('successfully saves a list', async () => {
    const { body: items } = await api.get('/api/v1/items');
    const mappedItemsId = items.map((item) => ({
      item: { id: item.id },
      quantity: 1,
    }));

    const list = {
      name: 'Test success',
      items: [...mappedItemsId],
      isCancelled: true,
      date: new Date(),
    };

    const { body } = await api.post('/api/v1/lists').send(list);

    expect(body.name).toBe(list.name.toLowerCase());
    const { body: bodyGet } = await api.get('/api/v1/lists').expect(200);

    expect(bodyGet[0].name).toBe(list.name.toLowerCase());
  });

  it.only('succesfully saves different lists', async () => {
    const { body: items } = await api.get('/api/v1/items');
    const mappedItemsId = items.map((item) => ({
      item: { id: item.id },
      quantity: Math.floor((Math.random() + 1) * 3),
    }));

    const list4 = {
      name: 'List feb 1',
      items: [mappedItemsId[1], mappedItemsId[3], mappedItemsId[4]],
      isCancelled: true,
      date: new Date(2023, 1, 10),
    };
    const list5 = {
      name: 'List feb 2',
      items: [mappedItemsId[0]],
      isCancelled: false,
      date: new Date(2023, 1, 13),
    };
    const list6 = {
      name: 'List jan',
      items: [mappedItemsId[1]],
      isCancelled: false,
      date: new Date(2023, 0, 10),
    };
    const list0 = {
      name: 'List march 1',
      items: [mappedItemsId[0], mappedItemsId[3], mappedItemsId[4]],
      isCancelled: true,
      date: new Date(2023, 2, 17),
    };
    const list1 = {
      name: 'list march 2',
      items: [mappedItemsId[1], mappedItemsId[5], mappedItemsId[6]],
      isCancelled: false,
      date: new Date(2023, 2, 21),
    };
    const list2 = {
      name: 'list april 1',
      items: [
        mappedItemsId[0],
        mappedItemsId[5],
        mappedItemsId[6],
        mappedItemsId[1],
        mappedItemsId[2],
      ],
      isCancelled: false,
      date: new Date(2023, 3, 2),
    };
    const list3 = {
      name: 'list april 2',
      items: [
        mappedItemsId[0],
        mappedItemsId[1],
        mappedItemsId[6],
        mappedItemsId[7],
      ],
      isCancelled: false,
      date: new Date(2023, 3, 10),
    };
    await api.post('/api/v1/lists').send(list0);
    await api.post('/api/v1/lists').send(list1);
    await api.post('/api/v1/lists').send(list2);
    await api.post('/api/v1/lists').send(list3);
    await api.post('/api/v1/lists').send(list4);
    await api.post('/api/v1/lists').send(list5);
    await api.post('/api/v1/lists').send(list6);
  });
});
