import { useRef, useState } from "react"
import useOutsideClick from '../../hooks/useOutsiteClick'
import { useDispatch, useSelector } from "react-redux"
import { tagSearchByName, tagSelector } from "../../features/tags/tagSlice"
import { IoCloseOutline } from "react-icons/io5"


const TagInputWithSearch = (props) => {
    const { isSearch } = props
    const [searchValue, setSearchValue] = useState('')
    const [selectDropData, setSelectDropData] = useState([])
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const dispatch = useDispatch()
    const { tagsByName: dropDatas } = useSelector(tagSelector)


    useOutsideClick(ref, () => {
        setOpen(false)
    })

    const dropDownhandler = (dropData) => {
        if (dropData.name.toLowerCase() !== selectDropData) {
            setSelectDropData([...selectDropData, dropData.name])
            setOpen(false)
            setSearchValue("")
        }
    }

    const searchOnchageHandle = (e) => {
        setSearchValue(e.target.value)

        setTimeout(() => {
            dispatch(tagSearchByName(e.target.value.toLowerCase()))
        }, 2000)
    }

    const handleInput = () => {
        const t = searchValue.trim()
        if (!t.length) return

        setSearchValue("")
        setSelectDropData([...selectDropData, searchValue])
    }

    const handleKeyUp = (e) => {
        if (e.key !== "Enter") return
        handleInput()
    }

    const selectDataDelete = (idx) => {
        const newSelectedData = selectDropData.filter((seletedData, i) => i !== idx)
        setSelectDropData(newSelectedData)
    }

    return (
        <>
            <div ref={ref} className="border border-gray-600 h-12 w-full font-medium relative rounded-md">
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full p-2 flex h-full items-center rounded`}
                >
                    {
                        selectDropData &&
                        selectDropData?.map((selectData, idx) =>
                            <span
                                key={idx}
                                className="bg-slate-800 rounded px-2 py-1 flex items-center gap-1 hover:cursor-pointer"
                            >
                                {selectData}
                                <IoCloseOutline onClick={() => selectDataDelete(idx)} className="hover:text-error" />
                            </span>
                        )
                    }
                    {/* <span className="space-x-2"> {selectDropData ? selectDropData.length > 25 ? selectDropData.substring(0, 25) + "..." : selectDropData : "Select Tag"}</span> */}
                </div>

                <ul className={`w-full mt-2 overflow-y-auto absolute border rounded-md bg-slate-700 ${open ? "max-h-60" : "max-h-0 hidden"} `} >
                    {
                        isSearch === true &&
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

                            onClick={() => dropDownhandler(dropData)}
                            value={dropData.id}
                        >
                            {dropData?.name}
                        </li>
                    ))}
                    {/* {suppliers?.map((supplier) => (
                        <li key={supplier.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                        ${supplier?.company_name?.toLowerCase() === selectSupplier?.toLowerCase() && "bg-sky-600 text-white"}
                        ${supplier?.company_name?.toLowerCase().includes(searchValue) ? "block" : "hidden"} `}
                        
                            onClick={() => {
                                if (supplier?.company_name.toLowerCase() !== selectSupplier.toLowerCase()) {
                                    setSelectSupplier(supplier.company_name); setOpen(false); setSearchValue("");
                                }
                                supplierChangehand()
                            }}
                            value={supplier?.id}
                        >
                            {supplier?.company_name}
                        </li>
                    ))} */}

                </ul>
            </div>

            {/* <p>{selectSupplier}</p>

            {suppliersContacts.length &&
                suppliersContacts.map(suppliersContact => (
                    <p key={suppliersContact.id}>{suppliersContact.id}</p>
                ))
            } */}
        </>
    )
}

export default TagInputWithSearch