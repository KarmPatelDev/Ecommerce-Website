import React from "react";

const CategoryForm = ({handleCategory, value, setValue, close}) => {
    return (
        <>
        <form onSubmit={handleCategory}>
            <div className="mb-3">
                <input type="text" className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            {
                close ? <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
            }         
        </form>
        </>
    );
};

export default CategoryForm;