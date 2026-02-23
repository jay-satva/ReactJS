import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[
        {
            id: 1, name: 'Laptop', price: 100000, quantity: 10,  brand: 'ASUS'
        },
        {
            id: 2, name: 'Tablet', price: 50000, quantity: 5,  brand: 'Samsung'
        },
        {
            id: 3, name: 'Smartphone', price: 120000, quantity: 12,  brand: 'Apple'
        },
        {
            id: 4, name: 'Headphones', price: 12000, quantity: 8,  brand: 'boat'
        },
        {
            id: 5, name: 'Smartwatch', price: 20000, quantity: 4,  brand: 'Firebolt'
        },
    ]
}

const inventorySlice = createSlice({
    name:'product', initialState,
    reducers:{
        deleteProduct: (state, action)=>{
          state.products = state.products.filter(
            (product)=>product.id!=action.payload
          )
        }
    }
})
export const { deleteProduct } = inventorySlice.actions;
export default inventorySlice.reducer