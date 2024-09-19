import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categorySelector } from "../../features/category/categorySlice"
import { authorCreate } from "../../features/author/authorSlice"


const AuthorForm = () => {
    const [authorName, setAuthorName] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const { categories } = useSelector(categorySelector)
    const dispatch = useDispatch()

    const changeHandle = (e) => {
        if (e.target.name === "selectCategory") {
            setSelectCategory(e.target.value)
        }
        if (e.target.name === "authorName") {
            setAuthorName(e.target.value)
        }
    }

    const authOnSubmit = (e) => {
        e.preventDefault()

        const newAuthor = {
            name: authorName,
            category_id: selectCategory
        }
        dispatch(authorCreate(newAuthor))
        resetField()
    }

    const resetField = () => {
        setAuthorName('')
        setSelectCategory('')
    }

    return (
        <div>
            <h2 className='text-xl mb-4'>Create Author</h2>
            <form onSubmit={authOnSubmit} className="space-y-4">
                <select
                    onChange={changeHandle}
                    value={selectCategory}
                    name="selectCategory"
                    className="select select-bordered w-full"
                >
                    {
                        categories &&
                        categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <input
                    onChange={changeHandle}
                    value={authorName}
                    name="authorName"
                    type="text"
                    placeholder="Author Name"
                    className="input input-bordered w-full"
                />
                <button className="btn btn-outline">Save</button>
            </form>
        </div>
    )
}

export default AuthorForm