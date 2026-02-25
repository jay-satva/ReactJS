import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import uiReducer from '../redux/slices/uiSlice'
import authReducer from '../redux/slices/authSlice'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})
const persistConfig = {
    key: 'root', storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)