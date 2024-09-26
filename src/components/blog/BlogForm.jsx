import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categoryFetchById, categorySelector } from "../../features/category/categorySlice"
import { authorByCatId, authorSelector } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import TagInputWithSearch from "../tag-input/TagInputWithSearch"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { _EDITABLEBLOG, blogCreate, blogSelector } from "../../features/blog/blogSlice"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"

dayjs.extend(utc)

const BlogFrom = () => {
    const initState = {
        blogTitle: '',
        blogBody: '',
        selectCategory: null,
        selectAuthor: ''
    }

    const [blogData, setBlogData] = useState(initState)
    const [selectTags, setSelectTags] = useState([])
    const { categories, categoryById } = useSelector(categorySelector)
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
        setSelectTags([])
        setBlogData(initState)
    }

    const blogOnSubmit = (e) => {
        e.preventDefault()
        if (blogData.blogTitle.trim() === '' || blogData.blogBody.trim() === '') {
            return toast.error('Type all Field properly!!!')
        }
        const tagArray = selectTags.map(select => select.id)

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
            // console.log(newBlog, 'newBlog')
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
        dispatch(categoryFetch())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorByCatId(blogData?.selectCategory?.id))
    }, [dispatch, blogData.selectCategory])

    useEffect(() => {
        if (editableBlog !== null) {
            dispatch(categoryFetchById(editableBlog.category_id))
            // dispatch(authorByCatId(editableBlog.author_id))

            setBlogData(() => ({
                blogTitle: editableBlog.title || '',
                blogBody: editableBlog.desc || '',
                selectCategory: categoryById[0] || '',
                selectAuthor: authorsByCat || ''
            }))
            // setSelectTags(editableBlog.tags)
        }

        dispatch(_EDITABLEBLOG(null))
    }, [])

    console.log(blogData.selectCategory, 'select cat')
    console.log(categoryById[0], 'cat by id')


    return (
        <div>
            <h2 className="text-xl mb-3">Create Blog</h2>

            <div className="space-y-4">
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
                {/* Tag inpt */}
                <TagInputWithSearch
                    isSearch={true}
                    selectDropData={selectTags}
                    setSelectDropData={setSelectTags}
                />
                <textarea
                    onChange={changeHandleBlog}
                    value={blogData.blogBody}
                    name="blogBody"
                    className="textarea textarea-bordered w-full min-h-28"
                    placeholder="Blog Description"
                >
                </textarea>
                <button onClick={blogOnSubmit} className="btn btn-outline">{editableBlog === null ? 'Create' : 'Update'}</button>
            </div>
        </div>
    )
}

export default BlogFrom