import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/catagories'

const initialState = {
    authors: [],
    isLoading: false,
    isError: false,
    error: false,
}
export const authorFetch = createAsyncThunk('author/authorFetch',
    async () => {
        const authors = fetch(BASE_URL)
        return authors.json()
    }
)
export const authorPost = createAsyncThunk('author/authorPost',
    async (content) => {
        const newAuthor = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newAuthor.json()
    }
)

export const authorDelete = createAsyncThunk('author/authorDelete',
    async (id) => {
        const categoriesDetele = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        return categoriesDetele.json()
    }
)

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authorFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.authors = action.payload
            })
            .addCase(authorFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
    }
})
export const authorSelector = (state => state.authorReducer)
export const { CHAGE_CAT_NAME } = authorSlice.actions

export default authorSlice.reducer