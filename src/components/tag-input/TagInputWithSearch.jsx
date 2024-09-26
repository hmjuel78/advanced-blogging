import { useEffect, useRef, useState } from "react"
import useOutsideClick from '../../hooks/useOutsiteClick'
import { useDispatch, useSelector } from "react-redux"
import { tagCreate, tagFetch, tagSelector, updateSearchTags } from "../../features/tags/tagSlice"
import { IoCloseOutline } from "react-icons/io5"


const TagInputWithSearch = (props) => {
    const { isSearch, selectDropData, setSelectDropData } = props
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const dispatch = useDispatch()
    const { tagsByName: dropDatas } = useSelector(tagSelector)


    const searchOnchageHandle = (e) => {
        setSearchValue(e.target.value)
    }

    const handleInput = () => {
        const t = searchValue.trim()
        if (!t.length) return

        const availableTag = dropDatas.find(dropdata => dropdata.name === searchValue)

        if (availableTag) {
            addTag(availableTag)
        } else {
            const newTag = {
                name: searchValue,
                id: Date.now()
            }
            addTag(newTag)
            dispatch(tagCreate(newTag))
        }
    }

    const addTag = (newTag) => {
        if (selectDropData.filter(selectdata => selectdata.id === newTag.id).length === 0) {
            setSelectDropData([...selectDropData, newTag])
        }
        setSearchValue("")
    }

    const handleKeyUp = (e) => {
        if (e.key !== "Enter") return
        handleInput()
    }

    const selectDataDelete = (idx) => {
        const newSelectedData = selectDropData.filter((seletedData) => seletedData.id !== idx)
        setSelectDropData(newSelectedData)
    }

    useOutsideClick(ref, () => {
        setOpen(false)
        setSearchValue('')
    })

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue) {
                dispatch(tagFetch(searchValue))
            } else {
                dispatch(updateSearchTags())
            }
        }, 1000)
        return () => clearTimeout(timeoutId)
    }, [searchValue])


    return (
        <>
            <div ref={ref} className="border border-gray-600 h-12 w-full font-medium relative rounded-md">
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full p-2 flex gap-2 h-full items-center rounded`}
                >
                    {
                        selectDropData && selectDropData.length > 0 ?
                            selectDropData?.map((selectData) =>
                                <span
                                    key={selectData.id}
                                    className="bg-slate-800 rounded px-2 py-1 flex items-center gap-1 hover:cursor-pointer"
                                >
                                    {selectData.name}
                                    <IoCloseOutline onClick={() => selectDataDelete(selectData.id)} className="hover:text-error" />
                                </span>
                            )
                            :
                            <span>Select tags</span>
                    }
                </div>

                <ul className={`w-full mt-2 overflow-y-auto absolute border rounded-md bg-slate-700 ${open ? "max-h-60" : "max-h-0 hidden"} `} >
                    {
                        isSearch &&
                        <div className="flex items-center sticky top-0 w-full">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={searchOnchageHandle}
                                onKeyUp={handleKeyUp}
                                placeholder="Search.."
                                className="placeholder:text-gray-700 text-white py-2 px-3 outline-none w-full"
                            />
                        </div>
                    }

                    {dropDatas?.map((dropData) => (
                        <li key={dropData.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                            ${dropData.name.toLowerCase() === selectDropData && "bg-sky-600 text-white"}
                            ${dropData?.name?.toLowerCase().includes(searchValue.toLowerCase()) ? "block" : "hidden"} `}
                            onClick={() => addTag(dropData)}
                        >
                            {dropData?.name}
                        </li>
                    ))}

                </ul>
            </div>
        </>
    )
}

export default TagInputWithSearch