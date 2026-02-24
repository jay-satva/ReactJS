import { createSlice } from "@reduxjs/toolkit";
import { productsData } from "../../products";

const initialState = {
    products: productsData
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