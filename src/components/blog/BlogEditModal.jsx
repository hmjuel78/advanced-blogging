import { CgClose } from "react-icons/cg";
import BlogForm from "./BlogForm"

const BlogEditModal = (props) => {
    const {
        open,
        setOpen
    } = props

    return (
        <>
            <dialog className={`modal ${open && 'modal-open'}`}>
                <div className="modal-box">
                    <BlogForm setOpenModal={setOpen} />
                    <button onClick={() => setOpen(false)} className="btn btn-sm btn-circle hover:btn-error absolute right-2 top-2">
                        <CgClose />
                    </button>
                </div>
            </dialog>
        </>
    );
};

export default BlogEditModal