import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect, useState } from "react"
import BlogCard from "../components/blog/BlogCard"
import DropdownWithSearch from "../components/custom-dropdown-with-search/DropdownWithSearch"
import { categorySelector } from "../features/category/categorySlice"
import { authorByCatId, authorFetch, authorSelector } from "../features/author/authorSlice"
import { tagFetch, tagSelector } from "../features/tags/tagSlice"
import toast from "react-hot-toast"
import Pagination from "../components/pagination/Pagination"
import Loading from "../components/Loading/Loading"
import BlogEditModal from "../components/blog/BlogEditModal"


const Blogs = () => {
    const initSelect = {
        selectedCategory: null,
        selectedAuthor: null,
        selectedTag: null,
        searchTitle: '',
        startDate: null,
        endDate: null,
        currentPage: 1,
        viewPerPage: 3
    }
    const [openModal, setOpenModal] = useState(false)
    const [selectFilter, setSelectFilter] = useState(initSelect)
    const [totalPosts, setTotalPosts] = useState(7)
    const [totalPage, setTotalPage] = useState(0)
    const { blogs, isLoading } = useSelector(blogSelector)
    const { categories } = useSelector(categorySelector)
    const { authors, authorsByCat } = useSelector(authorSelector)
    const { tags } = useSelector(tagSelector)
    const dispatch = useDispatch()
    const [shouldFetch, setShouldFetch] = useState(false)



    const initialBlogFetch = (initValue) => {
        dispatch(
            blogFetch(initValue ?? selectFilter)
        )
    }
    const archiveSearchFilter = (e) => {
        e.preventDefault()
        if (
            selectFilter.selectedCategory === null &&
            selectFilter.selectedAuthor === null &&
            selectFilter.selectedTag === null &&
            selectFilter.searchTitle === "" &&
            selectFilter.startDate === null &&
            selectFilter.endDate === null
        ) {
            return toast.error("Minium select one item for search!!!")
        }

        initialBlogFetch()
    }
    const handleFilterChange = (key, value, fetch = false) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            [key]: value

        }))
        if (key === 'selectedCategory') {
            setSelectFilter((selectFilter) => ({
                ...selectFilter,
                selectedAuthor: null

            }))
        }
        if (key !== 'currentPage') {
            setSelectFilter((selectFilter) => ({
                ...selectFilter,
                currentPage: 1

            }))
        }

        if (fetch) {
            setShouldFetch(true)
        }
    }
    const categoryChangeHandle = (cat) => handleFilterChange('selectedCategory', cat)

    const authorChangeHandle = (auth) => handleFilterChange('selectedAuthor', auth)

    const tagChangeHandle = (tag) => handleFilterChange('selectedTag', tag)

    const searchKeywordHandle = (e) => handleFilterChange('searchTitle', e.target.value)

    const categoryFilterByClick = (catId) => handleFilterChange('selectedCategory', catId, true)

    const authorFilterByClick = (authId) => handleFilterChange('selectedAuthor', authId, true)

    const tagFilterByClick = (tagId) => handleFilterChange('selectedTag', tagId, true)

    const dateFilterHandle = (startDate, endDate) => {
        setSelectFilter((selectFilter) => ({
            ...selectFilter,
            startDate: startDate,
            endDate: endDate
        }))
    }

    const changeCurrentPage = (e) => handleFilterChange('currentPage', parseInt(e.target.value))

    const resetFilter = () => {
        setSelectFilter(initSelect)
        initialBlogFetch(initSelect)
        setShouldFetch(false)
    }

    useEffect(() => {
        initialBlogFetch()
    }, [selectFilter.currentPage, shouldFetch])

    useEffect(() => {
        setTotalPage(Math.ceil(totalPosts / selectFilter.viewPerPage))
    }, [])

    useEffect(() => {
        dispatch(authorFetch())
        dispatch(tagFetch())
    }, [dispatch])

    useEffect(() => {
        if (selectFilter?.selectedCategory) {
            dispatch(authorByCatId(selectFilter.selectedCategory))
        }
    }, [dispatch, selectFilter.selectedCategory])


    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>

            <div className="my-10 grid grid-cols-6 gap-3">
                {/* Category dropdown */}
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={categories}
                    selectDropData={selectFilter.selectedCategory}
                    setSelectDropData={categoryChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Category"
                />
                {/* Author dropdown */}
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={selectFilter.selectedCategory !== null ? authorsByCat : authors}
                    selectDropData={selectFilter.selectedAuthor}
                    setSelectDropData={authorChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Author"
                />
                {/* Tag dropdown */}
                <DropdownWithSearch
                    isSearch={true}
                    dropDatas={tags}
                    selectDropData={selectFilter.selectedTag}
                    setSelectDropData={tagChangeHandle}
                    mapKey="name"
                    selectPlaceholder="Select Tag"
                />
                {/* input title search */}
                <input
                    onChange={searchKeywordHandle}
                    value={selectFilter.searchTitle}
                    type="text"
                    placeholder="Search Blog"
                    className="input input-bordered w-full max-w-xs"
                />

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
                    blogs.map((blog) =>
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            _onCategoryFilter={categoryFilterByClick}
                            _onAuthorFilter={authorFilterByClick}
                            _onTagFilter={tagFilterByClick}
                            _onOpenModal={setOpenModal}
                        />)
                ) : (
                    <h2 className="text-xl text-center">Blogs Not Found !!!</h2>
                )}
            </div>

            <Pagination
                _state={selectFilter.currentPage}
                _onChange={changeCurrentPage}
                _totalPage={totalPage}
            />

            <BlogEditModal open={openModal} setOpen={setOpenModal} />
        </div>
    )
}

export default Blogs
