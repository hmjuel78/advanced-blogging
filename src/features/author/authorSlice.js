import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryName: '',
}

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        CHAGE_CAT_NAME: (state, action) => {
            state.categoryName = action.payload
        },
    },
})

export const { CHAGE_CAT_NAME } = authorSlice.actions

export default authorSlice.reducer