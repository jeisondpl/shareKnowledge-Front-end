import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import { Provider } from 'react-redux'
import { store } from '../store/rootReducer'
import '../styles/globals.css'
import color from '../Themes/Color'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { SpLoading } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store)

  return (
    <div style={{ background: '#F5F5F5' }}>
      <Provider store={store}>
        <PersistGate loading={<SpLoading loading={true} />} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </div>
  )
}

export default MyApp
