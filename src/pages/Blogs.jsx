import { useState } from "react"
import BlogFrom from "../components/blog/BlogFrom"
import Tags from "../components/tags/Tags"


const Blogs = () => {
    const [editableBlog, setEditableBlog] = useState(null)

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <h2 className="text-xl mb-3">Blogs Page</h2>

            <div className="grid md:grid-cols-2 gap-10">
                <BlogFrom editableBlog={editableBlog} />
                <Tags />
            </div>
        </div>
    )
}

export default Blogs