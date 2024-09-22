import { MdOutlineWatchLater } from "react-icons/md"
import dayjs from 'dayjs'
import { SlLike } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { tagFetch, tagSelector } from "../../features/tags/tagSlice"
import { Link } from "react-router-dom"

const BlogCard = (props) => {
    const { blog } = props
    const dispatch = useDispatch()
    const { tags } = useSelector(tagSelector)

    useEffect(() => {
        dispatch(tagFetch())
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
                        <span>{blog.like}</span>
                    </div>
                </div>
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
                <div className="card-actions justify-end mt-3">
                    <button className="btn btn-sm btn-info">
                        <Link to={`${blog.id}`} state={blog}>Read More</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
