import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorByCatId, authorSelector } from "../../features/author/authorSlice"
import toast from "react-hot-toast"
import TagInputWithSearch from "../tag-input/TagInputWithSearch"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { _EDITABLEBLOG, blogCreate, blogSelector, blogUpdate } from "../../features/blog/blogSlice"
import DropdownWithSearch from "../custom-dropdown-with-search/DropdownWithSearch"
import { tagSelector } from "../../features/tags/tagSlice"

dayjs.extend(utc)

const BlogFrom = () => {
    const initState = {
        blogTitle: '',
        blogBody: '',
        selectCategory: null,
        selectAuthor: null
    }

    const [blogData, setBlogData] = useState(initState)
    const [selectTags, setSelectTags] = useState([])
    const { categories } = useSelector(categorySelector)
    const { authorsByCat } = useSelector(authorSelector)
    const { editableBlog } = useSelector(blogSelector)
    const { tags } = useSelector(tagSelector)

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
        dispatch(_EDITABLEBLOG(null))
    }

    const blogOnSubmit = (e) => {
        e.preventDefault()
        if (blogData.blogTitle.trim() === '' || blogData.blogBody.trim() === '' || blogData.selectCategory === null || blogData.selectAuthor === null) {
            return toast.error('Type all Field properly!!!')
        }
        const tagArray = selectTags.map(select => select.id)

        const newBlog = {
            authorId: blogData.selectAuthor.id,
            categoryId: blogData.selectCategory.id,
            title: blogData.blogTitle,
            desc: blogData.blogBody,
            dateTime: dayjs().utc(),
            tags: tagArray,
        }

        if (editableBlog) {
            dispatch(blogUpdate({
                id: editableBlog.id,
                content: newBlog
            }))
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
            selectCategory: selectCat,
            selectAuthor: ''
        }))
    }
    const handleSelectAuth = (selectAuth) => {
        setBlogData((restData) => ({
            ...restData,
            selectAuthor: selectAuth
        }))
    }

    const updateDataFromBlog = () => {
        if (editableBlog !== null) {
            console.log(categories.find(cat => cat.id == editableBlog.categoryId))
            setBlogData(() => ({
                blogTitle: editableBlog.title || '',
                blogBody: editableBlog.desc || '',
                selectCategory: categories.find(cat => cat.id == editableBlog.categoryId) || null,
                selectAuthor: authorsByCat.find(auth => auth.id === editableBlog.authorId) || null
            }))

            const tagUpdate = editableBlog.tags.map(tagId => {
                const matchedTag = tags.find(tag => parseInt(tag.id) === parseInt(tagId));

                if (!matchedTag) {
                    return null
                }
                return matchedTag
            }).filter(tag => tag !== null)

            setSelectTags(tagUpdate)
        }
    }

    useEffect(() => {
        dispatch(categoryFetch())
    }, [])

    useEffect(() => {
        if (editableBlog) {
            dispatch(authorByCatId(editableBlog.categoryId))
        }
    }, [])

    useEffect(() => {
        if (blogData?.selectCategory?.id) {
            dispatch(authorByCatId(blogData.selectCategory.id))
        }
    }, [dispatch, blogData.selectCategory])

    useEffect(() => {
        if (editableBlog) {
            updateDataFromBlog()
        }
    }, [])


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