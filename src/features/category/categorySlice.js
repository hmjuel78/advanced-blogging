import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryName: '',
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        CHAGE_CAT_NAME: (state, action) => {
            state.categoryName = action.payload
        },
    },
})

export const { CHAGE_CAT_NAME } = categorySlice.actions

export default categorySlice.reducer