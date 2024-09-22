import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorFetch, authorSelector } from "../../features/author/authorSlice"
import Tag from "../tag/Tag"
import toast from "react-hot-toast"

const BlogFrom = (props) => {
    const { editableBlog } = props
    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [selectAuthor, setSelectAuthor] = useState('')
    // const [selectTag, setSelectTag] = useState('')
    const { categories } = useSelector(categorySelector)
    const { authors } = useSelector(authorSelector)
    const [tags, setTags] = useState([])
    const dispatch = useDispatch()

    const changeHandleBlog = (e) => {
        if (e.target.name === 'blogTitle') {
            setBlogTitle(e.target.value)
        } else if (e.target.name === 'blogBody') {
            setBlogBody(e.target.value)
        } else if (e.target.name === 'selectCategory') {
            setSelectCategory(e.target.value)
        } else if (e.target.name === 'selectAuthor') {
            setSelectAuthor(e.target.value)
        }
    }
    const blogOnSubmit = (e) => {
        e.preventDefault()
        if (blogTitle.trim() === '' || blogBody.trim() === '') {
            return toast.error('Type all Field properly!!!')
        }
        const newBlog = {
            author_id: selectAuthor,
            category_id: selectCategory,
            title: blogTitle,
            desc: blogBody,
            dateTime: new Date.now(),
            tags: tags,
        }
        console.log(newBlog)
    }

    useEffect(() => {
        dispatch(categoryFetch())
        dispatch(authorFetch())
    }, [dispatch])

    // const handleTagChnage = (tags) => {
    //     setSelectTag(tags)
    // }

    const categoryByAuthors = authors?.filter(item => item.category_id == selectCategory)

    return (
        <div>
            <form onSubmit={blogOnSubmit} className="space-y-4">

                <select
                    onChange={changeHandleBlog}
                    defaultValue={'DEFAULT'}
                    name="selectCategory"
                    className="select select-bordered w-full"
                >
                    <option value="DEFAULT">Select a category</option>
                    {
                        categories &&
                        categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <select
                    onChange={changeHandleBlog}
                    defaultValue={"DEFAULT"}
                    name="selectAuthor"
                    className="select select-bordered w-full"
                >
                    <option value="DEFAULT">Select a author</option>
                    {categoryByAuthors && categoryByAuthors.length > 0 ?
                        categoryByAuthors?.map(author => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))
                        :
                        <option>Author unavailable</option>
                    }
                </select>
                {/* <input
                    onChange={changeHandleBlog}
                    value={blogTitle}
                    name="blogTitle"
                    type="text"
                    placeholder="Tag Name"
                    className="input input-bordered w-full"
                /> */}
                <Tag tags={tags} setTags={setTags} />
                <textarea
                    onChange={changeHandleBlog}
                    value={blogBody}
                    name="blogBody"
                    className="textarea textarea-bordered w-full min-h-28"
                    placeholder="Blog Description"
                >
                </textarea>
                <button className="btn btn-outline">{editableBlog === null ? 'Create' : 'Update'}</button>
            </form>
        </div>
    )
}

export default BlogFrom