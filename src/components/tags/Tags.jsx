import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { tagSelector, tagCreate, tagDelete, tagFetch, tagUpdate } from "../../features/tags/tagSlice"
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md"
import toast from "react-hot-toast"

const Tags = () => {
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
            name: tagName
        }
        if (editableTag === null) {
            dispatch(tagCreate(newTag))
            toast.success('Tag Create Successfully !!')
        } else {
            dispatch(tagUpdate({
                id: editableTag.id,
                name: tagName
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
        dispatch(tagDelete(tagId))
        toast.success('Tag delete successfully !!!')
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
            </form>

            <h2 className="text-xl my-3">All Tags</h2>

            <ul className="space-y-4">
                {tags && tags.length > 0 ?
                    tags?.map(tag => (
                        <li
                            key={tag.id}
                            className="flex gap-4 w-full justify-between border border-black p-3 rounded"
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
    )
}

export default Tags