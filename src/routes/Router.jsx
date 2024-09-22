import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import Blogs from "../pages/Blogs.jsx"
import Categories from "../pages/Categories"
import ErrorPage from "../pages/ErrorPage"
import CreateBlog from "../pages/CreateBlog.jsx"
import BlogDetails from "../components/blog/BlogDetails.jsx"


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Categories />
            },
            {
                path: '/create-blog',
                element: <CreateBlog />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails />
            }
        ]
    },
])
