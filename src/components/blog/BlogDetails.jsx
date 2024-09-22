
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { blogSelector, singleBlog } from "../../features/blog/blogSlice"
import { useParams } from "react-router-dom"
import { commentFetch, commentSelector } from "../../features/comments/commentSlice"



const BlogDetails = () => {
    const { blogs } = useSelector(blogSelector)
    const { comments } = useSelector(commentSelector)
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(singleBlog(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(commentFetch())
    }, [dispatch])

    console.log(blogs)
    return (
        <div className="max-w-7xl  mx-auto mt-6 space-y-4">
            <h2 className="text-2xl font-bold">Blog Details</h2>
            <h3 className="text-xl font-medium">Title: {blogs.title} </h3>
            <p>Description: {blogs.desc} </p>
            <p>Likes: {blogs.like} </p>
            <p>Comments</p>
            {comments &&
                comments.length > 0 ?
                comments?.map(comment => (
                    <div key={comment.id}>
                        {comment.comment}
                    </div>
                ))
                : <p>No Comments yet!!</p>
            }

        </div>
    )
}

export default BlogDetails