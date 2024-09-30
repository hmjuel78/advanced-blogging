const Loading = () => {
    return (
        <div className={`fixed top-0 left-0 z-20 bg-[rgba(255,255,255,0.7)] w-full items-center justify-center h-screen flex`}>
            <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
    )
}

export default Loading
