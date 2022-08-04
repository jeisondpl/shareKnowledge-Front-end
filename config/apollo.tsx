import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as fetch from 'cross-fetch'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  fetch: fetch as any,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  // import { useSelector } from 'react-redux'
  // import { RootState } from '../store/rootReducer'
  // const state = useSelector((state: RootState) => state) || {}

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
