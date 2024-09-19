import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import Blogs from "../pages/Blogs"
import Categories from "../pages/Categories"
import ErrorPage from "../pages/ErrorPage"
import Loading from "../pages/Loading"


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
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/loading',
                element: <Loading />
            }
        ]
    },
])
