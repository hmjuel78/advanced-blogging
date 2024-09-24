import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryDelete, categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import toast from "react-hot-toast"

const CategoryList = (props) => {
    const { setEditableCat } = props
    const { categories } = useSelector(categorySelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryFetch())
    }, [dispatch])

    const handleCatDelete = (catId) => {
        dispatch(categoryDelete(catId))
        toast.success('Category delete successfully!!')
    }

    const handleCatEdit = (cat) => {
        setEditableCat(cat)
    }


    return (
        <div>
            <h2 className="text-xl mb-3">Category list</h2>
            <ul className="space-y-4 max-h-96 overflow-y-auto">
                {
                    categories &&
                    categories.map(category => (
                        <li key={category.id} className="flex gap-4 w-full justify-between border border-black p-3 rounded">
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
    )
}
export default CategoryList