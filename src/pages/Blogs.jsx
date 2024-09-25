import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect, useState } from "react"
import BlogCard from "../components/blog/BlogCard"
import DropdownWithSearch from "../components/custom-dropdown-with-search/DropdownWithSearch"

const Blogs = () => {
    const [selectCat, setSelectCat] = useState()
    const { blogs } = useSelector(blogSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(blogFetch())
    }, [dispatch])

    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>
            <div className="my-10 grid grid-cols-5">

                {/* <DropdownWithSearch
                    isSearch={true}
                    dropDatas={blogs}
                    selectDropData={selectCat}
                    setSelectDropData={setSelectCat}
                    mapKey="title"
                /> */}

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