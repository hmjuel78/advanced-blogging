import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect, useState } from "react"
import BlogCard from "../components/blog/BlogCard"
import DropdownWithSearch from "../components/custom-dropdown-with-search/DropdownWithSearch"
import { categoryFetch, categorySelector } from "../features/category/categorySlice"
import { authorByCatId, authorFetch, authorSelector } from "../features/author/authorSlice"
import { tagFetch, tagSelector } from "../features/tags/tagSlice"
import toast from "react-hot-toast"
import Pagination from "../components/pagination/Pagination"
import Loading from "../components/Loading/Loading"

const Blogs = () => {
    const initSelect = {
        categorySelect: "",
        authorSelect: "",
        tagSelect: "",
        searchKeyword: "",
        startDate: "",
        endDate: ""
    }
    const [selectFilter, setSelectFilter] = useState(initSelect)
    const { blogs, isLoading } = useSelector(blogSelector)
    const { categories } = useSelector(categorySelector)
    const { authors, authorsByCat } = useSelector(authorSelector)
    const { tags } = useSelector(tagSelector)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(40)
    const [viewPerPage, setViewPerPage] = useState(2)
    const [totalPage, setTotalPage] = useState(0)

    const archiveSearchFilter = (e) => {
        e.preventDefault()
        if (
            selectFilter.categorySelect === "" &&
            selectFilter.authorSelect === "" &&
            selectFilter.tagSelect === "" &&
            selectFilter.searchKeyword === "" &&
            selectFilter.startDate === "" &&
            selectFilter.endDate === ""
        ) {
            return toast.error("Minium select one item for search!!!")
        }

        dispatch(
            blogFetch({
                categoryId: selectFilter?.categorySelect || null,
                authorId: selectFilter?.authorSelect || null,
                tagId: selectFilter?.tagSelect?.id || null,
                title: selectFilter?.searchKeyword || "",
                currentPage: currentPage
                // startDate: selectFilter?.startDate || null,
                // endDate: selectFilter?.endDate || null
            })
        )
    }

    const resetFilter = () => {
        setSelectFilter(initSelect)
        dispatch(blogFetch())
    }
    const categoryChangeHandle = (cat) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            categorySelect: cat,
            authorSelect: ""
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

    const categoryFilterByClick = (catId) => {
        console.log(catId)
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            categorySelect: catId
        }))
        dispatch(
            blogFetch({
                categoryId: catId || null
            })
        )
    }

    const atuhorFilterByClick = (authId) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            authorSelect: authId
        }))
        dispatch(
            blogFetch({
                authorId: authId || null
            })
        )
    }
    const tagFilterByClick = (tagId) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            tagSelect: tagId
        }))
        dispatch(
            blogFetch({
                tagId: tagId || null
            })
        )
    }

    const dateFilterHandle = (startDate, endDate) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            startDate: startDate,
            endDate: endDate
        }))
        // dispatch(blogFetch({
        //     tagId: tagId || null
        // }))
    }
    // console.log(selectFilter.startDate, selectFilter.endDate)

    const paginationHandle = (e) => {
        setCurrentPage(parseInt(e.target.value))
    }

    useEffect(() => {
        setTotalPage(Math.ceil(totalPosts / viewPerPage))
    }, [])

    // useEffect(() => {
    //     dispatch(
    //         blogFetch({
    //             currentPage: currentPage
    //         })
    //     )
    // }, [currentPage])
    useEffect(() => {
        dispatch(categoryFetch())
        dispatch(authorFetch())
        dispatch(tagFetch())
    }, [dispatch])

    useEffect(() => {
        if (selectFilter?.categorySelect) {
            dispatch(authorByCatId(selectFilter.categorySelect))
        }
    }, [dispatch, selectFilter.categorySelect])

    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>

            <div className="my-10 grid grid-cols-6 gap-3">
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
                    dropDatas={selectFilter.categorySelect !== "" ? authorsByCat : authors}
                    selectDropData={selectFilter.authorSelect}
                    setSelectDropData={authorChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Author"
                />
                <DropdownWithSearch isSearch={true} dropDatas={tags} selectDropData={selectFilter.tagSelect} setSelectDropData={tagChangeHandle} mapKey="name" selectPlaceholder="Select Tag" />

                <input onChange={searchKeywordHandle} value={selectFilter.searchKeyword} type="text" placeholder="Search Blog" className="input input-bordered w-full max-w-xs" />

                <button onClick={archiveSearchFilter} type="submit" className="btn btn-outline btn-accent">
                    Filter
                </button>
                <button onClick={resetFilter} className="btn btn-error">
                    Reset Filter
                </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4">
                {isLoading && <Loading />}
                {blogs && blogs.length > 0 ? (
                    blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} _onCategoryFilter={categoryFilterByClick} _onAuthorFilter={atuhorFilterByClick} _onTagFilter={tagFilterByClick} />)
                ) : (
                    <h2 className="text-xl text-center">Blogs Not Found !!!</h2>
                )}
            </div>

            <Pagination _state={currentPage} _setState={setCurrentPage} _onChange={paginationHandle} />
        </div>
    )
}

export default Blogs
