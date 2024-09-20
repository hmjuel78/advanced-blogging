import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/blogs'

const initialState = {
    isLoading: true,
    isError: false,
    error: false,
    blogs: []
}

export const blogFetch = createAsyncThunk('blog/blogFetch',
    async () => {
        const blogs = await fetch(BASE_URL)
        return blogs.json()
    }
)

export const blogCreate = createAsyncThunk('blog/blogCreate',
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

export const blogDelete = createAsyncThunk('blog/blogDelete',
    async (id) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        return id
    }
)
export const blogUpdate = createAsyncThunk('blog/blogUpdate',
    async (content) => {
        const newBlog = await fetch(`${BASE_URL}/${content.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: content.name
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newBlog.json()
    }
)

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(blogFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(blogFetch.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs = action.payload
            })
            .addCase(blogFetch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
            .addCase(blogCreate.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(blogCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs.push(action.payload)
            })
            .addCase(blogCreate.rejected, (state, action) => {
                state.error = action.error
            })
            .addCase(blogDelete.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(blogDelete.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
            })
            .addCase(blogUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.blogs.findIndex(blog => blog.id === action.payload.id)
                state.blogs[index].name = action.payload.name
            });

    }
})


export const blogSelector = (state => state.blogReducer)

export default blogSlice.reducer