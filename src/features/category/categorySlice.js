import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/catagories'

const initialState = {
    isLoading: true,
    isError: false,
    error: false,
    categories: []
}

export const categoryFetch = createAsyncThunk('category/categoryFetch',
    async (signal) => {
        try {
            const categories = await fetch(BASE_URL, { signal })
            return categories.json()
            // return categories
        } catch (error) {
            // rejectWithValue(error)
            console.log(error)
        }
    }
)

export const categoryCreate = createAsyncThunk('category/categoryCreate',
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

export const categoryDelete = createAsyncThunk('category/categoryDelete',
    async (id) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        return id
    }
)
export const categoryUpdate = createAsyncThunk('category/categoryUpdate',
    async (content) => {
        const newCategory = await fetch(`${BASE_URL}/${content.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: content.name
            }),
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
            .addCase(categoryCreate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(categoryCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.categories.push(action.payload)
            })
            .addCase(categoryCreate.rejected, (state, action) => {
                state.error = action.error
            })
            .addCase(categoryDelete.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(categoryDelete.fulfilled, (state, action) => {
                state.isLoading = false
                state.categories = state.categories.filter(category => category.id !== action.payload)
            })
            .addCase(categoryUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.categories.findIndex(category => category.id === action.payload.id)
                state.categories[index].name = action.payload.name
            });

    }
})


export const categorySelector = (state => state.categoryReducer)

export default categorySlice.reducer