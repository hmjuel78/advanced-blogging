import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Tag = () => {
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");

    const handleInput = () => {
        const t = text.trim();
        if (!t.length) return;

        const tagObj = {
            id: String(Date.now()),
            tag: t
        };
        setTags([
            ...tags,
            tagObj
        ]);
        setText("");
    }

    const handleKeyUp = (e) => {
        if (e.key !== "Enter") return;
        handleInput();
        // console.log(e)
    }

    const handleDelete = (id) => {
        if (!Number(id)) return;
        const newTags = tags.filter((t) => t.id !== id);
        setTags(newTags);
    }

    console.log("tags: ", tags);
    return (
        <div className="flex flex-wrap rounded p-1 gap-1">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyUp={handleKeyUp} className="bg-transparent outline-none border w-40 rounded border-gray-500 p-1" placeholder="Input tags" />
            {tags.map((t) => (
                <div key={t.id} className="bg-slate-800 rounded px-2 py-1 flex items-center gap-1 hover:cursor-pointer">{t.tag} <IoCloseOutline onClick={() => handleDelete(t.id)} /></div>
            ))}
        </div>
    );
};

export default Tag;