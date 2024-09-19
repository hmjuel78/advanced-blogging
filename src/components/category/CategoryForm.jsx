import { useDispatch } from "react-redux"
import { categoryCreate, categoryUpdate } from "../../features/category/categorySlice"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

const CategoryForm = (props) => {
    const { editableCat, setEditableCat } = props
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch()

    const changeCatName = (e) => {
        setCategoryName(e.target.value)
    }

    useEffect(() => {
        if (editableCat !== null) {
            setCategoryName(editableCat.name)
        }
    }, [editableCat])

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
            toast.success('Category create successfully!!')
        } else {
            dispatch(categoryUpdate({
                id: editableCat.id,
                name: categoryName
            }))
            toast.success('Category name upadate successfully!!')
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