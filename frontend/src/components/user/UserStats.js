import React from 'react';
import { Bar } from 'react-chartjs-2';

const UserStats = ({ scheduled, played }) => {
    const data = {
        labels: ['Booked', 'Played'],
        datasets: [
            {
                label: 'Bookings',
                data: [scheduled, played],
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };
    console.log(scheduled, played)
    return (
        <Bar data={data} />
    );
}

export default UserStats;