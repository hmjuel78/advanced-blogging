import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

const Tag = (props) => {
    const { tags, setTags } = props

    const [text, setText] = useState("")

    const handleInput = () => {
        const t = text.trim()
        if (!t.length) return

        const tagObj = {
            id: String(Date.now()),
            tag: t
        }
        setTags([
            ...tags,
            tagObj
        ])
        setText("")
    }

    const handleKeyUp = (e) => {
        if (e.key !== "Enter") return
        handleInput()
    }

    const handleDelete = (id) => {
        if (!Number(id)) return
        const newTags = tags.filter((t) => t.id !== id)
        setTags(newTags)
    }

    return (
        <div className="flex flex-wrap rounded p-1 gap-1">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleKeyUp}
                className="bg-transparent outline-none input input-bordered w-full"
                placeholder="Input tags"
            />
            <ul className={`border border-white rounded flex gap-1 p-2 w-full ${tags.length > 0 ? 'block' : 'hidden'}`}>
                {tags.map((t) => (
                    <li
                        key={t.id}
                        className="bg-slate-800 rounded px-2 py-1 flex items-center gap-1 hover:cursor-pointer"
                    >
                        {t.tag}
                        <IoCloseOutline onClick={() => handleDelete(t.id)} className="hover:text-error" />
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Tag