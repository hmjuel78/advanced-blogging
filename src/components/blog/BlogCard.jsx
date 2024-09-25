import { MdOutlineWatchLater } from "react-icons/md"
import dayjs from 'dayjs'
import { SlLike } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { tagFetch, tagSelector } from "../../features/tags/tagSlice"
import { Link, useNavigate } from "react-router-dom"
import { categoryFetch, categorySelector } from "../../features/category/categorySlice"
import { authorFetch, authorSelector } from "../../features/author/authorSlice"
import { _EDITABLEBLOG } from "../../features/blog/blogSlice"

const BlogCard = (props) => {
    const { blog } = props
    const dispatch = useDispatch()
    const { tags } = useSelector(tagSelector)
    const { categories } = useSelector(categorySelector)
    const { authors } = useSelector(authorSelector)
    const navigate = useNavigate()


    const blogEditHandle = (blog) => {
        dispatch(_EDITABLEBLOG(blog))
        navigate('/create-blog')
    }

    useEffect(() => {
        dispatch(tagFetch())
        dispatch(categoryFetch())
        dispatch(authorFetch())
    }, [dispatch])

    return (
        <div className="card bg-base-100 w-full shadow-xl border border-white">
            <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.desc}</p>
                <div className="flex gap-2 items-center justify-between my-3">
                    <div className="flex gap-1 items-center text-sm">
                        <MdOutlineWatchLater />
                        <span>{dayjs(blog.dateTime).format('DD/MM/YYYY, h:mm A')}</span>
                    </div>
                    <div className="flex gap-1 items-center text-sm">
                        <SlLike />
                        <span>{blog.like ? blog.like : 0}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <p className="text-base max-w-max">Category:</p>

                        <ul className="flex flex-wrap gap-2">
                            {categories &&
                                categories.length > 0 &&

                                categories?.map((cat) => {
                                    if (parseInt(cat.id) === parseInt(blog.category_id)) {
                                        return (
                                            <li key={cat.id} className="bg-yellow-700 px-3 rounded text-sm">{cat.name}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-base max-w-max">Post by:</p>
                        <ul className="flex flex-wrap gap-2">
                            {authors &&
                                authors.length > 0 &&

                                authors?.map((author) => {
                                    if (parseInt(author.id) === parseInt(blog.author_id)) {
                                        return (
                                            <li key={author.id} className="border border-blue-700 px-3 rounded text-sm">{author.name}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>


                <div className="flex items-center gap-2">
                    <p className="max-w-max">Tags:</p>
                    <ul className="flex flex-wrap gap-2">
                        {blog.tags &&
                            blog.tags.length > 0 &&

                            blog?.tags?.map((tag) => {
                                const blogTag = tags.find(t => parseInt(t.id) === parseInt(tag))

                                if (blogTag) {
                                    return (
                                        <li key={blogTag.id} className="bg-zinc-700 px-3 rounded text-sm">{blogTag.name}</li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>


                <div className="card-actions justify-between mt-3">
                    <button
                        onClick={() => blogEditHandle(blog)}
                        className="btn btn-sm btn-outline btn-info"
                    >
                        Edit
                    </button>

                    <Link
                        to={`${blog.id}`}
                        state={blog}
                        className="btn btn-sm btn-outline"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
