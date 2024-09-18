import { useState } from "react"

const CategoryForm = () => {
    const [categoryName, setCategoryName] = useState('')

    const changeCatName = (e) => {
        setCategoryName(e.target.value)
    }
    const CatNameOnSubmit = (e) => {
        e.preventDefault()

    }
    return (
        <div>
            <h2 className="text-xl">Create Category</h2>
            <form onSubmit={CatNameOnSubmit}>
                <input onChange={changeCatName} value={categoryName} type="text" placeholder="Category Name" className="input input-bordered w-full" />
                <button className="btn btn-outline">Save</button>
            </form>
        </div>
    )
}

export default CategoryForm