import React from 'react';

//components
import Sidebar from "../../components/navigation/Sidebar";

function Account() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '27rem', marginTop: '2rem' }}>
                <h1>Account</h1>
            </div>
        </div>
    );
}

export default Account;