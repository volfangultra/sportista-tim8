import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import UsersTable from "../../components/admin/UsersTable";

function Users() {

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="page-margin">
                <h1>Users</h1>
                <h5>Table of registered users.</h5>
                <UsersTable />
            </div>
        </div>
    );
}

export default Users;
