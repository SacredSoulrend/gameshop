const { User, Game, Genre, Order, Wishlist } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Query to get all genres
    genres: async () => {
      return await Genre.find();
    },
    // Query to get all games with optional genre and name filters
    games: async (parent, { genre, name }) => {
      const params = {};

      if (genre) {
        params.genre = genre;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Game.find(params).populate('genre');
    },
    // Query to get a specific game by ID
    game: async (parent, { _id }) => {
      return await Game.findById(_id).populate('genre');
    },
    // Query to get user's wishlist
    wishlist: async (parent, args, context) => {
      if (context.user) {
        const wishlist = await Wishlist.findOne({ user: context.user._id }).populate('games');
        return wishlist;
      }

      throw AuthenticationError;
    },
    // Query to get user information, including orders with populated products and genres
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.games',  
          populate: 'genre'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    // Query to get a specific order by ID with populated products and genres
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.games', 
          populate: 'genre'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    // Query for the checkout process, including creating an order and generating a Stripe session
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ games: args.games.map(({ _id }) => _id) }); 
      const line_items = [];

      for (const game of args.games) { 
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: game.name,
              description: game.description, 
              images: [`${url}/images/${game.image}`]
            },
            unit_amount: game.price * 100,
          },
          quantity: game.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    // Mutation to add a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Mutation to add a new order
    addOrder: async (parent, { games }, context) => {
      if (context.user) {
        const order = new Order({ games });  

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    // Mutation to update user information
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    // Mutation to update game quantity (e.g., when a game is purchased)
    updateGame: async (parent, { _id, quantity }, context) => {
      const decrement = Math.abs(quantity) * -1;

      return await Game.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    // New mutation to add a game to the user's wishlist
    addToWishlist: async (parent, { gameId }, context) => {
      if (context.user) {
        const wishlist = await Wishlist.findOneAndUpdate(
          { user: context.user._id },
          { $addToSet: { games: gameId } }, 
          { upsert: true, new: true }
        );
        return wishlist;
      }

      throw AuthenticationError;
    },
    // New mutation to remove a game from the user's wishlist
    removeFromWishlist: async (parent, { gameId }, context) => {
      if (context.user) {
        const wishlist = await Wishlist.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { games: gameId } },
          { new: true }
        );
        return wishlist;
      }

      throw AuthenticationError;
    },
    // Mutation for user login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
