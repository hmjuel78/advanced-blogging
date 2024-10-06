import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleApiError } from '../../helpers/handleApiErrors'

const BASE_URL = 'http://localhost:3000'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    likes: []
}

export const likeFetch = createAsyncThunk('like/likeFetch',
    async (_, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(`${BASE_URL}/likes`, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)
export const likeCreate = createAsyncThunk('like/likeCreate',
    async (payload, { rejectWithValue, signal }) => {
        console.log(payload)
        try {
            const response = await axios.post(`${BASE_URL}/likes?blogId=${payload}`,
                {

                }, signal)
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }

    }
)


export const likeSlice = createSlice({
    name: 'like',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(likeFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(likeFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.likes = action.payload
            })
            .addCase(likeFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload.message
            });

    }
})


export const likeSelector = (state => state.likeReducer)

export default likeSlice.reducer