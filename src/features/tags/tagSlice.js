import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/tags'

const initialState = {
    isLoading: true,
    isError: false,
    error: false,
    tags: [],
    tagsByName: []
}

export const tagFetch = createAsyncThunk('tag/tagFetch',
    // eslint-disable-next-line no-unused-vars
    async (keyword = null) => {
        let url = BASE_URL;
        // if(keyword){
        //     url = BASE_URL + "?name="+keyword
        // }
        const tags = (await fetch(url)).json()
        return tags;
    }
)

export const tagCreate = createAsyncThunk('tag/tagCreate',
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
// export const tagSearchByName = createAsyncThunk('tag/tagSearchByName',
//     async (content) => {
//         const newTag = await fetch(`${BASE_URL}?name=${content}`)
//         return newTag.json()
//     }
// )

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        updateSearchTags: state => {
            state.tagsByName = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(tagFetch.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(tagFetch.fulfilled, (state, action) => {
                state.isLoading = false
                // state.tags = action.payload

                if (action.meta.arg) {
                    state.tagsByName = action.payload.filter(item => item.name.toLowerCase().includes(action.meta.arg))
                    // state.searchTags = action.payload
                } else {
                    state.tags = action.payload
                }
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
            })
        // .addCase(tagSearchByName.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.tagsByName = action.payload
        // });

    }
})


export const tagSelector = (state => state.tagReducer)
export const { updateSearchTags } = tagSlice.actions
export default tagSlice.reducer