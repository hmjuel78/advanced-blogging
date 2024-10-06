
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { blogDelete, blogSelector, singleBlog } from "../features/blog/blogSlice"
import { useNavigate, useParams } from "react-router-dom"
import { commentCreate } from "../features/comments/commentSlice"
import Loading from "../components/Loading/Loading"
import CommentsForm from "../components/comments/CommentsForm"
import toast from "react-hot-toast"
import { SlHeart } from "react-icons/sl"
import { ImHeart } from "react-icons/im"
import { likeCreate } from "../features/likes/likeSlice"

const BlogDetails = () => {
    const [commentText, setCommentText] = useState('')
    const { blogs, isLoading, isError, error } = useSelector(blogSelector)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [nComment, setNcomment] = useState(false)
    const [replyComment, setReplyComment] = useState(null)
    const navigate = useNavigate()
    const [like, setLike] = useState(false)


    const commentOnSubmit = (e) => {
        e.preventDefault()

        const newComment = {
            parentId: replyComment ? replyComment.id : null,
            blogId: parseInt(id),
            comment: commentText
        }
        dispatch(commentCreate(newComment))
        setCommentText('')
        setNcomment(!nComment)
        setReplyComment(null)
    }
    const replyCommentHandle = (comment) => {
        setReplyComment(comment)
    }
    const resetReplyComment = () => {
        setReplyComment(null)
    }

    const blogDeleteHandle = (id) => {
        dispatch(blogDelete(id))

        if (!isError) {
            navigate('/blogs')
            toast.success("Blog Delete Successfully!!!")
        } else {
            console.error(error)
            toast.error(error)
        }
    }

    const likeClickHandle = (id) => {
        setLike(!like)
        dispatch(likeCreate(id))
    }

    useEffect(() => {
        dispatch(singleBlog(id))
        setNcomment(false)
    }, [nComment])

    return (
        <div className="max-w-7xl  mx-auto mt-6 space-y-4">

            <h2 className="text-2xl font-bold">Blog Details</h2>
            <p className="font-bold">{blogs?.category?.name}</p>
            <p>By <span className="font-bold underline">{blogs?.author?.name}</span></p>
            <h3 className="text-xl font-medium">Title: {blogs.title} </h3>
            <p>Description: {blogs.desc} </p>
            <div className="flex justify-between items-center gap-3 border-b border-gray-600 pb-3">
                <p className="">Comments: {blogs?.comments && blogs?.comments?.length > 0 ? blogs?.comments?.length : '0'}</p>
                <div className="flex items-center gap-2">
                    <button onClick={() => likeClickHandle(id)}>
                        {like ?
                            <ImHeart className="text-xl" />
                            :
                            <SlHeart className="text-xl" />
                        }
                    </button>
                    <p>Likes: <span>{blogs?.likes?.length ? blogs?.likes?.map(like => like.like) : 0}</span> </p>
                </div>
            </div>
            <div className="space-y-4">
                {isLoading && <Loading />}


                {blogs?.comments?.length > 0 ?
                    blogs?.comments?.filter(comment => comment.parentId === null || comment.parentId === undefined)
                        ?.map(comment => (
                            <div key={comment.id} className="mb-4">
                                <p className="border border-gray-600 p-3 rounded-md">
                                    {comment.comment}
                                </p>
                                {!comment.parentId &&
                                    <p
                                        onClick={() => replyCommentHandle(comment)}
                                        className={`text-right text-xs text-info mt-2 mr-2 cursor-pointer`}
                                    >
                                        Reply
                                    </p>
                                }

                                {blogs?.comments
                                    ?.filter(reply => reply.parentId === comment.id)
                                    ?.map(reply => (
                                        <p key={reply.id} className="border border-gray-600 p-3 rounded-md ml-5 mt-4">
                                            {reply.comment}
                                        </p>
                                    ))}
                            </div>
                        ))
                    : <p>No Comments yet!!</p>
                }
            </div>
            {
                replyComment &&
                <div>
                    <p>Reply to: {replyComment.comment}</p>
                    <p onClick={resetReplyComment} className="text-xs text-error cursor-pointer">Cancel</p>
                </div>
            }
            <CommentsForm
                _state={commentText}
                _setState={setCommentText}
                _onChangeHandle={commentOnSubmit}
            />


            <button onClick={() => blogDeleteHandle(id)} className="btn btn-error btn-sm">Delete</button>
        </div>
    )
}

export default BlogDetails