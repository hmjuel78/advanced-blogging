import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Router } from "./routes/Router"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={Router} />
            <Toaster position="top-right" />
        </Provider>
    </StrictMode>
)
