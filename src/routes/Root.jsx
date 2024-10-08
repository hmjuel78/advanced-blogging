import { Link, Outlet } from "react-router-dom"

const Root = () => {

    return (
        <>
            <div className="drawer sticky top-0 z-50">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full">
                        <div className="flex-none md:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">
                            <Link to="/">Navbar Title</Link>
                        </div>
                        <div className="hidden flex-none md:block">
                            <ul className="menu menu-horizontal">
                                <li>
                                    <Link to="/">Categories</Link>
                                </li>
                                <li>
                                    <Link to="/create-blog">Create Blog</Link>
                                </li>
                                <li>
                                    <Link to="/blogs">Blogs</Link>
                                </li>
                                <li>
                                    <Link to="/demo">Demo</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        <li>
                            <Link to="/">Categories</Link>
                        </li>
                        <li>
                            <Link to="/create-blog">Create Blog</Link>
                        </li>
                        <li>
                            <Link to="/blogs">Blogs</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}

export default Root