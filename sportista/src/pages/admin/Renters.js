import React from 'react';

//components
import Sidebar from "../../components/navigation/Sidebar";

function Renters() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '27rem', marginTop: '2rem' }}>
                <h1>Renters</h1>
            </div>
        </div>
    );
}

export default Renters;