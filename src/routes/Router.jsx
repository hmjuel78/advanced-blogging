import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import Blogs from "../pages/Blogs"
import Categories from "../pages/Categories"


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Categories />
            },
            {
                path: '/blogs',
                element: <Blogs />
            }
        ]
    },
])