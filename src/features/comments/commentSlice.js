import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/comments'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    comments: []
}

export const commentFetch = createAsyncThunk('comment/commentFetch',
    async () => {
        const comments = await fetch(BASE_URL)
        return comments.json()
    }
)

export const commentCreate = createAsyncThunk('comment/commentCreate',
    async (content) => {

        const newComment = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newComment.json()
    }
)

export const commentUpdate = createAsyncThunk('comment/commentUpdate',
    async (content) => {
        const newComment = await fetch(`${BASE_URL}/${content.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: content.name
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newComment.json()
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