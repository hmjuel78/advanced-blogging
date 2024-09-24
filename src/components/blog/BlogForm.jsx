import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorByCatId, authorSelector } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import { tagFetch, tagSelector } from "../../features/tags/tagSlice"
import TagInputWithSearch from "../tag-input/TagInputWithSearch"
import dayjs from "dayjs"

const BlogFrom = (props) => {
    const { editableBlog } = props
    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [selectAuthor, setSelectAuthor] = useState('')
    // const [selectTag, setSelectTag] = useState('')
    const { categories } = useSelector(categorySelector)
    const { authorsByCat } = useSelector(authorSelector)
    const { tags: taglist } = useSelector(tagSelector)
    const [selectDropData, setSelectDropData] = useState([])
    const dispatch = useDispatch()

    const changeHandleBlog = (e) => {
        if (e.target.name === 'blogTitle') {
            setBlogTitle(e.target.value)
        } else if (e.target.name === 'blogBody') {
            setBlogBody(e.target.value)
        } else if (e.target.name === 'selectCategory') {
            setSelectCategory(e.target.value)
            dispatch(authorByCatId(e.target.value))
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
            dateTime: dayjs(),
            tags: selectDropData,
        }
        console.log(newBlog)
    }

    useEffect(() => {
        dispatch(categoryFetch())
        dispatch(tagFetch())
    }, [dispatch])

    // const handleTagChnage = (tags) => {
    //     setSelectTag(tags)
    // }

    return (
        <div>
            <h2 className="text-xl mb-3">Create Blog</h2>
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
                    className={`select select-bordered w-full`}
                    disabled={!selectCategory || selectCategory === 'DEFAULT' && true}
                >
                    <option value="DEFAULT">Select a author</option>
                    {authorsByCat && authorsByCat.length > 0 &&
                        authorsByCat?.map(author => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))
                    }
                </select>
                <input
                    onChange={changeHandleBlog}
                    value={blogTitle}
                    name="blogTitle"
                    type="text"
                    placeholder="Blog Title"
                    className="input input-bordered w-full"
                />

                <TagInputWithSearch
                    isSearch={true}
                    selectDropData={selectDropData}
                    setSelectDropData={setSelectDropData}
                />
                <textarea
                    onChange={changeHandleBlog}
                    value={blogBody}
                    name="blogBody"
                    className="textarea textarea-bordered w-full min-h-28"
                    placeholder="Blog Description"
                >
                </textarea>
                <button type="submit" className="btn btn-outline">{editableBlog === null ? 'Create' : 'Update'}</button>
            </form>
        </div>
    )
}

export default BlogFrom