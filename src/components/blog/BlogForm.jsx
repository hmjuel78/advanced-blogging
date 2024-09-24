import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorByCatId, authorSelector } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import TagInputWithSearch from "../tag-input/TagInputWithSearch"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { blogCreate } from "../../features/blog/blogSlice"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"

dayjs.extend(utc)

const BlogFrom = (props) => {
    const { editableBlog } = props
    const { categories } = useSelector(categorySelector)
    const { authorsByCat } = useSelector(authorSelector)
    const [selectDropData, setSelectDropData] = useState([])
    const [blogData, setBlogData] = useState({
        blogTitle: '',
        blogBody: '',
        selectCategory: '',
        selectAuthor: ''
    })

    const dispatch = useDispatch()

    const changeHandleBlog = (e) => {
        setBlogData(blogData => {
            let value = e.target.value

            return { ...blogData, [e.target.name]: value }
        })
    }
    const resetField = () => {
        setSelectDropData([])
    }

    const blogOnSubmit = (e) => {
        e.preventDefault()
        if (blogData.blogTitle.trim() === '' || blogData.blogBody.trim() === '') {
            return toast.error('Type all Field properly!!!')
        }
        const tagArray = selectDropData.map(select => select.id)

        const newBlog = {
            author_id: blogData.selectAuthor,
            category_id: blogData.selectCategory,
            title: blogData.blogTitle,
            desc: blogData.blogBody,
            dateTime: dayjs().utc(),
            tags: tagArray,
        }

        if (editableBlog) {
            toast.success("Blog update Successfully !!!")
        } else {
            dispatch(blogCreate(newBlog))
            toast.success("Blog Create Successfully !!!")
        }

        resetField()
    }

    useEffect(() => {
        dispatch(categoryFetch())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorByCatId(blogData.selectCategory))
    }, [dispatch, blogData.selectCategory])

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

                <DropdownWithSearch
                    selectDropData={blogData.selectCategory}
                    setSelectDropData={setBlogData.selectCategory}
                    isSearch={true}
                    dropDatas={categories}
                    mapKey='name'
                />

                <select
                    onChange={changeHandleBlog}
                    defaultValue={"DEFAULT"}
                    name="selectAuthor"
                    className={`select select-bordered w-full`}
                    disabled={!blogData.selectCategory || blogData.selectCategory === 'DEFAULT' && true}
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
                    value={blogData.blogTitle}
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
                    value={blogData.blogBody}
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