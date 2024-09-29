

const CommentsForm = ({ _state, _setState }) => {


    const commentTextChange = (e) => {
        _setState(e.target.value)
    }
    const commentOnSubmit = (e) => {
        e.preventDefault()
        console.log(_state)
        _setState('')
    }


    return (
        <div>
            <form onSubmit={commentOnSubmit}>
                <textarea
                    onChange={commentTextChange}
                    value={_state}
                    className="textarea textarea-bordered w-full"
                    placeholder="Say something"
                ></textarea>
                <button className="btn btn-success btn-outline">Comment</button>
            </form>
        </div>
    )
}

export default CommentsForm