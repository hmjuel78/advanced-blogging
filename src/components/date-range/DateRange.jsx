
import dayjs from 'dayjs'

const DateRange = (props) => {
    const { _onDateChange } = props



    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const handleSelect = (ranges) => {
        // console.log(ranges)
        _onDateChange({
            startDate: dayjs(ranges.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(ranges.endDate).format('YYYY-MM-DD')
        })
    }

    return (
        <div>

        </div>
    )
}

export default DateRange