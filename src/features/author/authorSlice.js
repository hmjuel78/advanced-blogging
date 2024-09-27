import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/authors'

const initialState = {
    authors: [],
    isLoading: false,
    isError: false,
    error: false,
    authorsByCat: [],
}
export const authorFetch = createAsyncThunk('author/authorFetch',
    async () => {
        const authors = await fetch(BASE_URL)
        return authors.json()
    }
)
export const authorByCatId = createAsyncThunk('author/authorByCatId',
    async (id) => {
        const authors = await fetch(`${BASE_URL}?category_id=${id}`)
        return authors.json()
    }
)
export const authorCreate = createAsyncThunk('author/authorCreate',
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
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        return id
    }
)

export const authorUpdate = createAsyncThunk('author/authorUpdate',
    async (content) => {
        const newAuthor = await fetch(`${BASE_URL}/${content.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: content.name,
                category_id: content.category_id
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newAuthor.json()
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
            .addCase(authorCreate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.authors.push(action.payload)
            })
            .addCase(authorCreate.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
            .addCase(authorDelete.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorDelete.fulfilled, (state, action) => {
                state.isLoading = false
                state.authors = state.authors.filter(author => author.id !== action.payload)
            })
            .addCase(authorUpdate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.authors.findIndex(author => author.id === action.payload.id)
                state.authors[index].name = action.payload.name
                state.authors[index].category_id = action.payload.category_id
            })
            .addCase(authorByCatId.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorByCatId.fulfilled, (state, action) => {
                state.isLoading = false
                state.authorsByCat = action.payload
                console.log(132)
            });
    }
})
export const authorSelector = (state => state.authorReducer)

export default authorSlice.reducer