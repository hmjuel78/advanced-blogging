import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"

const CategoryList = () => {
    const { categories } = useSelector(categorySelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryFetch())
    }, [dispatch])

    return (
        <div>
            <h2 className="text-xl mb-3">Category list</h2>
            <ul className="space-y-4">
                {
                    categories &&
                    categories.map(category => (
                        <li key={category.id} className="flex gap-4 w-full justify-between border border-black p-3 rounded">
                            <span>{category.name}</span>
                            <div className="flex gap-4">
                                <button className="btn btn-circle btn-sm hover:btn-info hover:text-white">
                                    <MdOutlineModeEdit />
                                </button>
                                <button className="btn btn-circle btn-sm hover:btn-error hover:text-white">
                                    <MdOutlineDeleteOutline />
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default CategoryList