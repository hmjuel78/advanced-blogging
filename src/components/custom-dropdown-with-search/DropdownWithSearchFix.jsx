import { useRef, useState } from "react"
import useOutsideClick from '../../hooks/useOutsiteClick'


const DropdownWithSearchFix = (props) => {
    const { selectDropData, setSelectDropData, isSearch = false, disable = false, dropDatas = [], mapKey = 'name', selectPlaceholder = "select ...." } = props
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const dropDownhandler = (dropData) => {
        setSelectDropData(dropData)
        setOpen(false)
        setSearchValue("")
    }

    useOutsideClick(ref, () => {
        setOpen(false)
    })

    return (
        <>
            <div
                ref={ref}
                className={`border border-gray-600 h-12 w-full font-medium relative rounded-md 
                    ${disable && 'opacity-50 pointer-events-none'}`}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full p-2 flex h-full items-center justify-between rounded`}
                >
                    <span className="space-x-2 capitalize">
                        {selectDropData === '' ? selectPlaceholder :
                            dropDatas.map(data => {
                                if (data.id == selectDropData) {
                                    return data[mapKey].length > 20 ? data[mapKey].substring(0, 20) + "..." : data[mapKey]
                                }
                            })
                        }
                    </span>
                </div>

                <ul className={`w-full mt-2 overflow-y-auto absolute z-20 border rounded-md bg-slate-700 ${open ? "max-h-60" : "max-h-0 hidden"} `} >
                    {
                        isSearch &&
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

                    {dropDatas &&
                        dropDatas?.map((dropData) => (
                            <li key={dropData.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white capitalize
                            ${dropData?.[mapKey]?.toLowerCase() === selectDropData && "bg-sky-600 text-white"}
                            ${dropData?.[mapKey]?.toLowerCase().includes(searchValue.toLowerCase()) ? "block" : "hidden"} `}

                                onClick={() => dropDownhandler(dropData.id)}
                            >
                                {dropData?.[mapKey]}

                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default DropdownWithSearchFix