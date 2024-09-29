import BlogForm from "./BlogForm";

const BlogEditModal = () => {
    return (
        <>
            <dialog id="blog_edit_form" className="modal">
                <div className="modal-box">
                    <BlogForm />


                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default BlogEditModal;