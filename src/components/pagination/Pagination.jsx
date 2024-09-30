const Pagination = (props) => {
    const { _state, _setState, _onChange } = props

    const handleDecrement = () => {
        _setState((_state) => _state - 1)
    }
    const handleIncrement = () => {
        _setState((_state) => _state + 1)
    }
    // console.log(_state)
    return (
        <>
            {/* <div className="join">
                <button onClick={handleDecrement} className="join-item btn btn-sm">
                    «
                </button>
                <button onClick={_onChange} value={1} className={`join-item btn btn-sm ${_state === 1 && "disabled"}`}>
                    1
                </button>
                <button onClick={_onChange} value={2} className={`join-item btn btn-sm ${_state === 2 && "disabled"}`}>
                    2
                </button>
                <button onClick={_onChange} value={3} className={`join-item btn btn-sm ${_state === 3 && "disabled"}`}>
                    3
                </button>
                <button onClick={handleIncrement} className="join-item btn btn-sm">
                    »
                </button>
            </div> */}

            <div className="join">
                <button onClick={handleDecrement} className="join-item btn btn-sm">
                    «
                </button>
                <input onChange={_onChange} value={1} className="join-item btn btn-square" type="radio" name="options" aria-label="1" defaultChecked />
                <input onChange={_onChange} value={2} className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <input onChange={_onChange} value={3} className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                <input onChange={_onChange} value={4} className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
                <button onClick={handleIncrement} className="join-item btn btn-sm">
                    »
                </button>
            </div>
        </>
    )
}

export default Pagination
