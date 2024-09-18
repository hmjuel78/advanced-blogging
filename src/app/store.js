import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/category/categorySlice'
import authorReducer from '../features/author/authorSlice'


export const store = configureStore({
    reducer: {
        categoryReducer,
        authorReducer
    },
})