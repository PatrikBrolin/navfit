

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/jk7qdguv99a0/explore?access_token=yfQme2Q5JFF4tgzwOfuwfKT0iyH-3VRX2AQb5lIwq20',
  headers: {
    Authorization: 'Bearer yfQme2Q5JFF4tgzwOfuwfKT0iyH-3VRX2AQb5lIwq20'
  },
  cache: new InMemoryCache(),
});