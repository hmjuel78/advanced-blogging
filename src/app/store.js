import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/category/categorySlice'
import authorReducer from '../features/author/authorSlice'
import tagReducer from '../features/tags/tagSlice'
import blogReducer from '../features/blog/blogSlice'
import commentReducer from '../features/comments/commentSlice'


export const store = configureStore({
    reducer: {
        categoryReducer,
        authorReducer,
        tagReducer,
        blogReducer,
        commentReducer,
    },
})