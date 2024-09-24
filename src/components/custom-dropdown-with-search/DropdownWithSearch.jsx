import { useRef, useState } from "react"
import useOutsideClick from '../../hooks/useOutsiteClick'


const DropdownWithSearch = (props) => {
    const { selectDropData, setSelectDropData, isSearch, dropDatas, mapKey } = props
    const [searchValue, setSearchValue] = useState('')
    // const [selectDropData, setSelectDropData] = useState(null)
    const [open, setOpen] = useState(false)
    const ref = useRef()


    useOutsideClick(ref, () => {
        setOpen(false)
    })

    const dropDownhandler = (dropData) => {
        setSelectDropData(dropData)
        setOpen(false)
        setSearchValue("")
    }

    return (
        <>
            <div ref={ref} className="border border-gray-600 h-12 w-full font-medium relative rounded-md">
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full p-2 flex h-full items-center justify-between rounded`}
                >
                    <span className="space-x-2">
                        {selectDropData ? selectDropData.length > 25 ? selectDropData.substring(0, 25) + "..." : selectDropData.name : "Select"}
                    </span>
                </div>

                <ul className={`w-full mt-2 overflow-y-auto absolute z-20 border rounded-md bg-slate-700 ${open ? "max-h-60" : "max-h-0 hidden"} `} >
                    {
                        isSearch === true &&
                        <div className="flex items-center sticky top-0 w-full">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search.."
                                className="placeholder:text-gray-700 text-white py-2 px-3 outline-none w-full"

                            />
                        </div>
                    }


                    {dropDatas?.map((dropData) => (
                        <li key={dropData.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                            ${dropData?.[mapKey]?.toLowerCase() === selectDropData && "bg-sky-600 text-white"}
                            ${dropData?.[mapKey]?.toLowerCase().includes(searchValue.toLowerCase()) ? "block" : "hidden"} `}

                            onClick={() => dropDownhandler(dropData)}
                        >
                            {dropData?.[mapKey]}

                        </li>
                    ))}

                </ul>
            </div>
        </>
    )
}

export default DropdownWithSearch