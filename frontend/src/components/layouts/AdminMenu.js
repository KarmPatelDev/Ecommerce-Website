import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink to="/dashboard/admin/manage-categories" className="list-group-item list-group-item-action">Manage Categories</NavLink>
                    <NavLink to="/dashboard/admin/create-products" className="list-group-item list-group-item-action">Create Products</NavLink>
                    <NavLink to="/dashboard/admin/manage-products" className="list-group-item list-group-item-action">Manage Products</NavLink>
                    <NavLink to="/dashboard/admin/manage-orders" className="list-group-item list-group-item-action">Manage Orders</NavLink>
                    <NavLink to="/dashboard/admin/manage-users" className="list-group-item list-group-item-action">Manage Users</NavLink>
                    <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;