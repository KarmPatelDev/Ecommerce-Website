import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SearchForm = () => {

    const [search, setSearch] = useSearch();
    const navigate = useNavigate();

    const searchProducts = async (e) => {
        e.preventDefault();
        
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-products/${search.keyword}`);
            setSearch({...search, results: res.data});
            navigate("/search-products");
        }
        catch(error){
            console.log(error);
            toast.error('Something Went Wrong.');
        }
    };

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={searchProducts}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search.keyword} onChange={(e) => setSearch({...search, keyword: e.target.value})} required/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchForm;