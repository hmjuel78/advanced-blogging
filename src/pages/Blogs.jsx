import { useSelector } from "react-redux"
import { categorySelector } from "../features/category/categorySlice"


const Blogs = () => {
    const { categories } = useSelector(categorySelector)

    return (
        <div>
            <h2 className="text-xl">Blogs Page</h2>
            {
                categories.map(cat => <li key={cat.id}>{cat.name}</li>)
            }
        </div>
    )
}

export default Blogs