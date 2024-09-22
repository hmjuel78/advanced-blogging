import { useState } from "react"
import BlogFrom from "../components/blog/BlogForm"
import Tags from "../components/tags/Tags"


const CreateBlog = () => {
    const [editableBlog, setEditableBlog] = useState(null)

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 grid md:grid-cols-2 gap-10">
            <BlogFrom editableBlog={editableBlog} />
            <Tags />
        </div>
    )
}

export default CreateBlog