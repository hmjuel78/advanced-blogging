const Pagination = (props) => {
    const { _state, _onChange, _totalPage } = props

    // const handleDecrement = () => {
    //     _onChange(decrement)
    // }
    // const handleIncrement = () => {
    //     const increment = (_state) => _state + 1

    //     _onChange(increment)
    // }
    // console.log(_totalPage > 1)
    return (
        <div className={`justify-center items-center my-4 ${_totalPage > 1 ? 'flex' : 'hidden'}`}>
            {/* <button onClick={handleDecrement} className={`join-item btn btn-md rounded-none ${_state === 1 && 'btn-disabled'}`}>
                «
            </button> */}

            {
                Array.from({ length: _totalPage }, (_, idx) => (
                    <button key={idx} onClick={_onChange} value={idx + 1} className={`join-item btn btn-md rounded-none ${_state === idx + 1 && 'btn-disabled'}`}>
                        {idx + 1}
                    </button>
                ))
            }
            {/* <button onClick={handleIncrement} className={`join-item btn btn-md rounded-none ${_state === _totalPage && 'btn-disabled'}`}>
                »
            </button> */}
        </div>
    )
}

export default Pagination
