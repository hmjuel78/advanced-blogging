import { useState, useEffect } from "react"
import AuthorForm from "../components/author/AuthorForm"
import CategoryForm from "../components/category/CategoryForm"

import { useDispatch, useSelector } from "react-redux"
import { categoryDelete, categoryFetch, categorySelector } from "../features/category/categorySlice"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import toast from "react-hot-toast"

import { authorDelete, authorFetch, authorSelector } from "../features/author/authorSlice"




const Categories = () => {

    const [editableCat, setEditableCat] = useState(null)
    const [editableAuthor, setEditableAuthor] = useState(null)
    const { authors } = useSelector(authorSelector)
    const { categories } = useSelector(categorySelector)
    const dispatch = useDispatch()


    const handleCatDelete = (catId) => {
        dispatch(categoryDelete(catId))
        toast.success('Category delete successfully!!')
    }

    const handleCatEdit = (cat) => {
        setEditableCat(cat)
    }

    const authorEditHandle = (author) => {
        setEditableAuthor(author)
    }
    const authorDeleteHandle = (authorId) => {
        dispatch(authorDelete(authorId))
        toast.success('Author Successfully Delete !!!')
    }

    useEffect(() => {
        dispatch(categoryFetch())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorFetch())
    }, [dispatch])


    return (
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto my-10 px-4">
            {/* Category Form */}
            <CategoryForm editableCat={editableCat} setEditableCat={setEditableCat} />

            {/* Categories list */}
            <div>
                <h2 className="text-xl mb-3">Category list</h2>
                <ul className="space-y-4 max-h-96 overflow-y-auto">
                    {
                        categories &&
                        categories.map(category => (
                            <li key={category.id} className="flex gap-4 w-full justify-between border border-black p-3 rounded items-center">
                                <span>{category.name}</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleCatEdit(category)}
                                        className="btn btn-circle btn-sm hover:btn-info hover:text-white">
                                        <MdOutlineModeEdit />
                                    </button>
                                    <button
                                        onClick={() => handleCatDelete(category.id)}
                                        className="btn btn-circle btn-sm hover:btn-error hover:text-white">
                                        <MdOutlineDeleteOutline />
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* Author Form */}

            <AuthorForm editableAuthor={editableAuthor} setEditableAuthor={setEditableAuthor} />


            <div>
                <h2 className='text-xl mb-4'>Author List</h2>

                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Category Name</th>
                                <th>Author Name</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                authors?.map((author, idx) => {
                                    const category = categories.find(cat => parseInt(cat.id) === parseInt(author.categoryId))

                                    if (category) {
                                        return (
                                            <tr key={author.id}>
                                                <td>{idx + 1}</td>
                                                <td>{category.name}</td>
                                                <td>{author.name}</td>
                                                <td>
                                                    <div className="flex gap-4 justify-end">
                                                        <button
                                                            onClick={() => authorEditHandle(author)}
                                                            className="btn btn-circle btn-sm hover:btn-info hover:text-white"
                                                        >
                                                            <MdOutlineModeEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => authorDeleteHandle(author.id)}
                                                            className="btn btn-circle btn-sm hover:btn-error hover:text-white"
                                                        >
                                                            <MdOutlineDeleteOutline />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Categories