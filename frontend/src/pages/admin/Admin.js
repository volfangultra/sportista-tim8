import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import DashboardCharts from "../../components/admin/DashboardCharts";
import MostRentedFields from "../../components/admin/MostRentedFields";

function Dashboard() {
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="page-margin">
                <h1>Dashboard</h1>
                <h5>Welcome to admin dashboard.</h5>
                <DashboardCharts />
            </div>
        </div>
    );
}

export default Dashboard;
