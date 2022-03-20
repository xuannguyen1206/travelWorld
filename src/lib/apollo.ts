import { ApolloClient, InMemoryCache  } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: "https://travel-world-graphql.herokuapp.com/",
  ssrMode: true,
  defaultOptions:{
    query:{
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  },
  cache: new InMemoryCache()
});

export default apolloClient;