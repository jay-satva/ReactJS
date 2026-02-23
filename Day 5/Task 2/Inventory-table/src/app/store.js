import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/inventory/inventorySlice'

export const store = configureStore({
    reducer:{
        product: productReducer,
    }
})