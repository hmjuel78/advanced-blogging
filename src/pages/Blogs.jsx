import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect, useState } from "react"
import BlogCard from "../components/blog/BlogCard"
import DropdownWithSearch from "../components/custom-dropdown-with-search/DropdownWithSearch"
import { categoryFetch, categorySelector } from "../features/category/categorySlice"
import { authorByCatId, authorFetch, authorSelector } from "../features/author/authorSlice"
import { tagFetch, tagSelector } from "../features/tags/tagSlice"

const Blogs = () => {
    const initSelect = {
        categorySelect: null,
        authorSelect: null,
        tagSelect: null,
        searchKeyword: ''

    }
    const [selectFilter, setSelectFilter] = useState(initSelect)
    const { blogs } = useSelector(blogSelector)
    const { categories } = useSelector(categorySelector)
    const { authors, authorsByCat } = useSelector(authorSelector)
    const { tags } = useSelector(tagSelector)
    const dispatch = useDispatch()

    const archiveSearchFilter = (e) => {
        e.preventDefault()
        dispatch(blogFetch({
            categoryId: selectFilter?.categorySelect?.id || null,
            authorId: selectFilter?.authorSelect?.id || null,
            tagId: selectFilter?.tagSelect?.id || null,
            // title: selectFilter?.searchKeyword.toLowerCase() || ''

        }))
    }

    const resetFilter = () => {
        setSelectFilter(initSelect)
        dispatch(blogFetch({
            categoryId: null,
            authorId: null,
            tagId: null,

        }))
    }
    const categoryChangeHandle = (cat) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            categorySelect: cat
        }))
    }
    const authorChangeHandle = (auth) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            authorSelect: auth
        }))
    }
    const tagChangeHandle = (tag) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            tagSelect: tag
        }))
    }
    const searchKeywordHandle = (e) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            searchKeyword: e.target.value
        }))
    }

    useEffect(() => {
        dispatch(blogFetch())
        dispatch(categoryFetch())
        dispatch(authorFetch())
        dispatch(tagFetch())

    }, [dispatch])

    useEffect(() => {
        dispatch(authorByCatId(selectFilter?.categorySelect?.id))
    }, [selectFilter.categorySelect])


    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>

            <div className="my-10 grid grid-cols-5 gap-3">
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={categories}
                    selectDropData={selectFilter.categorySelect}
                    setSelectDropData={categoryChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Category"
                />
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={authors}
                    selectDropData={selectFilter.authorSelect}
                    setSelectDropData={authorChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Author"
                />
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={tags}
                    selectDropData={selectFilter.tagSelect}
                    setSelectDropData={tagChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Author"
                />

                <input onChange={searchKeywordHandle} value={selectFilter.searchKeyword} type="text" placeholder="Search Blog" className="input input-bordered w-full max-w-xs" />

                <button onClick={archiveSearchFilter} type="submit" className="btn btn-outline btn-accent">Filter</button>
                <button onClick={resetFilter} className="btn btn-error">Reset Filter</button>
            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4">
                {
                    blogs && blogs.length > 0 ?
                        blogs?.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))
                        : <h2 className="text-xl text-center">Blogs Not Found !!!</h2>
                }
            </div>
        </div>
    )
}

export default Blogs