import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/catagories'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    categories: []
}

export const categoryFetch = createAsyncThunk('category/categoryFetch',
    async () => {
        const categories = await fetch(BASE_URL)
        return categories.json()
    }
)

export const categoryPost = createAsyncThunk('category/categoryPost',
    async (content) => {
        const newCategory = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newCategory.json()
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
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
            .addCase(categoryPost.fulfilled, (state, action) => {
                state.categories.push(action.payload)
                // console.log(action.payload, 'action-payload')
            })
            .addCase(categoryPost.rejected, (state, action) => {
                state.error = action.error
                console.log(action.error)
            })

    }
})


export const categorySelector = (state => state.categoryReducer)

export const { CHAGE_CAT_NAME } = categorySlice.actions

export default categorySlice.reducer