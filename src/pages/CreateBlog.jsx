import BlogForm from "../components/blog/BlogForm"
import TagList from "../components/tags/TagList"

const CreateBlog = () => {


    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 grid md:grid-cols-2 gap-10">
            {/* Blog Form */}
            <BlogForm />

            {/* Tag lists */}
            <TagList />

        </div>
    )
}

export default CreateBlog