import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import { Provider } from 'react-redux'
import { store } from '../store/rootReducer'
import '../styles/globals.css'
import color from '../Themes/Color'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ background: '#F5F5F5' }}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <style jsx global>
            {`
              body {
                background: ${color.backgroupd};
              }
            `}
          </style>
        </ApolloProvider>
      </Provider>
    </div>
  )
}

export default MyApp
