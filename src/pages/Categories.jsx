import { useState } from "react"
import AuthorForm from "../components/author/AuthorForm"
import AuthorList from "../components/author/AuthorList"
import CategoryForm from "../components/category/CategoryForm"
import CategoryList from "../components/category/CategoryList"


const Categories = () => {

    const [editableCat, setEditableCat] = useState(null)
    const [editableAuthor, setEditableAuthor] = useState(null)


    return (
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto mt-10 px-4">
            <CategoryForm editableCat={editableCat} setEditableCat={setEditableCat} />
            <CategoryList setEditableCat={setEditableCat} />
            <AuthorForm editableAuthor={editableAuthor} setEditableAuthor={setEditableAuthor} />
            <AuthorList setEditableAuthor={setEditableAuthor} />
        </div>
    )
}

export default Categories