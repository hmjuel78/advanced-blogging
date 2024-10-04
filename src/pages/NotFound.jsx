import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center space-y-5 min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl text-red-400">Opps !! No Page Found!!!</h2>
            <button className="btn btn-sm btn-primary text-white">
                <Link to='/'>Back Home</Link>
            </button>
        </div>
    )
}

export default NotFound