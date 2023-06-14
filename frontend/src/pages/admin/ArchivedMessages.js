import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import ArchivedMessagesTable from "../../components/admin/ArchivedMessagesTable";

function ArchivedMessages() {
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="page-margin">
                <h1>Archived messages</h1>
                <h5>Archived messages from users and renters.</h5>
                <ArchivedMessagesTable />
            </div>
        </div>
    );
}

export default ArchivedMessages;