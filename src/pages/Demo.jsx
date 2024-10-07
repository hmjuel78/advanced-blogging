import { useState } from "react";
import SearchableMultiSelectbox from "../components/custom-dropdown-with-search/SearchableMultiSelectbox";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { categorySelector } from "../features/category/categorySlice";
import { authorSelector } from "../features/author/authorSlice";

const Demo = () => {

    const [selectedCat, setSelectedCat] = useState([])

    const { categories } = useSelector(categorySelector)
    const { authors } = useSelector(authorSelector)

    const categoryTableHead = ['', 'Category Name', 'Action']
    const authorTablehead = ['', 'Category Name', 'Author Name', 'Action']

    const categoryHeads = categoryTableHead.map((item, i) => (
        <th key={i}>{item}</th>
    ))

    const categoryTableBody = categories?.map((item, index) => (
        <tr key={item.id} className="bg-base-200">
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="btn btn-xs btn-info">edit</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                </div>
            </td>
        </tr>
    ))

    const authorHeads = authorTablehead.map((item, i) => (
        <th key={i}>{item}</th>
    ))

    const authorTableBody = authors?.map((author, idx) => {
        const category = categories.find(cat => parseInt(cat.id) === parseInt(author.categoryId))

        if (category) {
            return (
                <tr key={author.id}>
                    <td>{idx + 1}</td>
                    <td>{category.name}</td>
                    <td>{author.name}</td>
                    <td>
                        <div className="flex gap-4 justify-end">
                            <button
                                className="btn btn-circle btn-sm hover:btn-info hover:text-white"
                            >
                                edit
                            </button>
                            <button
                                className="btn btn-circle btn-sm hover:btn-error hover:text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            )
        }
    })

    return (
        <div>
            <SearchableMultiSelectbox
                _selectedData={selectedCat}
                _onSelectedData={setSelectedCat}
                _lists={categories}
                _isSearch={true}
                _multiSelect={true}
            />


            <Table
                _tableHeadData={categoryHeads}
                _tableBodyData={categoryTableBody}
            />

            <Table
                _tableHeadData={authorHeads}
                _tableBodyData={authorTableBody}
            />
        </div>
    );
};

export default Demo;