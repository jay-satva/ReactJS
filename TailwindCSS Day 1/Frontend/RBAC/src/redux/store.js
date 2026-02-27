import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import uiReducer from '../redux/slices/uiSlice'
import authReducer from '../redux/slices/authSlice'
import storage from 'redux-persist/lib/storage'
import {injectStore} from '../services/api'
import usersReducer from '../redux/slices/usersSlice'
import employeesReducer from '../redux/slices/employeesSlice'
import projectsReducer from '../redux/slices/projectsSlice'
import rolesReducer from '../redux/slices/rolesSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    users: usersReducer,
    employees: employeesReducer,
    projects: projectsReducer,
    roles: rolesReducer
})
const persistConfig = {
    key: 'root', storage, whitelist: ['auth', 'ui'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})
injectStore(store)

export const persistor = persistStore(store)