import { useDispatch, useSelector } from "react-redux"
import { blogFetch, blogSelector } from "../features/blog/blogSlice"
import { useEffect } from "react"
import BlogCard from "../components/blog/BlogCard"

const Blogs = () => {
    const { blogs } = useSelector(blogSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(blogFetch())
    }, [dispatch])

    return (
        <div className="max-w-7xl mx-auto m-10 px-6">
            <h2 className="mb-3">Blogs</h2>

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