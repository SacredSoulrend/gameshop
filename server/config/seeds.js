const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'RPG' },
    { name: 'First Person Shooter' },
    { name: 'Action Adventure' },
    { name: 'Simulation' },
    { name: 'Strategy' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Epic Fantasy Quest',
      description:
        'Embark on an epic journey through a magical world filled with mythical creatures and challenging quests.',
      image: 'epic-fantasy-quest.jpg',
      category: categories[0]._id,
      price: 29.99,
      quantity: 100
    },
    {
      name: 'Battlefield Heroes',
      description:
        'Join the intense battlefield, choose your side, and engage in epic first-person shooter battles.',
      image: 'battlefield-heroes.jpg',
      category: categories[1]._id,
      price: 39.99,
      quantity: 50
    },
    {
      name: 'Space Explorer',
      description:
        'Embark on a space adventure, explore distant galaxies, and encounter extraterrestrial life.',
      image: 'space-explorer.jpg',
      category: categories[2]._id,
      price: 49.99,
      quantity: 75
    },
    {
      name: 'Life Simulator',
      description:
        'Experience a virtual life simulation where you can create, customize, and control every aspect of your character.',
      image: 'life-simulator.jpg',
      category: categories[3]._id,
      price: 34.99,
      quantity: 80
    },
    {
      name: 'Kingdom Conqueror',
      description:
        'Build and lead your own kingdom, strategize your moves, and conquer rival territories in this strategy game.',
      image: 'kingdom-conqueror.jpg',
      category: categories[4]._id,
      price: 44.99,
      quantity: 60
    },
    // Add more video game products as needed
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[1]._id, products[2]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
