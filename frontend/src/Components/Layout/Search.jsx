import "./Search.scss"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = e => {
        e.preventDefault();
        if (keyword.trim()) navigate(`/products/${keyword}`);
        else navigate("/products");
    }

    return (
        <form className="search" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search a product....."
                onChange={e => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    );
}