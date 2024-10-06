import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { handleApiError } from "../../helpers/handleApiErrors"

const BASE_URL = "http://localhost:3000/blogs"

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    blogs: [],
    editableBlog: null
}

export const blogFetch = createAsyncThunk("blog/blogFetch", async (payload, { rejectWithValue, signal }) => {

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
    if (payload.currentPage) {
        params.append('_page', payload.currentPage)
    }
    if (payload.viewPerPage) {
        params.append('_limit', payload.viewPerPage)
    }

    params.append('_embed', 'comments')
    params.append('_embed', 'likes')

    try {
        const response = await axios.get(`${url}?${params.toString()}`, {
            signal: signal,
        })
        return response.data
    } catch (error) {
        return rejectWithValue(handleApiError(error))
    }
})

export const blogCreate = createAsyncThunk("blog/blogCreate",
    async (payload, { rejectWithValue, signal }) => {

        try {
            const response = await axios.post(BASE_URL, payload, {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            })
            return response.data

        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)

export const blogDelete = createAsyncThunk("blog/blogDelete",
    async (payload) => {
        await axios.delete(`${BASE_URL}/${payload}?_dependent=comments`);
        return payload
    }
)
export const blogUpdate = createAsyncThunk("blog/blogUpdate",
    async ({ payload, id, lastModifiedDate }, { rejectWithValue, signal }) => {
        try {
            const newBlog = await axios.put(
                `${BASE_URL}/${id}`,
                {
                    authorId: payload.authorId,
                    categoryId: payload.categoryId,
                    title: payload.title,
                    desc: payload.desc,
                    dateTime: payload.dateTime,
                    lastModified: lastModifiedDate,
                    tags: payload.tags
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    signal: signal
                }
            )
            return newBlog.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)
export const singleBlog = createAsyncThunk("blog/singleBlog",
    async (id, { rejectWithValue, signal }) => {

        let url = `${BASE_URL}`
        const params = new URLSearchParams()
        params.append('_embed', 'comments')
        params.append('_embed', 'likes')
        params.append('_expand', 'category')
        params.append('_expand', 'author')

        try {
            const response = await axios.get(`${url}/${id}?${params.toString()}`, {
                signal: signal
            })
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)
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
                console.log(action.payload)
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
            })
            .addCase(blogUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.blogs.findIndex((blog) => blog.id === action.payload)
                state.blogs[index] = action.payload
            })
            .addCase(blogUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
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
