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
    name: 'chicken breast 1kg',
    category: 'meat',
  },
  {
    name: 'Tuna 1kg',
    category: 'meat',
  },
  {
    name: 'Water 1L',
    category: 'Drinks',
  },
  {
    name: 'Cheese 1Kg',
    category: 'Dairy',
  },
  {
    name: 'Yogur',
    category: 'Dairy',
  },
  {
    name: 'Bread',
    category: 'Cereals',
  },
  {
    name: 'Pasta 1kg',
    category: 'Cereals',
  },
  {
    name: 'Beer',
    category: 'Drinks',
  },
  {
    name: 'Tomato 1kg',
    category: 'vegetables',
  },
  {
    name: 'Onions 1kg',
    category: 'vegetables',
  },
  {
    name: 'Spinach (bag)',
    category: 'vegetables',
  },
  {
    name: 'Banana (1kg)',
    category: 'fruits',
  },
  {
    name: 'Strawberry (1kg)',
    category: 'fruits',
  },
];
const postAllItems = async (items, api) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    await api.post('/api/v1/items').send(item);
  }
};

module.exports = { initialItems, postAllItems };
