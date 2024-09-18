import { useState } from "react"
import AuthorForm from "../components/author/AuthorForm"
import AuthorList from "../components/author/AuthorList"
import CategoryForm from "../components/category/CategoryForm"
import CategoryList from "../components/category/CategoryList"


const Categories = () => {
    const [categoryName, setCategoryName] = useState('')

    return (
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto mt-10 px-4">
            <CategoryForm categoryName={categoryName} setCategoryName={setCategoryName} />
            <CategoryList />
            <AuthorForm />
            <AuthorList />
        </div>
    )
}

export default Categories