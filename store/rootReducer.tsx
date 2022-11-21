import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
// import { useRouter } from 'next/router'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //blacklist: ['navigation'], // navigation will not be persisted
  //whitelist: ['navigation'], // only navigation will be persisted
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
})


//persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
