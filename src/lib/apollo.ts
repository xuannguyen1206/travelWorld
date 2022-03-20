import { ApolloClient, InMemoryCache  } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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