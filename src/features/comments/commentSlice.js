import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleApiError } from '../../helpers/handleApiErrors'

const BASE_URL = 'http://localhost:3000'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    comments: []
}

export const commentFetch = createAsyncThunk('comment/commentFetch',
    async (_, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(`${BASE_URL}/comments`, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)

export const commentCreate = createAsyncThunk('comment/commentCreate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await axios.post(`${BASE_URL}/comments`, payload, {
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

export const commentUpdate = createAsyncThunk('comment/commentUpdate',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await axios.put(`${BASE_URL}/comments/${payload.id}`,
                {
                    name: payload.name
                },
                {
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

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(commentFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(commentFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.comments = action.payload
            })
            .addCase(commentFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
            .addCase(commentCreate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(commentCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.comments.push(action.payload)
            })
            .addCase(commentCreate.rejected, (state, action) => {
                state.error = action.error
            })
            .addCase(commentUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.comments.findIndex(comment => comment.id === action.payload.id)
                state.comments[index].name = action.payload.name
            });

    }
})


export const commentSelector = (state => state.commentReducer)

export default commentSlice.reducer