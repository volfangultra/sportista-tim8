import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import InboxTable from "../../components/admin/InboxTable";

function Inbox() {
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="page-margin">
                <h1>Inbox</h1>
                <h5>All messages recieved from users and renters.</h5>
                <InboxTable />
            </div>
        </div>
    );
}

export default Inbox;
