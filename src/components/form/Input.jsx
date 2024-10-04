
const Input = (props) => {

    const {
        _value,
        _onChange,
        _name,
        ...restProps
    } = props

    const onChnageInput = (e) => {
        _onChange(e.target.value)
    }

    return (
        <div>
            <input
                onChange={onChnageInput}
                value={_value}
                name={_name}
                type='text'
                placeholder="Author Name"
                className="input input-bordered w-full"
                {...restProps}
            />
        </div>
    )
}

export default Input