import { ApolloClient, InMemoryCache  } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: "https://travel-world-graphql.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default apolloClient;