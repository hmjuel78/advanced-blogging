import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleApiError } from '../../helpers/handleApiErrors'

const BASE_URL = 'http://localhost:3000/categories'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    categories: [],
    categoryById: []
}

export const categoryFetch = createAsyncThunk('category/categoryFetch',
    async (_, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(BASE_URL, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)
export const categoryCreate = createAsyncThunk('category/categoryCreate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await axios.post(BASE_URL, payload, {
                headers: {
                    'Content-type': 'application/json',
                },
                signal: signal
            })
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)
export const categoryDelete = createAsyncThunk('category/categoryDelete',
    async (payload, { rejectWithValue, signal }) => {

        try {
            await axios.delete(`${BASE_URL}/${payload}?_dependent=authors`, signal)
            return payload
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)
export const categoryUpdate = createAsyncThunk('category/categoryUpdate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await axios.put(`${BASE_URL}/${payload.id}`,
                {
                    name: payload.name
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)
export const categoryFetchById = createAsyncThunk('category/categoryFetchById',
    async (id, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(`${BASE_URL}?id=${id}`, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
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
            })
            .addCase(categoryFetchById.fulfilled, (state, action) => {
                state.isLoading = false
                state.categoryById = action.payload
            });

    }
})


export const categorySelector = (state => state.categoryReducer)

export default categorySlice.reducer