import { useRef, useState } from "react"
import useOutsideClick from '../../hooks/useOutsiteClick'
import { IoCloseSharp } from "react-icons/io5"


const SearchableMultiSelectbox = (props) => {
    const {
        _selectedData,
        _onSelectedData,
        _lists = [],
        _placeholder = "select ....",
        _mapKey = 'name',
        _isSearch = false,
        _disable = false,
        _multiSelect = false,
        _showLength = false
    } = props
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const dropDownhandler = (dropData) => {
        if (_multiSelect) {
            if (!_selectedData.includes(dropData)) {
                _onSelectedData([dropData, ..._selectedData])
            }
        } else {
            _onSelectedData(dropData)
            setOpen(false)
        }

        setSearchValue("")
    }

    useOutsideClick(ref, () => {
        setOpen(false)
    })

    const removeSelectedHandle = (removeId) => {
        const newSelected = _selectedData.filter(item => item !== removeId)
        _onSelectedData(newSelected)
    }
    const removeAllItems = () => {
        _onSelectedData([])
    }

    return (
        <>
            <div
                ref={ref}
                className={`border border-gray-600 h-12 w-full font-medium relative rounded-md 
                    ${_disable && 'opacity-50 pointer-events-none'}`}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full p-2 flex h-full items-center justify-between gap-1 rounded`}
                >
                    {_multiSelect ? (
                        <div className="flex items-center gap-2">
                            {
                                _selectedData && _selectedData.length > 0 ? (
                                    <>
                                        {_selectedData.slice(0, 5).map((item) => {
                                            return _lists.map((data) => {
                                                if (data.id === item) {
                                                    return (
                                                        <span key={data.id} className="capitalize">
                                                            {data[_mapKey]}
                                                        </span>
                                                    );
                                                }
                                                return null
                                            })
                                        })}
                                        {_selectedData.length > 5 && <span> ...</span>}
                                    </>
                                ) : (
                                    <span>{_placeholder}</span>
                                )
                            }
                        </div>

                    ) : (
                        _selectedData ? (
                            _lists.map((data) => {
                                if (data.id === _selectedData) {
                                    return (
                                        <span key={data.id} className="capitalize">
                                            {data[_mapKey].length > 20
                                                ? data[_mapKey].substring(0, 20) + "..."
                                                : data[_mapKey]}
                                        </span>
                                    );
                                }
                                return null
                            })
                        ) : (
                            <span>{_placeholder}</span>
                        )
                    )}

                    {
                        _multiSelect && <div className="flex items-center gap-2">
                            {_showLength && `(${_selectedData.length})`}

                            {_selectedData.length > 0 && <button onClick={() => removeAllItems()} className="btn btn-outline btn-xs btn-error">Clear all</button>}
                        </div>
                    }
                </div>

                <ul className={`w-full mt-2 overflow-y-auto absolute z-20 border rounded-md space-y-2 bg-slate-700 ${open ? "max-h-60" : "max-h-0 hidden"} `} >
                    {
                        _isSearch &&
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

                    {_lists && _lists.map((dropData) => (
                        <li key={dropData.id}
                            className={`p-2 text-sm hover:bg-sky-600 hover:text-white capitalize flex items-center justify-between
                            ${_multiSelect
                                    ? (_selectedData?.some(item => item === dropData.id) ? "bg-sky-600 text-white" : "")
                                    : (_selectedData === dropData.id ? "bg-sky-600 text-white" : "")}
                            ${dropData?.[_mapKey]?.toLowerCase().includes(searchValue.toLowerCase()) ? "block" : "hidden"} `}
                            onClick={() => dropDownhandler(dropData.id)}
                        >
                            <div className="flex items-center gap-2">
                                {_multiSelect && (
                                    <input
                                        type="checkbox"
                                        checked={_selectedData.includes(dropData.id)}
                                        onChange={() => dropDownhandler(dropData.id)}
                                        className="checkbox checkbox-primary checkbox-sm"
                                    />
                                )}

                                <span>{dropData?.[_mapKey]}</span>
                            </div>

                            {_multiSelect && _selectedData.includes(dropData.id) && (
                                <button
                                    onClick={() => {
                                        removeSelectedHandle(dropData.id);
                                    }}
                                    className="btn btn-xs btn-circle btn-error text-white"
                                >
                                    <IoCloseSharp />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SearchableMultiSelectbox