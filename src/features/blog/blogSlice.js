import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3000/blogs"

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    blogs: [],
    editableBlog: null
}

export const blogFetch = createAsyncThunk("blog/blogFetch", async (payload) => {

    let url = `${BASE_URL}`

    const params = new URLSearchParams()

    if (payload.selectedCategory) {
        params.append('categoryId', payload.selectedCategory)
    }
    if (payload.selectedAuthor) {
        params.append('authorId', payload.selectedAuthor)
    }
    if (payload.selectedTag) {
        params.append('tags', payload.selectedTag)
    }
    if (payload.searchTitle) {
        params.append('title', payload.searchTitle)
    }

    params.append('_page', payload.currentPage || 1)
    params.append('_limit', payload.viewPerPage || 10)
    params.append('_embed', 'comments')
    params.append('_embed', 'likes')

    try {
        // Ensure the URL is correctly constructed only once
        const response = await axios.get(`${url}?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
})

export const blogCreate = createAsyncThunk("blog/blogCreate", async (content) => {
    const newTag = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
            "Content-type": "application/json"
        }
    })
    return newTag.json()
})

export const blogDelete = createAsyncThunk("blog/blogDelete", async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
    return id
})
export const blogUpdate = createAsyncThunk("blog/blogUpdate", async ({ payload, id, lastModifiedDate }) => {

    const newBlog = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            authorId: payload.authorId,
            categoryId: payload.categoryId,
            title: payload.title,
            desc: payload.desc,
            dateTime: payload.dateTime,
            lastModified: lastModifiedDate,
            tags: payload.tags
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    return newBlog.json()
})
export const singleBlog = createAsyncThunk("blog/singleBlog", async (id) => {

    let url = `${BASE_URL}`
    const params = new URLSearchParams()
    params.append('_embed', 'comments')
    params.append('_embed', 'likes')
    params.append('_expand', 'category')
    params.append('_expand', 'author')

    try {
        const response = await axios.get(`${url}/${id}?${params.toString()}`)
        return response.data
    } catch (error) {
        console.error("Error fetching blogs:", error)
        throw error
    }
})
export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        _EDITABLEBLOG: (state, action) => {
            state.editableBlog = action.payload
        }
    },
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
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
            })
            .addCase(blogUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.blogs.findIndex((blog) => blog.id === action.payload.id)
                state.blogs[index] = action.payload
            })
            .addCase(singleBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs = action.payload
            })
    }
})

export const { _EDITABLEBLOG } = blogSlice.actions
export const blogSelector = (state) => state.blogReducer

export default blogSlice.reducer
