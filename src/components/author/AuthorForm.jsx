import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categorySelector } from "../../features/category/categorySlice"
import { authorCreate, authorUpdate } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"


const AuthorForm = (props) => {
    const { editableAuthor, setEditableAuthor } = props
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
            categoryId: selectCategory
        }
        if (editableAuthor) {
            dispatch(authorUpdate({
                id: editableAuthor.id,
                name: authorName,
                categoryId: selectCategory
            }))
            toast.success('Author update successfully!!')
        } else {
            dispatch(authorCreate(newAuthor))
            toast.success('Author Create successfully!!')
        }
        setEditableAuthor(null)
        resetField()
    }

    const resetField = () => {
        setAuthorName('')
        setSelectCategory('')
    }

    useEffect(() => {
        if (editableAuthor) {
            setSelectCategory(editableAuthor?.categoryId)
            setAuthorName(editableAuthor?.name)
        }
    }, [editableAuthor])

    return (
        <div>
            <h2 className='text-xl mb-4'>Create Author</h2>
            <form onSubmit={authOnSubmit} className="space-y-4">
                <DropdownWithSearch
                    selectDropData={selectCategory}
                    setSelectDropData={setSelectCategory}
                    isSearch={false}
                    dropDatas={categories}
                    mapKey="name"
                />

                <input
                    onChange={changeHandle}
                    value={authorName}
                    name="authorName"
                    type="text"
                    placeholder="Author Name"
                    className="input input-bordered w-full"
                />
                <button className="btn btn-outline">
                    {editableAuthor !== null ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default AuthorForm