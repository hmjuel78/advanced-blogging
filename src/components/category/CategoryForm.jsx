import { useDispatch } from "react-redux"
import { categoryCreate, categoryUpdate } from "../../features/category/categorySlice"
import toast from "react-hot-toast"

const CategoryForm = (props) => {
    const { categoryName, setCategoryName, editableCat, setEditableCat } = props
    const dispatch = useDispatch()

    const changeCatName = (e) => {
        setCategoryName(e.target.value)
    }

    const catNameOnSubmit = (e) => {
        e.preventDefault()
        if (categoryName.trim() === '') {
            return toast.error('Type Category name properly!!')
        }
        const newCategory = {
            name: categoryName
        }
        if (editableCat === null) {
            dispatch(categoryCreate(newCategory))
            toast.success('Category name upadate successfully!!')
        } else {
            dispatch(categoryUpdate({
                id: editableCat.id,
                name: categoryName
            }))
            toast.success('Category create successfully!!')
        }

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