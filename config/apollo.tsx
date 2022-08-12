import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as fetch from 'cross-fetch'
// require('dotenv').config({ path: '.env' })

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
  // uri: 'https://share-knowledge-front-end-deploy.vercel.app/api/graphql',

  fetch: fetch as any,
})

const authLink = setContext((_, { headers }) => {
  // console.log(process.env.DB_ENDPOINT)
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: authLink.concat(httpLink),
})

export default client
