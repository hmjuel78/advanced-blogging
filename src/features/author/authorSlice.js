import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthor } from './authorFetchAPI'

const initialState = {
    authorName: '',
    authors: [],
    isLoading: false,
    isError: false,
    error: false,
}
export const authorFetch = createAsyncThunk('author/authorFetch',
    async () => {
        const authors = getAuthor()
        return authors
    }
)
export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        CHAGE_CAT_NAME: (state, action) => {
            state.authorName = action.payload
        },

    },
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