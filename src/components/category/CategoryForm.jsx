import { useDispatch, useSelector } from "react-redux"
import { categorySelector, CHAGE_CAT_NAME } from "../../features/category/categorySlice"

const CategoryForm = () => {
    const dispatch = useDispatch()
    const { categoryName } = useSelector(categorySelector)

    const changeCatName = (e) => {
        dispatch(CHAGE_CAT_NAME(e.target.value))
    }
    const CatNameOnSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h2 className="text-xl mb-4">Create Category</h2>
            <form onSubmit={CatNameOnSubmit} className="space-y-4">
                <input onChange={changeCatName} value={categoryName} type="text" placeholder="Category Name" className="input input-bordered w-full" />
                <button className="btn btn-outline">Save</button>
            </form>
        </div>
    )
}

export default CategoryForm