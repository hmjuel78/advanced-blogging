import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect, useState } from "react"
import BlogCard from "../components/blog/BlogCard"
import DropdownWithSearch from "../components/custom-dropdown-with-search/DropdownWithSearch"
import { categoryFetch, categorySelector } from "../features/category/categorySlice"
import { authorFetch, authorSelector } from "../features/author/authorSlice"

const Blogs = () => {
    const initSelect = {
        categorySelect: null,
        authorSelect: null
    }
    const [selectFilter, setSelectFilter] = useState(initSelect)
    const { blogs } = useSelector(blogSelector)
    const { categories } = useSelector(categorySelector)
    const { authors } = useSelector(authorSelector)
    const dispatch = useDispatch()

    const archiveSearchFilter = (e) => {
        e.preventDefault()
        console.log('fdas====')
    }

    const resetFilter = () => {
        setSelectFilter(initSelect)
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

    useEffect(() => {
        dispatch(blogFetch())
        dispatch(categoryFetch())
        dispatch(authorFetch())
    }, [])


    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>
            <form onSubmit={archiveSearchFilter}>
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
                    <button type="submit" className="btn btn-outline btn-accent">Filter</button>
                    <button onClick={resetFilter} className="btn btn-error">Reset Filter</button>
                </div>
            </form>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4">
                {
                    blogs && blogs.length > 0 ?
                        blogs?.map(blog => (
                            <BlogCard key={blog.id} blog={blog} filterOptions={selectFilter} />
                        ))
                        : <h2 className="text-xl text-center">Blogs Not Found !!!</h2>
                }
            </div>
        </div>
    )
}

export default Blogs