const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Game {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Wishlist {
    _id: ID
    user: User
    games: [Game]
  }

  type Order {
    _id: ID
    purchaseDate: String
    games: [Game]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input GameInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    games(category: ID, name: String): [Game]
    game(_id: ID!): Game
    user: User
    order(_id: ID!): Order
    wishlist: Wishlist 
    checkout(games: [GameInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(games: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateGame(_id: ID!, quantity: Int!): Game
    login(email: String!, password: String!): Auth
    addToWishlist(gameId: ID!): Wishlist
    removeFromWishlist(gameId: ID!): Wishlist 
  }
`;

module.exports = typeDefs;
