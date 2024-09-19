import { useState } from "react"
import { useSelector } from "react-redux"
import { categorySelector } from "../../features/category/categorySlice"


const AuthorForm = () => {
    const [authorName, setAuthorName] = useState('')
    const { categories } = useSelector(categorySelector)

    const changeAuthName = (e) => {
        setAuthorName(e.target.value)
    }

    const authOnSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h2 className='text-xl mb-4'>Create Author</h2>
            <form onSubmit={authOnSubmit} className="space-y-4">
                <select className="select select-bordered w-full">
                    {
                        categories &&
                        categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <input onChange={changeAuthName} value={authorName} type="text" placeholder="Author Name" className="input input-bordered w-full" />
                <button className="btn btn-outline">Save</button>
            </form>
        </div>
    )
}

export default AuthorForm