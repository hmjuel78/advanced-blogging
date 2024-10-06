import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categorySelector } from "../../features/category/categorySlice"
import { authorCreate, authorSelector, authorUpdate } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"


const AuthorForm = (props) => {
    const { editableAuthor, setEditableAuthor } = props
    const [authorName, setAuthorName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const { categories } = useSelector(categorySelector)
    const { authors } = useSelector(authorSelector)
    const dispatch = useDispatch()

    const changeHandle = (e) => {
        if (e.target.name === "selectCategory") {
            setSelectedCategory(e.target.value)
        }
        if (e.target.name === "authorName") {
            setAuthorName(e.target.value)
        }
    }

    const authOnSubmit = (e) => {
        e.preventDefault()

        const newAuthor = {
            name: authorName.toLowerCase(),
            categoryId: selectedCategory
        }
        if (authors.find(auth => auth.name.toLowerCase() === authorName.toLowerCase() && auth.id !== editableAuthor?.id)) {
            return toast.error("This name already taken!!!")
        }
        if (editableAuthor) {
            dispatch(authorUpdate({
                id: editableAuthor.id,
                name: authorName.toLowerCase(),
                categoryId: selectedCategory
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
        setSelectedCategory('')
    }

    const cancelEditModeHandle = () => {
        setEditableAuthor(null)
        resetField()
    }

    useEffect(() => {
        if (editableAuthor) {
            setSelectedCategory(editableAuthor?.categoryId)
            setAuthorName(editableAuthor?.name)
        } else {
            resetField()
        }
    }, [editableAuthor])

    return (
        <div>
            <h2 className='text-xl mb-4'>Create Author</h2>
            <form onSubmit={authOnSubmit} className="space-y-4">
                <DropdownWithSearch
                    selectDropData={selectedCategory}
                    setSelectDropData={setSelectedCategory}
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
                {editableAuthor &&
                    <button onClick={() => cancelEditModeHandle()} className="btn btn-error ml-2">Cancel</button>
                }
            </form>
        </div>
    )
}

export default AuthorForm