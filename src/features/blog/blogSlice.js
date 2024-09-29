import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/blogs'

const initialState = {
    isLoading: false,
    isError: false,
    error: false,
    blogs: [],
    editableBlog: null
}

export const blogFetch = createAsyncThunk('blog/blogFetch',
    async (filter) => {
        let url = BASE_URL
        console.log(filter)
        if (filter) {
            url = `${BASE_URL}?`
            if (filter.categoryId && filter.authorId && filter.tagId) {
                url = `${url}categoryId=${filter.categoryId}&authorId=${filter.authorId}&tags=${filter.tagId}`
            } else if (filter.categoryId && filter.authorId) {
                url = `${url}categoryId=${filter.categoryId}&authorId=${filter.authorId}`
            } else if (filter.categoryId && filter.tagId) {
                url = `${url}categoryId=${filter.categoryId}&tags=${filter.tagId}`
            } else if (filter.categoryId) {
                url = `${url}categoryId=${filter.categoryId}`
            } else if (filter.authorId) {
                url = `${url}authorId=${filter.authorId}`
            } else if (filter.tagId) {
                url = `${url}tags=${filter.tagId}`
            } else if (filter.title) {
                url = `${url}title=${filter.title}`
            }
        }

        const blogs = await fetch(url)
        return blogs.json()
    }
)

export const blogCreate = createAsyncThunk('blog/blogCreate',
    async (content) => {
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
    async ({ content, id, lastModifiedDate }) => {
        const newBlog = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                authorId: content.authorId,
                categoryId: content.categoryId,
                title: content.title,
                desc: content.desc,
                dateTime: content.dateTime,
                lastModified: lastModifiedDate,
                tags: content.tags,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        return newBlog.json()
    }
)
export const singleBlog = createAsyncThunk('blog/singleBlog',
    async (id) => {
        const single = await fetch(`${BASE_URL}/${id}`)
        return single.json()
    }
)
export const blogSlice = createSlice({
    name: 'blog',
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
                state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
            })
            .addCase(blogUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.blogs.findIndex(blog => blog.id === action.payload.id)
                state.blogs[index] = action.payload
            })
            .addCase(singleBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs = action.payload
            });

    }
})

export const { _EDITABLEBLOG } = blogSlice.actions
export const blogSelector = (state => state.blogReducer)

export default blogSlice.reducer