
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { tagCreate, tagDelete, tagFetch, tagSelector, tagUpdate } from "../../features/tags/tagSlice";

const TagList = () => {
    const [tagName, setTagName] = useState('')
    const [editableTag, setEditableTag] = useState(null)
    const { tags } = useSelector(tagSelector)
    const dispatch = useDispatch()

    const changeTagName = (e) => {
        setTagName(e.target.value)
    }
    const tagOnSubmitHandle = (e) => {
        e.preventDefault()
        if (tagName.trim() === '') {
            return toast.error('Type Tag Name Properly')
        }
        const newTag = {
            name: tagName.toLowerCase()
        }
        if (tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase() && tag.id !== editableTag?.id)) {
            return toast.error('This name already taken !!!')
        }
        if (editableTag === null) {
            dispatch(tagCreate(newTag))
            toast.success('Tag Create Successfully !!')
        } else {
            dispatch(tagUpdate({
                id: editableTag.id,
                name: tagName.toLowerCase()
            }))
            toast.success('Tag name update successfully !!!')
            setEditableTag(null)
        }
        setTagName('')
    }
    const handleTagEdit = (tag) => {
        setEditableTag(tag)
        setTagName(tag.name)
    }
    const handleTagDelete = (tagId) => {
        if (editableTag?.id === tagId) {
            setEditableTag(null)
            setTagName('')
        }
        dispatch(tagDelete(tagId))
        toast.success('Tag delete successfully !!!')
    }
    const cancelEditModeHandle = () => {
        setEditableTag(null)
        setTagName('')
    }


    useEffect(() => {
        dispatch(tagFetch())
    }, [dispatch])



    return (
        <div>
            <h2 className="text-xl mb-3">Tags</h2>
            <form onSubmit={tagOnSubmitHandle} className="space-y-4">
                <input
                    onChange={changeTagName}
                    value={tagName}
                    type="text"
                    placeholder="Tag Name"
                    className="input input-bordered w-full"
                />
                <button className="btn btn-outline">{editableTag === null ? 'Create' : 'Update'}</button>
                {
                    editableTag &&
                    <button onClick={() => cancelEditModeHandle()} className="btn btn-error ml-2">Cancel</button>
                }
            </form>

            <h2 className="text-xl my-3">All Tags</h2>

            <ul className="space-y-4 max-h-72 overflow-y-auto">
                {tags && tags.length > 0 ?
                    tags?.map(tag => (
                        <li
                            key={tag.id}
                            className="flex gap-4 w-full justify-between border border-black p-3 rounded items-center"
                        >
                            <span>{tag.name}</span>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleTagEdit(tag)}
                                    className="btn btn-circle btn-sm hover:btn-info hover:text-white">
                                    <MdOutlineModeEdit />
                                </button>
                                <button
                                    onClick={() => handleTagDelete(tag.id)}
                                    className="btn btn-circle btn-sm hover:btn-error hover:text-white">
                                    <MdOutlineDeleteOutline />
                                </button>
                            </div>
                        </li>
                    )) :
                    <li>Tag not found!!</li>
                }
            </ul>
        </div>
    );
};

export default TagList;