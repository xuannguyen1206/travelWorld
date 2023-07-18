const { ApolloServer, gql } = require('apollo-server');
const CountryAPI = require('./src/datasource/country');
const PictureAPI = require('./src/datasource/picture');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/schema');
require('dotenv').config();
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      CountryAPI: new CountryAPI(),
      PictureAPI: new PictureAPI(),
    }
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});