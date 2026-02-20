import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchMovie = createAsyncThunk(
    'movie/fetchMovie',
    //this is a action type prefix, redux works using this only
    //this string is ID of async action which is needed 
    async(searchItem) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json()

        return data.filter((item)=>item.title.toLowerCase().includes(searchItem.toLowerCase()))
    }
)

const initialState = {
    loading: false, movies: [], error: null
}

const movieSlice = createSlice({
    name: 'movie', reducers: {}, initialState,
    extraReducers: (builder) =>{
        builder
        .addCase(fetchMovie.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchMovie.fulfilled, (state, action)=>{
            state.loading = false,
            state.movies = action.payload
        })
        .addCase(fetchMovie.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
})
export default movieSlice.reducer