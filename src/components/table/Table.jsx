
const Table = (props) => {

    const {
        _tableHeadData,
        _tableBodyData
    } = props



    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {_tableHeadData}
                    </tr>
                </thead>
                <tbody>
                    {_tableBodyData}
                </tbody>
            </table>
        </div>
    )
}

export default Table