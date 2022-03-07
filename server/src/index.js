const { ApolloServer, gql } = require('apollo-server');
const CountryAPI = require('./datasource/country');
const PictureAPI = require('./datasource/picture');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
  
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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});