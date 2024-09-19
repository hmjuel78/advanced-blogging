import { useDispatch } from "react-redux"
import { categoryPost, categoryUpdate } from "../../features/category/categorySlice"

const CategoryForm = (props) => {
    const { categoryName, setCategoryName, editableCat, setEditableCat } = props
    const dispatch = useDispatch()

    const changeCatName = (e) => {
        setCategoryName(e.target.value)
    }
    const catNameOnSubmit = (e) => {
        e.preventDefault()

        const newCategory = {
            name: categoryName
        }

        editableCat === null
            ? dispatch(categoryPost(newCategory))
            : dispatch(categoryUpdate({
                id: editableCat.id,
                name: categoryName
            }))

        setCategoryName('')
        setEditableCat(null)
    }

    return (
        <div>
            <h2 className="text-xl mb-4">Create Category</h2>
            <form onSubmit={catNameOnSubmit} className="space-y-4">
                <input onChange={changeCatName} value={categoryName} type="text" placeholder="Category Name" className="input input-bordered w-full" />
                <button className="btn btn-outline">{editableCat === null ? 'Create' : 'Update'}</button>
            </form>
        </div>
    )
}

export default CategoryForm