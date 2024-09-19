import { useDispatch, useSelector } from "react-redux"
import { authorDelete, authorFetch, authorSelector } from "../../features/author/authorSlice"
import { useEffect } from "react"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import { categorySelector } from "../../features/category/categorySlice"
import toast from "react-hot-toast"

const AuthorList = (props) => {
    const { setEditableAuthor } = props
    const { authors } = useSelector(authorSelector)
    const { categories } = useSelector(categorySelector)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(authorFetch())
    }, [dispatch])

    const authorEditHandle = (author) => {
        setEditableAuthor(author)
    }
    const authorDeleteHandle = (authorId) => {
        dispatch(authorDelete(authorId))
        toast.success('Author Successfully Delete !!!')
    }

    return (
        <div>
            <h2 className='text-xl mb-4'>Author List</h2>

            <div className="overflow-x-auto">
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
                                const category = categories.find(cat => parseInt(cat.id) === parseInt(author.category_id))

                                if (category) {
                                    return (
                                        <tr key={author.id}>
                                            <td>{idx + 1}</td>
                                            <td>{category.name}</td>
                                            <td>{author.name}</td>
                                            <td>
                                                <div className="flex gap-4 justify-end">
                                                    <button onClick={() => authorEditHandle(author)} className="btn btn-circle btn-sm hover:btn-info hover:text-white">
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
                        {/* {
                            authors?.map(author => (
                                <tr key={author.id}>
                                    <td>{author.id}</td>
                                    <td>{author.name}</td>
                                    <td>
                                        <button
                                            onClick={() => authorDeleteHandle(author.id)}
                                            className="btn btn-circle btn-sm hover:btn-error hover:text-white"
                                        >
                                            <MdOutlineDeleteOutline />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        } */}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AuthorList