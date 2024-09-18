import { useState } from "react"

const AuthorForm = () => {
    const [authorName, setAuthorName] = useState('')

    const changeAuthName = (e) => {
        setAuthorName(e.target.value)
    }

    const authOnSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h2 className='text-xl'>Create Author</h2>
            <form onSubmit={authOnSubmit}>
                <input onChange={changeAuthName} value={authorName} type="text" placeholder="Category Name" className="input input-bordered w-full" />
                <button className="btn btn-outline">Save</button>
            </form>
        </div>
    )
}

export default AuthorForm