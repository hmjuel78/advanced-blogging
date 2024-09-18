import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategory } from './categoryFetchAPI'

const initialState = {
    categoryName: '',
    isLoading: false,
    isError: false,
    error: false,
    categories: []
}

export const categoryFetch = createAsyncThunk('category/categoryFetch',
    async () => {
        const categories = getCategory()
        return categories
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        CHAGE_CAT_NAME: (state, action) => {
            state.categoryName = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(categoryFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(categoryFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.categories = action.payload
            })
            .addCase(categoryFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
    }
})


export const categorySelector = (state => state.categoryReducer)

export const { CHAGE_CAT_NAME } = categorySlice.actions

export default categorySlice.reducer