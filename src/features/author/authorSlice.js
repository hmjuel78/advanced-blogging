import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleApiError } from '../../helpers/handleApiErrors'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/authors'

const initialState = {
    authors: [],
    isLoading: false,
    isError: false,
    error: false,
    authorsByCat: [],
}
export const authorFetch = createAsyncThunk('author/authorFetch',
    async (_, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(BASE_URL, {
                signal: signal
            })
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)

export const authorByCatId = createAsyncThunk('author/authorByCatId',
    async (id, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(`${BASE_URL}?categoryId=${id}`, {
                signal: signal
            })

            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)
export const authorCreate = createAsyncThunk('author/authorCreate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const newAuthor = await axios.post(BASE_URL, payload, {
                headers: {
                    'Content-type': 'application/json',
                },
                signal: signal
            })
            return newAuthor.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)

export const authorDelete = createAsyncThunk('author/authorDelete',
    async (payload, { rejectWithValue, signal }) => {
        try {
            await axios.delete(`${BASE_URL}/${payload}`, {
                signal: signal
            })
            return payload
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)

export const authorUpdate = createAsyncThunk('author/authorUpdate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await axios.put(`${BASE_URL}/${payload.id}`,
                {
                    name: payload.name,
                    categoryId: payload.categoryId
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    signal: signal
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
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
                state.authors[index].categoryId = action.payload.categoryId
            })
            .addCase(authorByCatId.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(authorByCatId.fulfilled, (state, action) => {
                state.isLoading = false
                state.authorsByCat = action.payload
            });
    }
})
export const authorSelector = (state => state.authorReducer)

export default authorSlice.reducer