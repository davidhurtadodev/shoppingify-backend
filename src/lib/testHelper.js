const initialItems = [
  {
    name: 'Orange juice',
    category: 'Drinks',
  },
  {
    name: 'Coca cola',
    category: 'drinks',
  },
  {
    name: 'Rice (1kg)',
    category: 'Cereals',
  },
  {
    name: 'chicken',
    category: 'meat',
  },
  {
    name: 'Water 1L',
    category: 'Drinks',
  },
  {
    name: 'Cheese 1Kg',
    category: 'meat',
  },
  {
    name: 'Bread',
    category: 'Cereals',
  },
];
const postAllItems = async (items, api) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    await api.post('/api/v1/items').send(item);
  }
};

module.exports = { initialItems, postAllItems };
