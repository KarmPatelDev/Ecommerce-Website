import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);

            if(res.data.success){
                setCategories(res.data.categories);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Something Went Wrong.');
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
};

export default useCategory;