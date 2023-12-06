const db = require('./connection');
const { User, Game, Genre } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Genre', 'genres');
  await cleanDB('Game', 'games');
  await cleanDB('User', 'users');

  const genres = await Genre.insertMany([
    { name: 'RPG' },
    { name: 'FPS' },
    { name: 'Action Adventure' },
    { name: 'Simulation' },
    { name: 'Strategy' }
  ]);

  console.log('genres seeded');

  const games = await Game.insertMany([
    {
      name: 'Epic Fantasy Quest',
      description:
        'Embark on an epic journey through a magical world filled with mythical creatures and challenging quests.',
      image: 'epic-fantasy-quest.jpg',
      genre: genres[0]._id,
      price: 29.99,
      quantity: 100
    },
    {
      name: 'Battlefield Heroes',
      description:
        'Join the intense battlefield, choose your side, and engage in epic first-person shooter battles.',
      image: 'battlefield-heroes.jpg',
      genre: genres[1]._id,
      price: 39.99,
      quantity: 50
    },
    {
      name: 'Space Explorer',
      description:
        'Embark on a space adventure, explore distant galaxies, and encounter extraterrestrial life.',
      image: 'space-explorer.jpg',
      genre: genres[2]._id,
      price: 49.99,
      quantity: 75
    },
    {
      name: 'Life Simulator',
      description:
        'Experience a virtual life simulation where you can create, customize, and control every aspect of your character.',
      image: 'life-simulator.jpg',
      genre: genres[3]._id,
      price: 34.99,
      quantity: 80
    },
    {
      name: 'Kingdom Conqueror',
      description:
        'Build and lead your own kingdom, strategize your moves, and conquer rival territories in this strategy game.',
      image: 'kingdom-conqueror.jpg',
      genre: genres[4]._id,
      price: 44.99,
      quantity: 60
    },
    // Add more video game products as needed
  ]);

  console.log('games seeded');

  await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@testmail.com',
    password: 'password12345',
    orders: [
      {
        games: [games[0]._id, games[1]._id, games[2]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
