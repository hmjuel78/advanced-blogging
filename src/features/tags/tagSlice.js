import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/tags'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    tags: []
}

export const tagFetch = createAsyncThunk('tag/tagFetch',
    async () => {
        const tags = await fetch(BASE_URL)
        return tags.json()
    }
)

export const tagCreate = createAsyncThunk('tag/tagCreate',
    async (content) => {
        console.log(content)
        const newTag = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newTag.json()
    }
)

export const tagDelete = createAsyncThunk('tag/tagDelete',
    async (id) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        return id
    }
)
export const tagUpdate = createAsyncThunk('tag/tagUpdate',
    async (content) => {
        const newTag = await fetch(`${BASE_URL}/${content.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: content.name
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newTag.json()
    }
)

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(tagFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(tagFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.tags = action.payload
            })
            .addCase(tagFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
            .addCase(tagCreate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(tagCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.tags.push(action.payload)
            })
            .addCase(tagCreate.rejected, (state, action) => {
                state.error = action.error
            })
            .addCase(tagDelete.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(tagDelete.fulfilled, (state, action) => {
                state.isLoading = false
                state.tags = state.tags.filter(tag => tag.id !== action.payload)
            })
            .addCase(tagUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.tags.findIndex(tag => tag.id === action.payload.id)
                state.tags[index].name = action.payload.name
            });

    }
})


export const tagSelector = (state => state.tagReducer)

export default tagSlice.reducer