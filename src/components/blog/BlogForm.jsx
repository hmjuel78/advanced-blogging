import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorByCatId, authorSelector } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import TagInputWithSearch from "../tag-input/TagInputWithSearch"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { blogCreate, blogSelector } from "../../features/blog/blogSlice"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"

dayjs.extend(utc)

const BlogFrom = () => {
    const initState = {
        blogTitle: '',
        blogBody: '',
        selectCategory: '',
        selectAuthor: ''
    }

    const [blogData, setBlogData] = useState(initState)
    const [selectDropData, setSelectDropData] = useState([])
    const { categories } = useSelector(categorySelector)
    const { authorsByCat } = useSelector(authorSelector)
    const { editableBlog } = useSelector(blogSelector)

    const dispatch = useDispatch()

    const changeHandleBlog = (e) => {
        setBlogData(blogData => {
            let value = e.target.value

            return { ...blogData, [e.target.name]: value }
        })
    }
    const resetField = () => {
        setSelectDropData([])
        setBlogData(initState)
    }

    const blogOnSubmit = (e) => {
        e.preventDefault()
        if (blogData.blogTitle.trim() === '' || blogData.blogBody.trim() === '') {
            return toast.error('Type all Field properly!!!')
        }
        const tagArray = selectDropData.map(select => select.id)

        const newBlog = {
            author_id: blogData.selectAuthor.id,
            category_id: blogData.selectCategory.id,
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
    const handleSelectUpdate = (selectCat) => {
        setBlogData((restData) => ({
            ...restData,
            selectCategory: selectCat
        }))
    }
    const handleSelectAuth = (selectAuth) => {
        setBlogData((restData) => ({
            ...restData,
            selectAuthor: selectAuth
        }))
    }

    useEffect(() => {
        console.log(editableBlog)
        if (editableBlog) {
            setBlogData((prevData) => ({
                ...prevData,
                blogTitle: editableBlog.title || prevData.blogTitle,
                blogBody: editableBlog.body || prevData.blogBody,
                selectCategory: editableBlog.category || prevData.selectCategory,
                selectAuthor: editableBlog.author || prevData.selectAuthor
            }));
        }
    }, [editableBlog])

    useEffect(() => {
        dispatch(categoryFetch())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorByCatId(blogData.selectCategory.id))
    }, [dispatch, blogData.selectCategory])

    return (
        <div>
            <h2 className="text-xl mb-3">Create Blog</h2>

            <form onSubmit={blogOnSubmit} className="space-y-4">
                <DropdownWithSearch
                    selectDropData={blogData.selectCategory}
                    setSelectDropData={handleSelectUpdate}
                    isSearch={true}
                    dropDatas={categories}
                    mapKey='name'
                />

                <DropdownWithSearch
                    selectDropData={blogData.selectAuthor}
                    setSelectDropData={handleSelectAuth}
                    isSearch={false}
                    dropDatas={authorsByCat}
                    mapKey='name'
                    disable={!blogData.selectCategory && true}
                />

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