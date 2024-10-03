const CommentsForm = ({ _state, _setState, _onChangeHandle }) => {

    const commentTextChange = (e) => {
        _setState(e.target.value)
    }

    return (
        <div>
            <form
                onSubmit={_onChangeHandle}
                className="text-right space-y-3"

            >
                <textarea
                    onChange={commentTextChange}
                    value={_state}
                    className="textarea textarea-bordered w-full min-h-36 resize-none"
                    placeholder="Say something"
                ></textarea>
                <button type="submit" className={`btn btn-success btn-outline ${!_state && 'btn-disabled'}`}>Comment</button>
            </form>
        </div>
    )
}

export default CommentsForm