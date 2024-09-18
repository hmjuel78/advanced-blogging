import { useDispatch, useSelector } from "react-redux"
import { authorFetch, authorSelector } from "../../features/author/authorSlice"
import { useEffect } from "react"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import { categorySelector } from "../../features/category/categorySlice"

const AuthorList = () => {
    const { authors } = useSelector(authorSelector)
    const { categories, isLoading, error } = useSelector(categorySelector)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(authorFetch())
    }, [dispatch])



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
                        {error ? (<tr><td className="text-error">{error}</td></tr>)
                            : isLoading ?
                                <tr>
                                    <td>
                                        <div className="flex w-full flex-col gap-4">
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </td>
                                </tr>
                                : categories && categories.length > 0 ?
                                    categories?.map((category, idx) => (
                                        <tr key={category.id}>
                                            <th>{idx + 1}</th>
                                            <td>{category.name}</td>
                                            <td>
                                                <div className="flex gap-3">
                                                    {
                                                        authors?.map(author => {
                                                            if (author.category_id === category.id) {
                                                                return <span key={author.id}>{author.name}</span>
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex gap-4 justify-end">
                                                    <button className="btn btn-circle btn-sm hover:btn-info hover:text-white">
                                                        <MdOutlineModeEdit />
                                                    </button>
                                                    <button className="btn btn-circle btn-sm hover:btn-error hover:text-white">
                                                        <MdOutlineDeleteOutline />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td><h2 className="text-xl">Category not found</h2></td></tr>
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AuthorList