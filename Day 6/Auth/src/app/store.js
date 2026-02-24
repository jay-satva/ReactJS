import {configureStore} from '@reduxjs/toolkit'
import dashReducer from '../redux/slice/dashSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root', storage
}
const persistedReducer = persistReducer(persistConfig, dashReducer)
export const store = configureStore({
  reducer: {
    dashboard: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)