import { useState } from "react"
import { useSelector } from "react-redux"
import { categorySelector } from "../../features/category/categorySlice"

const BlogFrom = (props) => {
    const { editableBlog } = props
    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const { categories } = useSelector(categorySelector)

    const changeHandleBlog = (e) => {
        if (e.target.name === 'blogTitle') {
            setBlogTitle(e.target.value)
        } else if (e.target.name === 'blogBody') {
            setBlogBody(e.target.value)
        } else if (e.target.name === 'selectCategory') {
            setSelectCategory(e.target.value)
        }
    }
    const blogOnSubmit = (e) => {
        e.preventDefault()
        const newBlog = {
            title: blogTitle,
        }
    }
    return (
        <div>
            <form onSubmit={blogOnSubmit} className="space-y-4">
                <select
                    onChange={changeHandleBlog}
                    value={selectCategory}
                    name="selectCategory"
                    className="select select-bordered w-full"
                >
                    {
                        categories &&
                        categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <input
                    onChange={changeHandleBlog}
                    value={blogTitle}
                    name="blogTitle"
                    type="text"
                    placeholder="Tag Name"
                    className="input input-bordered w-full"
                />
                <textarea
                    onChange={changeHandleBlog}
                    value={blogBody}
                    name="blogBody"
                    className="textarea textarea-bordered w-full min-h-28"
                    placeholder="Blog Description"></textarea>
                <button className="btn btn-outline">{editableBlog === null ? 'Create' : 'Update'}</button>
            </form>
        </div>
    )
}

export default BlogFrom